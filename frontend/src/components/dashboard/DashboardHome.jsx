import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import PredictionHistory from './PredictionHistory';

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">Here's what's happening with your cardiovascular health today.</p>
      </div>

      {/* Health Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Health Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Stay Active</h3>
              <p className="text-sm text-muted-foreground">
                Aim for at least 30 minutes of moderate exercise daily to maintain cardiovascular health.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Healthy Diet</h3>
              <p className="text-sm text-muted-foreground">
                Reduce sodium intake and increase consumption of fruits, vegetables, and whole grains.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Regular Checkups</h3>
              <p className="text-sm text-muted-foreground">
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