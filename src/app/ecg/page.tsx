
'use client'

import { useState } from 'react';

export default function EcgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/ecg', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">ECG Model</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Predict
        </button>
      </form>
      {prediction && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Prediction:</h2>
          <p className="text-lg">{prediction}</p>
        </div>
      )}
    </div>
  );
}
