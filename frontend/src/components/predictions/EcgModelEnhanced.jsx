import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Activity, Upload, Zap, CheckCircle, AlertCircle } from 'lucide-react';

const EcgModelEnhanced = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleProcess = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsProcessing(true);
    setError('');
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setResult({
        risk: 'Low',
        probability: 0.15,
        confidence: 0.92,
        abnormalities: []
      });
    }, 2000);
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="interactive-lift">
        <CardHeader>
          <CardTitle>ECG Analysis</CardTitle>
          <CardDescription>
            Upload your ECG data for instant analysis and abnormality detection
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg animate-shake">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-danger-500 mr-2" />
                <p className="text-danger-800">{error}</p>
              </div>
            </div>
          )}
          
          {result ? (
            <div className="space-y-6 animate-fade-in-up">
              <div className="p-6 bg-surface rounded-lg border border-border">
                <h3 className="heading-3 mb-4 text-text-primary">Analysis Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <p className="body-small text-text-secondary">Risk Level</p>
                    <p className={`heading-2 ${result.risk === 'High' ? 'text-danger-500' : 'text-success-500'}`}>
                      {result.risk}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <p className="body-small text-text-secondary">Probability</p>
                    <p className="heading-2 text-text-primary">
                      {(result.probability * 100).toFixed(1)}%
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <p className="body-small text-text-secondary">Confidence</p>
                    <p className="heading-2 text-text-primary">
                      {(result.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-text-primary">Risk Assessment</h4>
                  <div className="w-full bg-surface-contrast rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${
                        result.probability > 0.7 ? 'bg-danger-500' : 
                        result.probability > 0.4 ? 'bg-warning-500' : 'bg-success-500'
                      }`}
                      style={{ width: `${result.probability * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between body-small text-text-tertiary mt-1">
                    <span>Low Risk</span>
                    <span>High Risk</span>
                  </div>
                </div>
                
                <div className="p-4 bg-surface-contrast rounded-lg">
                  <h4 className="font-semibold mb-2 text-text-primary">Findings</h4>
                  {result.abnormalities && result.abnormalities.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1 text-text-secondary">
                      {result.abnormalities.map((abnormality, index) => (
                        <li key={index}>{abnormality}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center text-success-500">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>No significant abnormalities detected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : isProcessing ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-12">
                <Activity className="h-12 w-12 text-primary-500 animate-spin" />
                <h3 className="heading-4 mt-4 text-text-primary">Analyzing ECG Data</h3>
                <p className="body-medium text-text-secondary mt-2">
                  Processing your ECG file and detecting potential abnormalities...
                </p>
                <div className="w-full max-w-md mt-6">
                  <div className="h-2 bg-surface-contrast rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full animate-progress"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary-300 transition-colors">
                <Upload className="h-12 w-12 text-text-tertiary mx-auto" />
                <h3 className="heading-4 mt-4 text-text-primary">Upload ECG File</h3>
                <p className="body-medium text-text-secondary mt-2">
                  Drag and drop your ECG file here, or click to browse
                </p>
                <input
                  type="file"
                  accept=".csv,.txt,.dat"
                  onChange={handleFileChange}
                  className="hidden"
                  id="ecg-upload"
                />
                <label htmlFor="ecg-upload">
                  <Button variant="outline" className="mt-4">
                    Select File
                  </Button>
                </label>
                {file && (
                  <div className="mt-4 p-3 bg-surface-contrast rounded-lg inline-flex items-center">
                    <Activity className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="body-medium text-text-primary">{file.name}</span>
                  </div>
                )}
              </div>
              
              <div className="bg-surface-contrast rounded-lg p-4">
                <h4 className="font-semibold text-text-primary mb-2">Supported Formats</h4>
                <ul className="list-disc pl-5 space-y-1 text-text-secondary">
                  <li>CSV files containing ECG data</li>
                  <li>DAT files from medical devices</li>
                  <li>TXT files with numerical ECG readings</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {result ? (
            <div className="flex space-x-3">
              <Button onClick={resetForm} variant="secondary">
                New Analysis
              </Button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Button type="button" variant="secondary" onClick={resetForm}>
                Reset
              </Button>
              <Button 
                type="submit" 
                disabled={isProcessing || !file} 
                onClick={handleProcess}
              >
                {isProcessing ? (
                  <>
                    <Activity className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Analyze ECG
                  </>
                )}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EcgModelEnhanced;