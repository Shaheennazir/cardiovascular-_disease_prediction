import React, { useState } from 'react';
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
    <div className="model-container">
      <h2>Tabular Data Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Age (years)</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Height (cm)</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Weight (kg)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Systolic Blood Pressure</label>
            <input type="number" name="ap_hi" value={formData.ap_hi} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Diastolic Blood Pressure</label>
            <input type="number" name="ap_lo" value={formData.ap_lo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Cholesterol</label>
            <select name="cholesterol" value={formData.cholesterol} onChange={handleChange}>
              <option value="1">Normal</option>
              <option value="2">Above Normal</option>
              <option value="3">Well Above Normal</option>
            </select>
          </div>
          <div className="form-group">
            <label>Glucose</label>
            <select name="gluc" value={formData.gluc} onChange={handleChange}>
              <option value="1">Normal</option>
              <option value="2">Above Normal</option>
              <option value="3">Well Above Normal</option>
            </select>
          </div>
          <div className="form-group">
            <label>Smoker</label>
            <select name="smoke" value={formData.smoke} onChange={handleChange}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Alcohol Intake</label>
            <select name="alco" value={formData.alco} onChange={handleChange}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Physical Activity</label>
            <select name="active" value={formData.active} onChange={handleChange}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
      
      {error && (
        <div className="error-message">
          <h3>Error: {error}</h3>
        </div>
      )}
      
      {prediction && (
        <div className="prediction-result">
          <h3>Risk Level: {prediction.risk_level}</h3>
          <p>Probability: {(prediction.probability * 100).toFixed(1)}%</p>
          <p>Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
          
          {prediction.explanation && (
            <div className="explanation">
              <h4>Explanation:</h4>
              <p>{prediction.explanation.summary}</p>
              
              {prediction.explanation.feature_importance && (
                <div>
                  <h4>Key Factors:</h4>
                  <ul>
                    {prediction.explanation.feature_importance.map((factor, index) => (
                      <li key={index}>
                        <strong>{factor.feature}:</strong> {Math.round(factor.importance * 100)}% impact
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {prediction.explanation.recommendations && (
                <div>
                  <h4>Recommendations:</h4>
                  <ul>
                    {prediction.explanation.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TabularModel;

