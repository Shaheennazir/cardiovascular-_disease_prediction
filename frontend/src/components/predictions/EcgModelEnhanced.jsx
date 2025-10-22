import React, { useState, useRef } from 'react';
import apiService from '../../api';

const EcgModelEnhanced = () => {
  const [files, setFiles] = useState([]);
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
      validateAndSetFiles(droppedFiles);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      validateAndSetFiles(selectedFiles);
    }
  };

  const validateAndSetFiles = (files) => {
    // Reset error
    setError('');
    
    // Check that we have exactly 2 files
    if (files.length !== 2) {
      setError('Please select exactly two files: one .dat file and one .hea file.');
      setFiles([]);
      return;
    }
    
    // Check file types
    const datFiles = files.filter(file => file.name.endsWith('.dat'));
    const heaFiles = files.filter(file => file.name.endsWith('.hea'));
    
    if (datFiles.length !== 1 || heaFiles.length !== 1) {
      setError('Please upload exactly one .dat file and one .hea file.');
      setFiles([]);
      return;
    }
    
    const datFile = datFiles[0];
    const heaFile = heaFiles[0];
    
    // Check file sizes (max 10MB each)
    if (datFile.size > 10 * 1024 * 1024 || heaFile.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit for one or both files.');
      setFiles([]);
      return;
    }
    
    // Check that filenames match (except extension)
    const datName = datFile.name.replace('.dat', '');
    const heaName = heaFile.name.replace('.hea', '');
    
    if (datName !== heaName) {
      setError('The .dat and .hea files must have matching names.');
      setFiles([]);
      return;
    }
    
    setFiles([datFile, heaFile]);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length !== 2) {
      setError('Please select exactly two files: one .dat file and one .hea file.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await apiService.predictEcg(files);
      
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
      if (err.message.includes('header file not found') || err.message.includes('.hea')) {
        setError('Missing ECG header file. Please upload both the .dat and .hea files together.');
      } else {
        setError('Failed to analyze ECG data. Please try again.');
      }
      console.error('ECG prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFiles([]);
    setResult(null);
    setError('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 text-left">
          <h1 className="text-white text-[clamp(2rem,8vw,6rem)] font-extrabold leading-tight tracking-[-0.033em]">
            ECG Analysis
          </h1>
          <p className="text-[#6a6a6a] text-lg font-normal leading-relaxed">
            Upload ECG .dat and .hea files for advanced cardiovascular disease prediction
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-16 px-4">
        {error && (
          <div className="mb-6 p-4 bg-[#f20d80]/10 border-2 border-solid border-[#f20d80] rounded-[3rem] animate-shake">
            <p className="text-[#f20d80]">{error}</p>
          </div>
        )}
        
        {result ? (
          <div className="space-y-6 animate-fade-in-up">
            <div className="p-8 bg-[#2a2a2a] rounded-[3rem]">
              <h3 className="text-white text-2xl font-bold leading-tight mb-6">Analysis Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-1 gap-6 rounded-[3rem] bg-[#1a1a1a] p-6 flex-col">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#6a6a6a] text-base font-normal leading-relaxed">Risk Level</p>
                    <p className={`text-3xl font-bold ${result.risk === 'High' ? 'text-[#f20d80]' : 'text-green-500'}`}>
                      {result.risk}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-1 gap-6 rounded-[3rem] bg-[#1a1a1a] p-6 flex-col">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#6a6a6a] text-base font-normal leading-relaxed">Probability</p>
                    <p className="text-white text-3xl font-bold">
                      {(result.probability * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-1 gap-6 rounded-[3rem] bg-[#1a1a1a] p-6 flex-col">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#6a6a6a] text-base font-normal leading-relaxed">Confidence</p>
                    <p className="text-white text-3xl font-bold">
                      {(result.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-white text-2xl font-bold leading-tight mb-4">Detected Abnormalities</h4>
                <div className="space-y-4">
                  {result.abnormalities.map((abnormality, index) => (
                    <div key={index} className="p-6 bg-[#1a1a1a] rounded-[3rem]">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-xl font-bold">{abnormality.type}</span>
                        <span className={`px-4 py-2 rounded-[3rem] text-base font-bold ${
                          abnormality.severity === 'Severe' ? 'bg-[#f20d80]/10 text-[#f20d80]' :
                          abnormality.severity === 'Moderate' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-green-500/10 text-green-500'
                        }`}>
                          {abnormality.severity}
                        </span>
                      </div>
                      <div className="w-full bg-[#2a2a2a] rounded-full h-4 mt-4">
                        <div
                          className={`h-4 rounded-full ${
                            abnormality.severity === 'Severe' ? 'bg-[#f20d80]' :
                            abnormality.severity === 'Moderate' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${abnormality.probability * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-base text-[#6a6a6a] font-normal mt-2">
                        <span>0%</span>
                        <span>{(abnormality.probability * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 bg-[#1a1a1a] rounded-[3rem]">
                <h4 className="text-white text-2xl font-bold leading-tight mb-4">Visualization</h4>
                <div className="h-64 bg-[#2a2a2a] rounded-[3rem] flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-48 w-full bg-[#1a1a1a] rounded-[3rem] flex items-end justify-center pb-6">
                      <div className="flex items-end h-32 space-x-1 px-4">
                        {[...Array(40)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 bg-[#f20d80] rounded-t"
                            style={{ height: `${Math.random() * 80 + 10}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[#6a6a6a] text-base font-normal mt-4">ECG Waveform Visualization</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={resetForm}
                className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-fit"
              >
                <span className="truncate">New Analysis</span>
              </button>
            </div>
          </div>
        ) : isLoading ? (
          <div className="space-y-6">
            <div className="h-12 w-1/3 bg-[#2a2a2a] rounded-[3rem] animate-pulse"></div>
            <div className="p-12 border-2 border-dashed border-[#4a4a4a] rounded-[3rem] text-center">
              <div className="h-16 w-16 mx-auto mb-6 bg-[#2a2a2a] rounded-full animate-pulse"></div>
              <div className="h-6 w-1/2 mx-auto mb-4 bg-[#2a2a2a] rounded animate-pulse"></div>
              <div className="h-4 w-1/3 mx-auto bg-[#2a2a2a] rounded animate-pulse"></div>
            </div>
            <div className="h-14 w-full bg-[#2a2a2a] rounded-[3rem] animate-pulse"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div
              className={`p-12 border-2 border-dashed rounded-[3rem] text-center cursor-pointer transition-all duration-300 ${
                isDragging ? 'border-[#f20d80] bg-[#f20d80]/5' : 'border-[#4a4a4a] hover:border-[#f20d80]/50'
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
                accept=".dat,.hea"
                multiple
              />
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="p-4 bg-[#f20d80]/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#f20d80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                
                <div>
                  <p className="text-white text-xl font-bold">
                    {files.length > 0 ? `${files.length} file(s) selected` : 'Drag & drop your ECG files here'}
                  </p>
                  <p className="text-[#6a6a6a] text-base font-normal mt-2">
                    {files.length > 0 ? 'Ready for upload' : 'Supports .dat and .hea formats (Max 10MB each). Select both files together.'}
                  </p>
                </div>
                
                <button
                  type="button"
                  className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#2a2a2a] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#4a4a4a] transition-colors w-fit border-2 border-solid border-[#4a4a4a]"
                >
                  <span className="truncate">Browse Files</span>
                </button>
              </div>
            </div>
            
            {files.length > 0 && (
              <div className="p-6 bg-[#2a2a2a] rounded-[3rem] animate-fade-in">
                <div className="space-y-4">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-[3rem]">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-[#f20d80]/10 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f20d80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white text-base font-bold">{file.name}</p>
                          <p className="text-[#6a6a6a] text-sm font-normal">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <button
                      onClick={resetForm}
                      className="p-3 text-[#6a6a6a] hover:text-[#f20d80] rounded-full hover:bg-[#4a4a4a] transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={resetForm}
                disabled={files.length === 0}
                className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#2a2a2a] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#4a4a4a] transition-colors w-fit border-2 border-solid border-[#4a4a4a] disabled:opacity-50"
              >
                <span className="truncate">Clear</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading || files.length !== 2}
                className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-fit disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  'Analyze ECG'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcgModelEnhanced;