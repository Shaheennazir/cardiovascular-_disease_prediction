import React from 'react';
import PredictionHistory from './PredictionHistory';

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-[clamp(2rem,8vw,6rem)] font-extrabold leading-tight tracking-[-0.033em]">Welcome back!</h1>
        <p className="text-[#6a6a6a] text-lg font-normal leading-relaxed">Here's what's happening with your cardiovascular health today.</p>
      </div>

      {/* Health Tips */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-white text-[clamp(1.5rem,6vw,4rem)] font-extrabold leading-tight tracking-[-0.033em]">
            Health Tips
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 p-0">
          <div className="flex flex-1 gap-6 rounded-[3rem] bg-[#2a2a2a] p-8 flex-col transform hover:rotate-0 transition-transform duration-300 rotate-[-2deg]">
            <div className="flex flex-col gap-2">
              <h3 className="text-white text-2xl font-bold leading-tight">Stay Active</h3>
              <p className="text-[#6a6a6a] text-base font-normal leading-relaxed">
                Aim for at least 30 minutes of moderate exercise daily to maintain cardiovascular health.
              </p>
            </div>
          </div>
          <div className="flex flex-1 gap-6 rounded-[3rem] bg-[#2a2a2a] p-8 flex-col transform hover:rotate-0 transition-transform duration-300 rotate-[3deg]">
            <div className="flex flex-col gap-2">
              <h3 className="text-white text-2xl font-bold leading-tight">Healthy Diet</h3>
              <p className="text-[#6a6a6a] text-base font-normal leading-relaxed">
                Reduce sodium intake and increase consumption of fruits, vegetables, and whole grains.
              </p>
            </div>
          </div>
          <div className="flex flex-1 gap-6 rounded-[3rem] bg-[#2a2a2a] p-8 flex-col transform hover:rotate-0 transition-transform duration-300 rotate-[-1deg]">
            <div className="flex flex-col gap-2">
              <h3 className="text-white text-2xl font-bold leading-tight">Regular Checkups</h3>
              <p className="text-[#6a6a6a] text-base font-normal leading-relaxed">
                Schedule regular appointments with your healthcare provider for preventive care.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction History */}
      <PredictionHistory />
    </div>
  );
};

export default DashboardHome;