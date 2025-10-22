import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
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
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>ECG Signal Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Upload ECG File (.dat)</Label>
            <Input type="file" onChange={handleFileChange} accept=".dat" required />
          </div>
          <Button type="submit" disabled={loading || !selectedFile}>
            {loading ? 'Processing...' : 'Predict'}
          </Button>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
            <h3 className="font-medium text-danger-800">Error: {error}</h3>
          </div>
        )}
        
        {prediction && (
          <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <h3 className="text-lg font-semibold text-primary-800">Classification: {prediction.classification}</h3>
            <p className="text-primary-700">Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
            
            {prediction.probabilities && (
              <div className="mt-4">
                <h4 className="font-medium text-primary-800">Probabilities:</h4>
                <ul className="mt-2 space-y-1">
                  {Object.entries(prediction.probabilities).map(([key, value]) => (
                    <li key={key} className="text-primary-700">
                      {key}: {(value * 100).toFixed(1)}%
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {prediction.explanation && (
              <div className="mt-4 p-3 bg-surface rounded-lg border border-border">
                <h4 className="font-medium text-text-primary">Explanation:</h4>
                <p className="mt-1 text-text-secondary">{prediction.explanation.summary}</p>
                
                {prediction.explanation.abnormal_segments && (
                  <div className="mt-3">
                    <h4 className="font-medium text-text-primary">Detected Abnormalities:</h4>
                    <ul className="mt-2 space-y-1">
                      {prediction.explanation.abnormal_segments.map((segment, index) => (
                        <li key={index} className="text-text-secondary">
                          <strong>{segment.description}</strong> from {segment.start_time}s to {segment.end_time}s
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
            
            {prediction.visualization_url && (
              <div className="mt-4 p-3 bg-surface rounded-lg border border-border">
                <h4 className="font-medium text-text-primary">ECG Visualization:</h4>
                <p className="mt-1 text-text-secondary">Visualization available at: <a href={prediction.visualization_url} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">View ECG Plot</a></p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default EcgModel;
