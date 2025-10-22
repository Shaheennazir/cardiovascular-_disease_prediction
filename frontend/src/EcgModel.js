import React, { useState } from 'react';
import apiService from './api';

function EcgModel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    // Clear previous prediction when new file is selected
    setPrediction(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.predictEcg(selectedFile);
      setPrediction(result);
    } catch (err) {
      setError(err.message || 'An error occurred while processing the ECG file');
      console.error('ECG prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="model-container">
      <h2>ECG Signal Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload ECG File (.dat)</label>
          <input type="file" onChange={handleFileChange} accept=".dat" required />
        </div>
        <button type="submit" disabled={loading || !selectedFile}>
          {loading ? 'Processing...' : 'Predict'}
        </button>
      </form>
      
      {error && (
        <div className="error-message">
          <h3>Error: {error}</h3>
        </div>
      )}
      
      {prediction && (
        <div className="prediction-result">
          <h3>Classification: {prediction.classification}</h3>
          <p>Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
          
          {prediction.probabilities && (
            <div>
              <h4>Probabilities:</h4>
              <ul>
                {Object.entries(prediction.probabilities).map(([key, value]) => (
                  <li key={key}>
                    {key}: {(value * 100).toFixed(1)}%
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {prediction.explanation && (
            <div className="explanation">
              <h4>Explanation:</h4>
              <p>{prediction.explanation.summary}</p>
              
              {prediction.explanation.abnormal_segments && (
                <div>
                  <h4>Detected Abnormalities:</h4>
                  <ul>
                    {prediction.explanation.abnormal_segments.map((segment, index) => (
                      <li key={index}>
                        <strong>{segment.description}</strong> from {segment.start_time}s to {segment.end_time}s
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
          
          {prediction.visualization_url && (
            <div className="visualization">
              <h4>ECG Visualization:</h4>
              <p>Visualization available at: <a href={prediction.visualization_url} target="_blank" rel="noopener noreferrer">View ECG Plot</a></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EcgModel;

