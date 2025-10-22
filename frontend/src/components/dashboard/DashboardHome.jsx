import React from 'react';
import { Activity, Heart, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import PredictionHistory from './PredictionHistory';

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1 text-text-primary">Welcome back!</h1>
        <p className="body-large text-text-secondary mt-2">Here's what's happening with your cardiovascular health today.</p>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="interactive-lift">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-500">
                <Activity className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="body-small text-text-secondary">Total Predictions</p>
                <p className="heading-3 text-text-primary">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="interactive-lift">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-500">
                <Heart className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="body-small text-text-secondary">Low Risk</p>
                <p className="heading-3 text-text-primary">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="interactive-lift">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-500">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="body-small text-text-secondary">Needs Attention</p>
                <p className="heading-3 text-text-primary">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Health Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-surface-contrast">
              <h3 className="font-medium mb-2 text-text-primary">Stay Active</h3>
              <p className="body-small text-text-secondary">
                Aim for at least 30 minutes of moderate exercise daily to maintain cardiovascular health.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-surface-contrast">
              <h3 className="font-medium mb-2 text-text-primary">Healthy Diet</h3>
              <p className="body-small text-text-secondary">
                Reduce sodium intake and increase consumption of fruits, vegetables, and whole grains.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-surface-contrast">
              <h3 className="font-medium mb-2 text-text-primary">Regular Checkups</h3>
              <p className="body-small text-text-secondary">
                Schedule regular appointments with your healthcare provider for preventive care.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prediction History */}
      <PredictionHistory />
    </div>
  );
};

export default DashboardHome;