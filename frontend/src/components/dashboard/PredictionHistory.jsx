import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Heart, Activity, Clock } from 'lucide-react';
import apiService from '../../api';

const PredictionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    <Card>
      <CardHeader>
        <CardTitle>Prediction History</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No predictions yet</h3>
            <p className="text-muted-foreground mb-4">
              Your prediction history will appear here once you've made some predictions.
            </p>
            <Button>Create your first prediction</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((prediction) => (
              <div 
                key={prediction.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${getTypeColor(prediction.type)}`}>
                    {getTypeIcon(prediction.type)}
                  </div>
                  <div>
                    <h3 className="font-medium capitalize">{prediction.type} Prediction</h3>
                    <p className={`text-sm ${getResultColor(prediction.result)}`}>
                      {prediction.result}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(prediction.created_at).toLocaleDateString()} at{' '}
                      {new Date(prediction.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {typeof prediction.confidence === 'number' 
                      ? `${(prediction.confidence * 100).toFixed(0)}% confidence` 
                      : 'N/A'}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-1">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionHistory;