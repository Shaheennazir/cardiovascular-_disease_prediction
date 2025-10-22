import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select } from './components/ui/select';
import apiService from './api';

function TabularModel() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '1',
    height: '',
    weight: '',
    ap_hi: '',
    ap_lo: '',
    cholesterol: '1',
    gluc: '1',
    smoke: '0',
    alco: '0',
    active: '0',
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Convert form data to correct types
      const requestData = {
        age: parseInt(formData.age),
        gender: parseInt(formData.gender),
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        ap_hi: parseInt(formData.ap_hi),
        ap_lo: parseInt(formData.ap_lo),
        cholesterol: parseInt(formData.cholesterol),
        gluc: parseInt(formData.gluc),
        smoke: parseInt(formData.smoke),
        alco: parseInt(formData.alco),
        active: parseInt(formData.active),
      };
      
      const result = await apiService.predictTabular(requestData);
      setPrediction(result);
    } catch (err) {
      setError(err.message || 'An error occurred while making the prediction');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tabular Data Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Age (years)</Label>
              <Input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input type="number" name="height" value={formData.height} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label>Systolic Blood Pressure</Label>
              <Input type="number" name="ap_hi" value={formData.ap_hi} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label>Diastolic Blood Pressure</Label>
              <Input type="number" name="ap_lo" value={formData.ap_lo} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label>Cholesterol</Label>
              <Select name="cholesterol" value={formData.cholesterol} onChange={handleChange}>
                <option value="1">Normal</option>
                <option value="2">Above Normal</option>
                <option value="3">Well Above Normal</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Glucose</Label>
              <Select name="gluc" value={formData.gluc} onChange={handleChange}>
                <option value="1">Normal</option>
                <option value="2">Above Normal</option>
                <option value="3">Well Above Normal</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Smoker</Label>
              <Select name="smoke" value={formData.smoke} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Alcohol Intake</Label>
              <Select name="alco" value={formData.alco} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Physical Activity</Label>
              <Select name="active" value={formData.active} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Predicting...' : 'Predict'}
          </Button>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
            <h3 className="font-medium text-danger-800">Error: {error}</h3>
          </div>
        )}
        
        {prediction && (
          <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <h3 className="text-lg font-semibold text-primary-800">Risk Level: {prediction.risk_level}</h3>
            <p className="text-primary-700">Probability: {(prediction.probability * 100).toFixed(1)}%</p>
            <p className="text-primary-700">Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
            
            {prediction.explanation && (
              <div className="mt-4 p-3 bg-surface rounded-lg border border-border">
                <h4 className="font-medium text-text-primary">Explanation:</h4>
                <p className="mt-1 text-text-secondary">{prediction.explanation.summary}</p>
                
                {prediction.explanation.feature_importance && (
                  <div className="mt-3">
                    <h4 className="font-medium text-text-primary">Key Factors:</h4>
                    <ul className="mt-2 space-y-1">
                      {prediction.explanation.feature_importance.map((factor, index) => (
                        <li key={index} className="text-text-secondary">
                          <strong>{factor.feature}:</strong> {Math.round(factor.importance * 100)}% impact
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {prediction.explanation.recommendations && (
                  <div className="mt-3">
                    <h4 className="font-medium text-text-primary">Recommendations:</h4>
                    <ul className="mt-2 space-y-1">
                      {prediction.explanation.recommendations.map((rec, index) => (
                        <li key={index} className="text-text-secondary">{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TabularModel;
