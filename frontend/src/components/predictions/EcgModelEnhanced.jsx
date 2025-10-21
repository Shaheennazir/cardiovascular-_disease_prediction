import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Skeleton } from '../../components/ui/Skeleton';
import apiService from '../../api';

const EcgModelEnhanced = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      validateAndSetFile(droppedFiles[0]);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file) => {
    // Check file type
    // For ECG data, we're accepting .dat files which are binary
    if (!file.name.endsWith('.dat')) {
      setError('Invalid file type. Please upload a .dat file.');
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit.');
      return;
    }
    
    setFile(file);
    setError('');
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await apiService.predictEcg(file);
      
      // Transform response to match existing UI structure
      setResult({
        risk: response.result,
        probability: Math.max(...Object.values(response.probabilities)),
        confidence: response.confidence,
        abnormalities: Object.entries(response.probabilities).map(([type, probability]) => ({
          type: type.charAt(0).toUpperCase() + type.slice(1),
          severity: probability > 0.7 ? 'Severe' : probability > 0.4 ? 'Moderate' : 'Mild',
          probability: probability
        }))
      });
    } catch (err) {
      setError('Failed to analyze ECG data. Please try again.');
      console.error('ECG prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">ECG Analysis</CardTitle>
          <p className="text-muted-foreground">
            Upload ECG .dat file for advanced cardiovascular disease prediction
          </p>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-lg animate-shake">
              <p className="text-destructive">{error}</p>
            </div>
          )}
          
          {result ? (
            <div className="space-y-6 animate-fade-in-up">
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Analysis Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <p className={`text-2xl font-bold ${result.risk === 'High' ? 'text-destructive' : 'text-green-500'}`}>
                      {result.risk}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <p className="text-sm text-muted-foreground">Probability</p>
                    <p className="text-2xl font-bold text-foreground">
                      {(result.probability * 100).toFixed(1)}%
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="text-2xl font-bold text-foreground">
                      {(result.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-foreground">Detected Abnormalities</h4>
                  <div className="space-y-3">
                    {result.abnormalities.map((abnormality, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg border border-border">
                        <div className="flex justify-between">
                          <span className="font-medium text-foreground">{abnormality.type}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            abnormality.severity === 'Severe' ? 'bg-destructive/10 text-destructive' :
                            abnormality.severity === 'Moderate' ? 'bg-yellow-500/10 text-yellow-500' :
                            'bg-green-500/10 text-green-500'
                          }`}>
                            {abnormality.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-foreground">Visualization</h4>
                  <div className="h-48 bg-primary/5 rounded-lg flex items-center justify-center border border-border">
                    <div className="text-center">
                      <div className="h-32 w-64 bg-primary/10 rounded flex items-end justify-center pb-4">
                        <div className="flex items-end h-24 space-x-1">
                          {[...Array(20)].map((_, i) => (
                            <div 
                              key={i}
                              className="w-2 bg-primary rounded-t"
                              style={{ height: `${Math.random() * 80 + 10}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">ECG Waveform Visualization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-1/3 animate-pulse" />
              <div className="p-8 border-2 border-dashed border-border rounded-lg text-center">
                <Skeleton className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                <Skeleton className="h-4 w-1/2 mx-auto mb-2 animate-pulse" />
                <Skeleton className="h-4 w-1/3 mx-auto animate-pulse" />
              </div>
              <Skeleton className="h-10 w-full animate-pulse" />
            </div>
          ) : (
            <div className="space-y-6">
              <div 
                className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".dat"
                />
                
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  
                  <div>
                    <p className="font-medium text-foreground">
                      {file ? file.name : 'Drag & drop your ECG file here'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {file ? `${(file.size / 1024).toFixed(1)} KB` : 'Supports .dat format (Max 10MB)'}
                    </p>
                  </div>
                  
                  <Button type="button" variant="secondary">
                    Browse Files
                  </Button>
                </div>
              </div>
              
              {file && (
                <div className="p-4 bg-muted/50 rounded-lg border border-border animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button 
                      onClick={resetForm}
                      className="p-2 text-muted-foreground hover:text-destructive rounded-full hover:bg-destructive/10 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
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
              <Button type="button" variant="secondary" onClick={resetForm} disabled={!file}>
                Clear
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading || !file}>
                {isLoading ? (
                  <>
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze ECG'
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