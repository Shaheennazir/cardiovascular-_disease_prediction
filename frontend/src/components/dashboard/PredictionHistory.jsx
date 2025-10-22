import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Heart, Activity, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api';

const PredictionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await apiService.getHistory();
      setHistory(response.predictions);
    } catch (err) {
      setError('Failed to load prediction history');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'ecg':
        return <Activity className="h-4 w-4" />;
      case 'tabular':
      default:
        return <Heart className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'ecg':
        return 'bg-blue-500/10 text-blue-500';
      case 'tabular':
      default:
        return 'bg-red-500/10 text-red-500';
    }
  };

  const getResultColor = (result) => {
    if (result.includes('High') || result.includes('Arrhythmia') || result.includes('Detected')) {
      return 'text-destructive';
    }
    return 'text-green-500';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Prediction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-muted rounded"></div>
                    <div className="h-3 w-32 bg-muted rounded"></div>
                  </div>
                </div>
                <div className="h-4 w-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Prediction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-destructive/10 rounded-lg">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchHistory} variant="secondary" className="mt-2">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <h2 className="text-white text-[clamp(1.5rem,6vw,4rem)] font-extrabold leading-tight tracking-[-0.033em]">
          Prediction History
        </h2>
      </div>
      
      <div className="flex flex-col gap-6">
        {history.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-[#6a6a6a] mx-auto mb-6" />
            <h3 className="text-white text-2xl font-bold mb-4">No predictions yet</h3>
            <p className="text-[#6a6a6a] text-lg font-normal mb-6">
              Your prediction history will appear here once you've made some predictions.
            </p>
            <button 
              onClick={() => navigate('/dashboard/tabular')}
              className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-fit mx-auto"
            >
              <span className="truncate">Create your first prediction</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((prediction) => (
              <div
                key={prediction.id}
                className="flex flex-col md:flex-row items-center justify-between p-6 bg-[#2a2a2a] rounded-[3rem] hover:bg-[#2a2a2a]/80 transition-colors duration-200"
              >
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className={`p-4 rounded-full ${getTypeColor(prediction.type)}`}>
                    {getTypeIcon(prediction.type)}
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold capitalize">{prediction.type} Prediction</h3>
                    <p className={`text-lg font-normal ${getResultColor(prediction.result)}`}>
                      {prediction.result}
                    </p>
                    <p className="text-[#6a6a6a] text-base font-normal">
                      {new Date(prediction.created_at).toLocaleDateString()} at{' '}
                      {new Date(prediction.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-white text-lg font-bold mb-2">
                    {typeof prediction.confidence === 'number'
                      ? `${(prediction.confidence * 100).toFixed(0)}% confidence`
                      : 'N/A'}
                  </p>
                  <button className="flex min-w-[100px] max-w-[300px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-10 px-6 bg-[#1a1a1a] text-white text-base font-extrabold leading-normal tracking-[0.015em] hover:bg-[#4a4a4a] transition-colors w-fit border-2 border-solid border-[#4a4a4a] mx-auto md:mx-0">
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionHistory;