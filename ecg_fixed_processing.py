# ================================================================
# PART 2.2: ECG SIGNAL PROCESSING AND LABEL MAPPING
# ================================================================

all_segments = []
all_labels = []

print("\n[2.2] Processing ECG signals and extracting heartbeats...")

for rec in tqdm(records, desc="Processing Records"):
    try:
        # Read both signal and annotations
        record = wfdb.rdrecord(os.path.join(db_dir, rec))
        annotation = wfdb.rdann(os.path.join(db_dir, rec), "atr")

        signal = record.p_signal[:, 0].astype(np.float32)
        fs = record.fs
        beat_window = int(0.6 * fs)

        for i, peak in enumerate(annotation.sample):
            start = max(0, peak - beat_window // 2)
            end = min(len(signal), peak + beat_window // 2)
            seg = signal[start:end]

            if len(seg) < beat_window:
                continue

            # Normalize beat using z-score
            seg = (seg - np.mean(seg)) / (np.std(seg) + 1e-8)
            all_segments.append(seg)
            all_labels.append(annotation.symbol[i])

    except Exception as e:
        print(f"  Error processing {rec}: {e}")
        continue

if len(all_segments) == 0:
    raise RuntimeError("❌ No ECG segments processed. Try deleting dataset folder and rerunning.")

print(f"\n✅ Successfully processed {len(all_segments)} beats from {len(records)} records.")
print(f"Example beat length: {len(all_segments[0])}")
print(f"Unique labels found: {sorted(set(all_labels))}")

# Convert to arrays
X_ecg = np.array(all_segments, dtype=np.float32)
y_ecg_raw = np.array(all_labels)

print(f"ECG Feature shape: {X_ecg.shape}")
print(f"ECG Label shape: {y_ecg_raw.shape}")

# ================================================================
# PART 2.2.1: MAP MULTI-CLASS LABELS TO BINARY
# ================================================================
print("\n[2.2.1] Mapping ECG labels to binary classification...")

# MIT-BIH annotation meanings:
# N = Normal beat
# L = Left bundle branch block
# R = Right bundle branch block  
# V = Premature ventricular contraction
# A = Atrial premature beat
# / = Paced beat
# f = Fusion of ventricular and normal
# ! = Ventricular flutter wave

# Map to binary: Normal (0) vs Abnormal (1)
normal_beats = ['N', 'L', 'R']  # Generally considered normal rhythm
abnormal_beats = ['V', 'A', '/', 'f', '!', 'E', 'j', 'S', 'F', 'e', 'Q']

y_ecg_binary = np.array([0 if label in normal_beats else 1 for label in y_ecg_raw])

print(f"Label distribution:")
print(f"  Normal (0): {np.sum(y_ecg_binary == 0)} beats")
print(f"  Abnormal (1): {np.sum(y_ecg_binary == 1)} beats")

# ================================================================
# PART 2.2.2: BALANCE DATASET (Optional but recommended)
# ================================================================
from imblearn.under_sampling import RandomUnderSampler

print("\n[2.2.2] Balancing dataset...")

# Balance classes to prevent model bias
rus = RandomUnderSampler(random_state=42)
X_ecg_balanced, y_ecg_balanced = rus.fit_resample(X_ecg, y_ecg_binary)

print(f"Balanced dataset shape: {X_ecg_balanced.shape}")
print(f"  Normal (0): {np.sum(y_ecg_balanced == 0)} beats")
print(f"  Abnormal (1): {np.sum(y_ecg_balanced == 1)} beats")

# ================================================================
# PART 2.2.3: SPLIT INTO TRAIN/VAL/TEST
# ================================================================
print("\n[2.2.3] Splitting ECG data...")

X_ecg_temp, X_ecg_test, y_ecg_temp, y_ecg_test = train_test_split(
    X_ecg_balanced, y_ecg_balanced, test_size=0.15, random_state=42, stratify=y_ecg_balanced
)

X_ecg_train, X_ecg_val, y_ecg_train, y_ecg_val = train_test_split(
    X_ecg_temp, y_ecg_temp, test_size=0.176, random_state=42, stratify=y_ecg_temp
)

# Reshape for CNN/LSTM (add channel dimension)
X_ecg_train = X_ecg_train.reshape(X_ecg_train.shape[0], X_ecg_train.shape[1], 1)
X_ecg_val = X_ecg_val.reshape(X_ecg_val.shape[0], X_ecg_val.shape[1], 1)
X_ecg_test = X_ecg_test.reshape(X_ecg_test.shape[0], X_ecg_test.shape[1], 1)

print(f"ECG Train: {X_ecg_train.shape}, Val: {X_ecg_val.shape}, Test: {X_ecg_test.shape}")

# ================================================================
# PART 2.3: TRAINING ECG MODELS
# ================================================================
print("\n[2.3] Training ECG models...")

ecg_models = {}

# 1D CNN
print("  Training 1D CNN...")
cnn_ecg = keras.Sequential([
    layers.Conv1D(64, 7, activation='relu', input_shape=(X_ecg_train.shape[1], 1)),
    layers.MaxPooling1D(2),
    layers.Conv1D(128, 5, activation='relu'),
    layers.MaxPooling1D(2),
    layers.Conv1D(256, 3, activation='relu'),
    layers.GlobalAveragePooling1D(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(1, activation='sigmoid')
])
cnn_ecg.compile(optimizer=keras.optimizers.Adam(0.001), loss='binary_crossentropy',
                metrics=['accuracy', keras.metrics.AUC(name='auc')])
early_stop_cnn = keras.callbacks.EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
cnn_ecg.fit(X_ecg_train, y_ecg_train, validation_data=(X_ecg_val, y_ecg_val),
            epochs=50, batch_size=128, callbacks=[early_stop_cnn], verbose=0)
ecg_models['1D_CNN'] = cnn_ecg

# LSTM
print("  Training LSTM...")
lstm_ecg = keras.Sequential([
    layers.LSTM(128, return_sequences=True, input_shape=(X_ecg_train.shape[1], 1)),
    layers.Dropout(0.3),
    layers.LSTM(64),
    layers.Dropout(0.3),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(1, activation='sigmoid')
])
lstm_ecg.compile(optimizer=keras.optimizers.Adam(0.001), loss='binary_crossentropy',
                 metrics=['accuracy', keras.metrics.AUC(name='auc')])
early_stop_lstm = keras.callbacks.EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
lstm_ecg.fit(X_ecg_train, y_ecg_train, validation_data=(X_ecg_val, y_ecg_val),
             epochs=20, batch_size=128, callbacks=[early_stop_lstm], verbose=0)
ecg_models['LSTM'] = lstm_ecg

# Transformer for ECG
print("  Training ECG Transformer...")

class ECGTransformer(keras.Model):
    def __init__(self, sequence_length, num_heads=8, ff_dim=256, num_blocks=4, dropout=0.2):
        super(ECGTransformer, self).__init__()

        # Positional encoding
        self.positional_encoding = self.add_weight(
            shape=(1, sequence_length, 64),
            initializer='random_normal',
            trainable=True,
            name='pos_encoding'
        )

        self.embedding = layers.Dense(64)

        self.transformer_blocks = []
        for _ in range(num_blocks):
            self.transformer_blocks.append({
                'attention': layers.MultiHeadAttention(num_heads=num_heads, key_dim=64),
                'norm1': layers.LayerNormalization(),
                'ffn': keras.Sequential([
                    layers.Dense(ff_dim, activation='relu'),
                    layers.Dropout(dropout),
                    layers.Dense(64)
                ]),
                'norm2': layers.LayerNormalization(),
                'dropout': layers.Dropout(dropout)
            })

        self.global_pool = layers.GlobalAveragePooling1D()
        self.classifier = keras.Sequential([
            layers.Dense(128, activation='relu'),
            layers.Dropout(dropout),
            layers.Dense(64, activation='relu'),
            layers.Dropout(dropout),
            layers.Dense(1, activation='sigmoid')
        ])

    def call(self, inputs, training=False):
        x = self.embedding(inputs)
        x = x + self.positional_encoding

        for block in self.transformer_blocks:
            attn_output = block['attention'](x, x, training=training)
            attn_output = block['dropout'](attn_output, training=training)
            x = block['norm1'](x + attn_output)
            ffn_output = block['ffn'](x, training=training)
            x = block['norm2'](x + ffn_output)

        x = self.global_pool(x)
        return self.classifier(x, training=training)

transformer_ecg = ECGTransformer(sequence_length=X_ecg_train.shape[1])
transformer_ecg.compile(optimizer=keras.optimizers.Adam(0.0005), loss='binary_crossentropy',
                       metrics=['accuracy', keras.metrics.AUC(name='auc')])
transformer_ecg.build(input_shape=(None, X_ecg_train.shape[1], 1))
early_stop_tf_ecg = keras.callbacks.EarlyStopping(monitor='val_loss', patience=15, restore_best_weights=True)
transformer_ecg.fit(X_ecg_train, y_ecg_train, validation_data=(X_ecg_val, y_ecg_val),
                   epochs=50, batch_size=128, callbacks=[early_stop_tf_ecg], verbose=0)
ecg_models['Transformer'] = transformer_ecg

# ================================================================
# PART 2.4: EVALUATE ECG MODELS
# ================================================================
print("\n[2.4] Evaluating ECG models...")
ecg_results = {}

for model_name, model in ecg_models.items():
    y_pred_proba = model.predict(X_ecg_test, verbose=0).flatten()
    y_pred = (y_pred_proba > 0.5).astype(int)

    ecg_results[model_name] = {
        'accuracy': accuracy_score(y_ecg_test, y_pred),
        'roc_auc': roc_auc_score(y_ecg_test, y_pred_proba),
        'predictions': y_pred,
        'probabilities': y_pred_proba
    }
    print(f"  {model_name}: Accuracy={ecg_results[model_name]['accuracy']:.4f}, "
          f"ROC-AUC={ecg_results[model_name]['roc_auc']:.4f}")

# Save best ECG model
best_ecg_model = max(ecg_results, key=lambda x: ecg_results[x]['roc_auc'])
print(f"\nBest ECG Model: {best_ecg_model} (ROC-AUC: {ecg_results[best_ecg_model]['roc_auc']:.4f})")
ecg_models[best_ecg_model].save('best_ecg_model.h5')