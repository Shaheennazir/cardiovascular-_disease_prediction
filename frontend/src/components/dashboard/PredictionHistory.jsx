import React, { useState, useEffect } from 'react';
import { GlassmorphicCard, GlassmorphicCardContent, GlassmorphicCardHeader, GlassmorphicCardTitle } from '../../components/ui/glassmorphic-card';
import { TactileButton } from '../../components/ui/tactile-button';
import { StatusButton } from '../../components/ui/status-button';
import {
  TactileTable,
  TactileTableHeader,
  TactileTableBody,
  TactileTableRow,
  TactileTableHead,
  TactileTableCell
} from '../../components/ui/tactile-table';
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

  const getResultStatus = (result) => {
    if (result.includes('High') || result.includes('Arrhythmia') || result.includes('Detected')) {
      return 'high';
    } else if (result.includes('Medium') || result.includes('Moderate')) {
      return 'medium';
    }
    return 'low';
  };

  const getResultLabel = (result) => {
    if (result.includes('High') || result.includes('Arrhythmia') || result.includes('Detected')) {
      return 'High';
    } else if (result.includes('Medium') || result.includes('Moderate')) {
      return 'Medium';
    }
    return 'Low';
  };

  if (loading) {
    return (
      <GlassmorphicCard>
        <GlassmorphicCardHeader>
          <GlassmorphicCardTitle>Prediction History</GlassmorphicCardTitle>
        </GlassmorphicCardHeader>
        <GlassmorphicCardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg animate-pulse glassmorphic">
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
        </GlassmorphicCardContent>
      </GlassmorphicCard>
    );
  }

  if (error) {
    return (
      <GlassmorphicCard>
        <GlassmorphicCardHeader>
          <GlassmorphicCardTitle>Prediction History</GlassmorphicCardTitle>
        </GlassmorphicCardHeader>
        <GlassmorphicCardContent>
          <div className="p-4 rounded-lg bg-destructive/10 glassmorphic">
            <p className="text-destructive">{error}</p>
            <TactileButton onClick={fetchHistory} variant="secondary" className="mt-2">
              Retry
            </TactileButton>
          </div>
        </GlassmorphicCardContent>
      </GlassmorphicCard>
    );
  }

  return (
    <GlassmorphicCard>
      <GlassmorphicCardHeader>
        <GlassmorphicCardTitle>Prediction History</GlassmorphicCardTitle>
      </GlassmorphicCardHeader>
      <GlassmorphicCardContent>
        {history.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-zen-dark-blue/60 dark:text-zen-light-blue/60 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2 text-zen-dark-blue dark:text-zen-light-blue">No predictions yet</h3>
            <p className="text-zen-dark-blue/80 dark:text-zen-light-blue/80 mb-4">
              Your prediction history will appear here once you've made some predictions.
            </p>
            <TactileButton>New Prediction</TactileButton>
          </div>
        ) : (
          <div className="@container">
            <TactileTable>
              <TactileTableHeader>
                <TactileTableRow>
                  <TactileTableHead className="w-[400px]">Patient ID</TactileTableHead>
                  <TactileTableHead className="w-[400px]">Prediction Date</TactileTableHead>
                  <TactileTableHead className="w-[400px]">Risk Score</TactileTableHead>
                  <TactileTableHead className="w-60">Status</TactileTableHead>
                </TactileTableRow>
              </TactileTableHeader>
              <TactileTableBody>
                {history.map((prediction) => (
                  <TactileTableRow key={prediction.id}>
                    <TactileTableCell className="w-[400px]">
                      #{prediction.id.toString().padStart(5, '0')}
                    </TactileTableCell>
                    <TactileTableCell className="w-[400px]">
                      {new Date(prediction.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </TactileTableCell>
                    <TactileTableCell className="w-[400px]">
                      {typeof prediction.confidence === 'number'
                        ? Math.round(prediction.confidence * 100)
                        : 'N/A'}
                    </TactileTableCell>
                    <TactileTableCell className="w-60">
                      <StatusButton variant={getResultStatus(prediction.result)}>
                        {getResultLabel(prediction.result)}
                      </StatusButton>
                    </TactileTableCell>
                  </TactileTableRow>
                ))}
              </TactileTableBody>
            </TactileTable>
          </div>
        )}
      </GlassmorphicCardContent>
    </GlassmorphicCard>
  );
};

export default PredictionHistory;