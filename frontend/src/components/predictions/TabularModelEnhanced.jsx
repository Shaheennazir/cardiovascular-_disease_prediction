import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select } from '../../components/ui/select';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Skeleton } from '../../components/ui/Skeleton';

const TabularModelEnhanced = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock result
      setResult({
        risk: Math.random() > 0.5 ? 'High' : 'Low',
        probability: Math.random(),
        confidence: Math.random()
      });
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      age: '',
      sex: '',
      cp: '',
      trestbps: '',
      chol: '',
      fbs: '',
      restecg: '',
      thalach: '',
      exang: '',
      oldpeak: '',
      slope: '',
      ca: '',
      thal: ''
    });
    setResult(null);
    setError('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Tabular Data Prediction</CardTitle>
          <p className="text-muted-foreground">
            Enter patient information to predict cardiovascular disease risk
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
                <h3 className="text-xl font-semibold mb-4 text-foreground">Prediction Results</h3>
                
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
                  <h4 className="font-semibold mb-2 text-foreground">Risk Assessment</h4>
                  <div className="w-full bg-secondary rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${
                        result.probability > 0.7 ? 'bg-destructive' : 
                        result.probability > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${result.probability * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low Risk</span>
                    <span>High Risk</span>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-foreground">Recommendations</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
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
              <Skeleton className="h-8 w-1/3 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-1/4 animate-pulse" />
                    <Skeleton className="h-10 w-full animate-pulse" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full animate-pulse" />
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
                  <Label htmlFor="sex">Sex</Label>
                  <Select name="sex" value={formData.sex} onChange={handleChange} required>
                    <Select.Trigger>
                      <Select.Value placeholder="Select sex" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="0">Female</Select.Item>
                      <Select.Item value="1">Male</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cp">Chest Pain Type</Label>
                  <Select name="cp" value={formData.cp} onChange={handleChange} required>
                    <Select.Trigger>
                      <Select.Value placeholder="Select type" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="0">Typical Angina</Select.Item>
                      <Select.Item value="1">Atypical Angina</Select.Item>
                      <Select.Item value="2">Non-anginal Pain</Select.Item>
                      <Select.Item value="3">Asymptomatic</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="trestbps">Resting Blood Pressure (mm Hg)</Label>
                  <Input
                    id="trestbps"
                    name="trestbps"
                    type="number"
                    value={formData.trestbps}
                    onChange={handleChange}
                    required
                    placeholder="Enter blood pressure"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="chol">Serum Cholesterol (mg/dl)</Label>
                  <Input
                    id="chol"
                    name="chol"
                    type="number"
                    value={formData.chol}
                    onChange={handleChange}
                    required
                    placeholder="Enter cholesterol"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fbs">Fasting Blood Sugar {'>'} 120 mg/dl</Label>
                  <Select name="fbs" value={formData.fbs} onChange={handleChange} required>
                    <Select.Trigger>
                      <Select.Value placeholder="Select option" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="0">No</Select.Item>
                      <Select.Item value="1">Yes</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="restecg">Resting Electrocardiographic Results</Label>
                  <Select name="restecg" value={formData.restecg} onChange={handleChange} required>
                    <Select.Trigger>
                      <Select.Value placeholder="Select results" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="0">Normal</Select.Item>
                      <Select.Item value="1">ST-T Abnormality</Select.Item>
                      <Select.Item value="2">Left Ventricular Hypertrophy</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="thalach">Maximum Heart Rate Achieved</Label>
                  <Input
                    id="thalach"
                    name="thalach"
                    type="number"
                    value={formData.thalach}
                    onChange={handleChange}
                    required
                    placeholder="Enter heart rate"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="exang">Exercise Induced Angina</Label>
                  <Select name="exang" value={formData.exang} onChange={handleChange} required>
                    <Select.Trigger>
                      <Select.Value placeholder="Select option" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="0">No</Select.Item>
                      <Select.Item value="1">Yes</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="oldpeak">ST Depression Induced by Exercise</Label>
                  <Input
                    id="oldpeak"
                    name="oldpeak"
                    type="number"
                    step="0.1"
                    value={formData.oldpeak}
                    onChange={handleChange}
                    required
                    placeholder="Enter value"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slope">Slope of Peak Exercise ST Segment</Label>
                  <Select name="slope" value={formData.slope} onChange={handleChange} required>
                    <Select.Trigger>
                      <Select.Value placeholder="Select slope" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="0">Upsloping</Select.Item>
                      <Select.Item value="1">Flat</Select.Item>
                      <Select.Item value="2">Downsloping</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ca">Number of Major Vessels Colored</Label>
                  <Select name="ca" value={formData.ca} onChange={handleChange} required>
                    <Select.Trigger>
                      <Select.Value placeholder="Select number" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="0">0</Select.Item>
                      <Select.Item value="1">1</Select.Item>
                      <Select.Item value="2">2</Select.Item>
                      <Select.Item value="3">3</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="thal">Thalassemia</Label>
                  <Select name="thal" value={formData.thal} onChange={handleChange} required>
                    <Select.Trigger>
                      <Select.Value placeholder="Select type" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="0">Normal</Select.Item>
                      <Select.Item value="1">Fixed Defect</Select.Item>
                      <Select.Item value="2">Reversible Defect</Select.Item>
                    </Select.Content>
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
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                    Analyzing...
                  </>
                ) : (
                  'Predict Risk'
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