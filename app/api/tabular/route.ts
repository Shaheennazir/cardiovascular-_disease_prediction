
import { NextRequest, NextResponse } from 'next/server';
import pickle
import numpy as np

export async function POST(req: NextRequest) {
  const data = await req.json();

  const scaler = pickle.load(open('models/tabular_scaler.pkl', 'rb'))
  const model = pickle.load(open('models/best_tabular_model.pkl', 'rb'))

  // Preprocess the data and make a prediction
  const prediction = model.predict(scaler.transform(np.array(list(data.values())).reshape(1, -1)))

  return NextResponse.json({ prediction: prediction[0] });
}
