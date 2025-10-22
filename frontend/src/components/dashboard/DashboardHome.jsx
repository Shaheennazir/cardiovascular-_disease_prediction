import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import PredictionHistory from './PredictionHistory';

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zen-dark-blue dark:text-zen-light-blue">Welcome back!</h1>
        <p className="text-zen-dark-blue/80 dark:text-zen-light-blue/80">Here's what's happening with your cardiovascular health today.</p>
      </div>

      {/* Health Tips */}
      <Card className="glassmorphic">
        <CardHeader>
          <CardTitle className="text-zen-dark-blue dark:text-zen-light-blue">Health Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg p-4 glassmorphic">
              <h3 className="font-medium mb-2 text-zen-dark-blue dark:text-zen-light-blue">Stay Active</h3>
              <p className="text-sm text-zen-dark-blue/70 dark:text-zen-light-blue/70">
                Aim for at least 30 minutes of moderate exercise daily to maintain cardiovascular health.
              </p>
            </div>
            <div className="rounded-lg p-4 glassmorphic">
              <h3 className="font-medium mb-2 text-zen-dark-blue dark:text-zen-light-blue">Healthy Diet</h3>
              <p className="text-sm text-zen-dark-blue/70 dark:text-zen-light-blue/70">
                Reduce sodium intake and increase consumption of fruits, vegetables, and whole grains.
              </p>
            </div>
            <div className="rounded-lg p-4 glassmorphic">
              <h3 className="font-medium mb-2 text-zen-dark-blue dark:text-zen-light-blue">Regular Checkups</h3>
              <p className="text-sm text-zen-dark-blue/70 dark:text-zen-light-blue/70">
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