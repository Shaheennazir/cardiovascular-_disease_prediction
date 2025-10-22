import React from 'react';
import { GlassmorphicCard, GlassmorphicCardContent, GlassmorphicCardHeader, GlassmorphicCardTitle } from '../../components/ui/glassmorphic-card';
import { TactileButton } from '../../components/ui/tactile-button';
import PredictionHistory from './PredictionHistory';

const DashboardHome = () => {
  // Mock data for dashboard metrics
  const metrics = [
    { title: 'Average Risk Score', value: '78', change: '+2%', positive: true },
    { title: 'New Predictions Today', value: '24', change: '-5%', positive: false },
    { title: 'High-Risk Patients', value: '12', change: '+1%', positive: true },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-zen-dark-blue dark:text-zen-light-blue">Welcome back!</h1>
        <p className="text-zen-dark-blue/80 dark:text-zen-light-blue/80">Here's what's happening with your cardiovascular health today.</p>
      </div>

      {/* Metrics Cards */}
      <div className="flex flex-wrap gap-6">
        {metrics.map((metric, index) => (
          <GlassmorphicCard key={index} className="min-w-[158px] flex-1 flex-col gap-4">
            <GlassmorphicCardHeader>
              <p className="text-zen-dark-blue/80 dark:text-zen-light-blue/80 text-lg font-light leading-normal">
                {metric.title}
              </p>
            </GlassmorphicCardHeader>
            <GlassmorphicCardContent>
              <p className="text-zen-dark-blue dark:text-zen-light-blue tracking-normal text-5xl font-light leading-tight">
                {metric.value}
              </p>
              <p className={`text-lg font-light leading-normal ${metric.positive ? 'text-zen-green' : 'text-zen-blue'}`}>
                {metric.change}
              </p>
            </GlassmorphicCardContent>
          </GlassmorphicCard>
        ))}
      </div>

      {/* Risk Distribution Chart */}
      <GlassmorphicCard>
        <GlassmorphicCardHeader>
          <GlassmorphicCardTitle>Risk Distribution</GlassmorphicCardTitle>
        </GlassmorphicCardHeader>
        <GlassmorphicCardContent>
          <div className="grid min-h-[220px] grid-flow-col gap-8 grid-rows-[1fr_auto] items-end justify-items-center px-4 mt-6">
            <div className="bg-primary/30 dark:bg-primary/40 w-full rounded-t-lg" style={{ height: '20%' }}></div>
            <p className="text-zen-dark-blue/60 dark:text-zen-light-blue/60 text-base font-light leading-normal tracking-normal">Low</p>
            <div className="bg-zen-green/30 dark:bg-zen-green/40 w-full rounded-t-lg" style={{ height: '80%' }}></div>
            <p className="text-zen-dark-blue/60 dark:text-zen-light-blue/60 text-base font-light leading-normal tracking-normal">Medium</p>
            <div className="bg-zen-blue/30 dark:bg-zen-blue/40 w-full rounded-t-lg" style={{ height: '70%' }}></div>
            <p className="text-zen-dark-blue/60 dark:text-zen-light-blue/60 text-base font-light leading-normal tracking-normal">High</p>
          </div>
        </GlassmorphicCardContent>
      </GlassmorphicCard>

      {/* Action Buttons */}
      <div className="flex justify-center flex-wrap gap-6 px-4 py-3">
        <TactileButton size="lg">
          New Prediction
        </TactileButton>
        <TactileButton variant="secondary" size="lg">
          View All Patients
        </TactileButton>
        <TactileButton variant="outline" size="lg">
          Generate Report
        </TactileButton>
      </div>

      {/* Health Tips */}
      <GlassmorphicCard>
        <GlassmorphicCardHeader>
          <GlassmorphicCardTitle>Health Tips</GlassmorphicCardTitle>
        </GlassmorphicCardHeader>
        <GlassmorphicCardContent>
          <div className="grid gap-4 md:grid-cols-3 mt-4">
            <div className="rounded-xl p-6 glassmorphic">
              <h3 className="font-medium mb-2 text-zen-dark-blue dark:text-zen-light-blue">Stay Active</h3>
              <p className="text-sm text-zen-dark-blue/80 dark:text-zen-light-blue/80">
                Aim for at least 30 minutes of moderate exercise daily to maintain cardiovascular health.
              </p>
            </div>
            <div className="rounded-xl p-6 glassmorphic">
              <h3 className="font-medium mb-2 text-zen-dark-blue dark:text-zen-light-blue">Healthy Diet</h3>
              <p className="text-sm text-zen-dark-blue/80 dark:text-zen-light-blue/80">
                Reduce sodium intake and increase consumption of fruits, vegetables, and whole grains.
              </p>
            </div>
            <div className="rounded-xl p-6 glassmorphic">
              <h3 className="font-medium mb-2 text-zen-dark-blue dark:text-zen-light-blue">Regular Checkups</h3>
              <p className="text-sm text-zen-dark-blue/80 dark:text-zen-light-blue/80">
                Schedule regular appointments with your healthcare provider for preventive care.
              </p>
            </div>
          </div>
        </GlassmorphicCardContent>
      </GlassmorphicCard>

      {/* Prediction History */}
      <PredictionHistory />
    </div>
  );
};

export default DashboardHome;