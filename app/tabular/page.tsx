
'use client'

import { useState } from 'react';

export default function TabularPage() {
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/tabular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Tabular Model</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {/* Add form fields for tabular data */}
        <input type="text" name="age" placeholder="Age" onChange={handleChange} className="mb-4 p-2 border rounded" />
        <input type="text" name="gender" placeholder="Gender" onChange={handleChange} className="mb-4 p-2 border rounded" />
        <input type="text" name="height" placeholder="Height" onChange={handleChange} className="mb-4 p-2 border rounded" />
        <input type="text" name="weight" placeholder="Weight" onChange={handleChange} className="mb-4 p-2 border rounded" />
        <input type="text" name="ap_hi" placeholder="Systolic blood pressure" onChange={handleChange} className="mb-4 p-2 border rounded" />
        <input type="text" name="ap_lo" placeholder="Diastolic blood pressure" onChange={handleChange} className="mb-4 p-2 border rounded" />
        <input type="text" name="cholesterol" placeholder="Cholesterol" onChange={handleChange} className="mb-4 p-2 border rounded" />
        <input type="text" name="gluc" placeholder="Glucose" onChange={handleChange} className="mb-4 p-2 border rounded" />
        <input type="text" name="smoke" placeholder="Smoke" onChange={handleChange} className="mb-4 p-2 border rounded" />
        <input type="text" name="alco" placeholder="Alcohol" onChange={handleChange} className="mb-4 p-2 border rounded" />
        <input type="text" name="active" placeholder="Active" onChange={handleChange} className="mb-4 p-2 border rounded" />
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
