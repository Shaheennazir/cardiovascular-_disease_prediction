import React, { useState } from 'react';
import apiService from '../../api';

const TabularModelEnhanced = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    height: '',
    weight: '',
    trestbps: '',
    chol: '',
    cp: '',
    fbs: '',
    exang: '',
    slope: '',
    thal: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);
    
    try {
      // Convert form data to match backend schema
      const requestData = {
        age: parseInt(formData.age),
        gender: parseInt(formData.sex) + 1, // Backend expects 1: Male, 2: Female
        height: parseInt(formData.height) || 0,
        weight: parseInt(formData.weight) || 0,
        ap_hi: parseInt(formData.trestbps) || 0,
        ap_lo: parseInt(formData.chol) || 0,
        cholesterol: parseInt(formData.cp) + 1, // Backend expects 1: Normal, 2: Above Normal, 3: Well Above Normal
        gluc: parseInt(formData.fbs) + 1, // Backend expects 1: Normal, 2: Above Normal, 3: Well Above Normal
        smoke: parseInt(formData.exang),
        alco: parseInt(formData.slope),
        active: parseInt(formData.thal)
      };
      
      const response = await apiService.predictTabular(requestData);
      
      // Transform response to match existing UI structure
      setResult({
        risk: response.risk_level,
        probability: response.probability,
        confidence: response.confidence
      });
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      age: '',
      sex: '',
      height: '',
      weight: '',
      trestbps: '',
      chol: '',
      cp: '',
      fbs: '',
      exang: '',
      slope: '',
      thal: ''
    });
    setResult(null);
    setError('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 text-left">
          <h1 className="text-white text-[clamp(2rem,8vw,6rem)] font-extrabold leading-tight tracking-[-0.033em]">
            Tabular Data Prediction
          </h1>
          <p className="text-[#6a6a6a] text-lg font-normal leading-relaxed">
            Enter patient information to predict cardiovascular disease risk
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
              <h3 className="text-white text-2xl font-bold leading-tight mb-6">Prediction Results</h3>
              
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
                <h4 className="text-white text-2xl font-bold leading-tight mb-4">Risk Assessment</h4>
                <div className="w-full bg-[#1a1a1a] rounded-full h-6">
                  <div
                    className={`h-6 rounded-full ${
                      result.probability > 0.7 ? 'bg-[#f20d80]' :
                      result.probability > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${result.probability * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-base text-[#6a6a6a] font-normal mt-2">
                  <span>Low Risk</span>
                  <span>High Risk</span>
                </div>
              </div>
              
              <div className="p-6 bg-[#1a1a1a] rounded-[3rem]">
                <h4 className="text-white text-2xl font-bold leading-tight mb-4">Recommendations</h4>
                <ul className="list-disc pl-8 space-y-2 text-[#6a6a6a] text-base font-normal">
                  <li>Maintain regular checkups with your healthcare provider</li>
                  <li>Follow a heart-healthy diet rich in fruits and vegetables</li>
                  <li>Engage in regular physical activity</li>
                  {result.risk === 'High' && (
                    <>
                      <li>Consider consulting a cardiologist for further evaluation</li>
                      <li>Monitor blood pressure and cholesterol levels regularly</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={resetForm}
                className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-fit"
              >
                <span className="truncate">New Prediction</span>
              </button>
            </div>
          </div>
        ) : isLoading ? (
          <div className="space-y-6">
            <div className="h-12 w-1/3 bg-[#2a2a2a] rounded-[3rem] animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-4 w-1/4 bg-[#2a2a2a] rounded animate-pulse"></div>
                  <div className="h-14 w-full bg-[#2a2a2a] rounded-[3rem] animate-pulse"></div>
                </div>
              ))}
            </div>
            <div className="h-14 w-full bg-[#2a2a2a] rounded-[3rem] animate-pulse"></div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label htmlFor="age" className="text-white text-base font-bold">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  placeholder="Enter age"
                  className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-4">
                <label htmlFor="sex" className="text-white text-base font-bold">Gender</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={(e) => setFormData({...formData, sex: e.target.value})}
                  required
                  className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>Select gender</option>
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <label htmlFor="height" className="text-white text-base font-bold">Height (cm)</label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  placeholder="Enter height"
                  className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-4">
                <label htmlFor="weight" className="text-white text-base font-bold">Weight (kg)</label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  placeholder="Enter weight"
                  className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-4">
                <label htmlFor="trestbps" className="text-white text-base font-bold">Systolic Blood Pressure (ap_hi)</label>
                <input
                  id="trestbps"
                  name="trestbps"
                  type="number"
                  value={formData.trestbps}
                  onChange={handleChange}
                  required
                  placeholder="Enter systolic BP"
                  className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-4">
                <label htmlFor="chol" className="text-white text-base font-bold">Diastolic Blood Pressure (ap_lo)</label>
                <input
                  id="chol"
                  name="chol"
                  type="number"
                  value={formData.chol}
                  onChange={handleChange}
                  required
                  placeholder="Enter diastolic BP"
                  className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-4">
                <label htmlFor="cp" className="text-white text-base font-bold">Cholesterol Level</label>
                <select
                  name="cp"
                  value={formData.cp}
                  onChange={(e) => setFormData({...formData, cp: e.target.value})}
                  required
                  className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>Select cholesterol level</option>
                  <option value="0">Low</option>
                  <option value="1">Normal</option>
                  <option value="2">High</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <label htmlFor="fbs" className="text-white text-base font-bold">Glucose Level</label>
                <select
                  name="fbs"
                  value={formData.fbs}
                  onChange={(e) => setFormData({...formData, fbs: e.target.value})}
                  required
                  className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>Select glucose level</option>
                  <option value="0">Low</option>
                  <option value="1">Normal</option>
                  <option value="2">High</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <label htmlFor="exang" className="text-white text-base font-bold">Smoking</label>
                <select
                  name="exang"
                  value={formData.exang}
                  onChange={(e) => setFormData({...formData, exang: e.target.value})}
                  required
                  className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>Select smoking status</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <label htmlFor="slope" className="text-white text-base font-bold">Alcohol Consumption</label>
                <select
                  name="slope"
                  value={formData.slope}
                  onChange={(e) => setFormData({...formData, slope: e.target.value})}
                  required
                  className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>Select alcohol consumption</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <label htmlFor="thal" className="text-white text-base font-bold">Physical Activity</label>
                <select
                  name="thal"
                  value={formData.thal}
                  onChange={(e) => setFormData({...formData, thal: e.target.value})}
                  required
                  className="flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>Select activity level</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#2a2a2a] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#4a4a4a] transition-colors w-fit border-2 border-solid border-[#4a4a4a]"
              >
                <span className="truncate">Reset</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-fit disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  'Predict Risk'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabularModelEnhanced;