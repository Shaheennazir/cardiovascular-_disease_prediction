
import { NextRequest, NextResponse } from 'next/server';
import tensorflow as tf
import numpy as np

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const model = tf.keras.models.load_model('models/best_ecg_model.h5');
  // Preprocess the file and make a prediction
  const prediction = model.predict(preprocessed_data)

  return NextResponse.json({ prediction });
}
