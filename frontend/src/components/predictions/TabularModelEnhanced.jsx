import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select } from '../../components/ui/select';
import apiService from '../../api';
import { Activity, Zap } from 'lucide-react';

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
      <Card className="interactive-lift">
        <CardHeader>
          <CardTitle>Tabular Data Prediction</CardTitle>
          <CardDescription>
            Enter patient information to predict cardiovascular disease risk
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg animate-shake">
              <p className="text-danger-800">{error}</p>
            </div>
          )}
          
          {result ? (
            <div className="space-y-6 animate-fade-in-up">
              <div className="p-6 bg-surface rounded-lg border border-border">
                <h3 className="heading-3 mb-4 text-text-primary">Prediction Results</h3>
                
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
                  <h4 className="font-semibold mb-2 text-text-primary">Recommendations</h4>
                  <ul className="list-disc pl-5 space-y-1 text-text-secondary">
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
            </div>
          ) : isLoading ? (
            <div className="space-y-6">
              <div className="h-6 w-1/3 bg-surface-contrast rounded animate-pulse-subtle"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-1/4 bg-surface-contrast rounded animate-pulse-subtle"></div>
                    <div className="h-10 w-full bg-surface-contrast rounded animate-pulse-subtle"></div>
                  </div>
                ))}
              </div>
              <div className="h-10 w-full bg-surface-contrast rounded animate-pulse-subtle"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    placeholder="Enter age"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sex">Gender</Label>
                  <Select name="sex" value={formData.sex} onValueChange={(value) => setFormData({...formData, sex: value})} required>
                    <option value="">Select gender</option>
                    <option value="0">Female</option>
                    <option value="1">Male</option>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    placeholder="Enter height"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    placeholder="Enter weight"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="trestbps">Systolic Blood Pressure (ap_hi)</Label>
                  <Input
                    id="trestbps"
                    name="trestbps"
                    type="number"
                    value={formData.trestbps}
                    onChange={handleChange}
                    required
                    placeholder="Enter systolic BP"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="chol">Diastolic Blood Pressure (ap_lo)</Label>
                  <Input
                    id="chol"
                    name="chol"
                    type="number"
                    value={formData.chol}
                    onChange={handleChange}
                    required
                    placeholder="Enter diastolic BP"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cp">Cholesterol Level</Label>
                  <Select name="cp" value={formData.cp} onValueChange={(value) => setFormData({...formData, cp: value})} required>
                    <option value="">Select cholesterol level</option>
                    <option value="0">Low</option>
                    <option value="1">Normal</option>
                    <option value="2">High</option>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fbs">Glucose Level</Label>
                  <Select name="fbs" value={formData.fbs} onValueChange={(value) => setFormData({...formData, fbs: value})} required>
                    <option value="">Select glucose level</option>
                    <option value="0">Low</option>
                    <option value="1">Normal</option>
                    <option value="2">High</option>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="exang">Smoking</Label>
                  <Select name="exang" value={formData.exang} onValueChange={(value) => setFormData({...formData, exang: value})} required>
                    <option value="">Select smoking status</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slope">Alcohol Consumption</Label>
                  <Select name="slope" value={formData.slope} onValueChange={(value) => setFormData({...formData, slope: value})} required>
                    <option value="">Select alcohol consumption</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="thal">Physical Activity</Label>
                  <Select name="thal" value={formData.thal} onValueChange={(value) => setFormData({...formData, thal: value})} required>
                    <option value="">Select activity level</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Select>
                </div>
              </div>
            </form>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {result ? (
            <div className="flex space-x-3">
              <Button onClick={resetForm} variant="secondary">
                New Prediction
              </Button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Button type="button" variant="secondary" onClick={resetForm}>
                Reset
              </Button>
              <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
                {isLoading ? (
                  <>
                    <Activity className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Predict Risk
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

export default TabularModelEnhanced;