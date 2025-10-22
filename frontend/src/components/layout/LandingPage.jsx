import React from 'react';
import { Heart, Activity, Brain, ShieldCheck, Upload, Cpu, BarChartBig, Twitter, Facebook, Instagram } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, rotation }) => (
  <div className={`flex flex-1 gap-6 rounded-[3rem] bg-[#2a2a2a] p-8 flex-col transform hover:rotate-0 transition-transform duration-300 glitch-effect-border ${rotation}`}>
    <Icon className="text-[#f20d80] w-12 h-12" strokeWidth={1.5} />
    <div className="flex flex-col gap-2">
      <h2 className="text-white text-2xl font-bold leading-tight">{title}</h2>
      <p className="text-[#6a6a6a] text-base font-normal leading-relaxed">{description}</p>
    </div>
  </div>
);

const HowItWorksCard = ({ icon: Icon, title, description, step, rotation }) => (
  <div className={`flex flex-col gap-6 bg-[#2a2a2a] p-8 rounded-[3rem] glitch-effect-border transform hover:rotate-0 transition-transform duration-300 ${rotation}`}>
    <Icon className="text-[#f20d80] w-12 h-12" strokeWidth={1.5} />
    <div className="flex flex-col gap-2">
      <h2 className="text-white text-2xl font-bold leading-tight">{step}. {title}</h2>
      <p className="text-[#6a6a6a] text-base font-normal leading-relaxed">{description}</p>
    </div>
  </div>
);

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="bg-[#1a1a1a] font-sans text-white">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="flex h-full grow flex-col px-4 md:px-10 lg:px-20 xl:px-40">
          <main className="flex flex-col gap-20 md:gap-24 lg:gap-32 py-16 md:py-24 relative z-10">
            {/* Hero Section */}
            <section className="px-4">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-10 lg:flex-row-reverse items-center">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-[3rem] lg:w-full relative overflow-hidden" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuC8tHZtJ8pdV4u0hu5Yficns5ZRncmvxtHsijWpwbFLX25Jkle5MkIgNZ0R-BnUzbzXkTFua9sXO_rMc5SLeahn8XGdXJodUZNDcclYr9bOAyOJrsXBAN3zGvlJ9uNHuwkmVB6J1jxe8nSoJorpcXuV3BjpJxpuESWdJxC64xQoedDIMbC7wbnR5WKmhHlFfpFJVZjsfyYwVZa8w1KACWSa6Lbznx4N57hmRBZxq1f8skTioFNb53u0xoZZ6WRLOlxru2ys3Xfn-4E")` }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f20d80]/30 via-transparent to-[#f20d80]/30 mix-blend-overlay"></div>
                  </div>
                  <div className="flex flex-col gap-8 lg:justify-center">
                    <div className="flex flex-col gap-4 text-left">
                      <h1 className="text-white text-[clamp(3rem,10vw,8rem)] font-extrabold leading-tight tracking-[-0.033em]">
                        Unlock Your Heart. <span className="glitch-text" data-text="AI">AI</span> Power.
                      </h1>
                      <p className="text-[#6a6a6a] text-lg font-normal leading-relaxed max-w-[500px]">
                        CardioPredict provides a comprehensive understanding of your cardiovascular health, empowering you to make informed decisions for a healthier life.
                      </p>
                    </div>
                    <button 
                      onClick={onGetStarted}
                      className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-14 px-8 bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors w-fit">
                      <span className="truncate">Analyze Your Data</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="flex flex-col gap-16 px-4">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <h1 className="text-white text-[clamp(2rem,8vw,6rem)] font-extrabold leading-tight tracking-[-0.033em] max-w-[720px]">
                    Features.
                  </h1>
                  <p className="text-[#6a6a6a] text-lg font-normal leading-relaxed max-w-[720px]">
                    CardioPredict provides a comprehensive understanding of your cardiovascular health, empowering you to make informed decisions for a healthier life.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 p-0">
                <FeatureCard icon={Activity} title="Real-time Monitoring" description="Monitor your heart rate in real-time with our advanced sensors." rotation="rotate-[-2deg]" />
                <FeatureCard icon={Brain} title="AI ECG Analysis" description="Get a detailed analysis of your ECG data with our AI-powered algorithms." rotation="rotate-[3deg]" />
                <FeatureCard icon={BarChartBig} title="Personalized Health" description="Receive personalized recommendations based on your unique health profile." rotation="rotate-[-1deg]" />
                <FeatureCard icon={ShieldCheck} title="Secure Data Storage" description="Your data is safe with us. We use the latest encryption technologies to protect your privacy." rotation="rotate-[2deg]" />
              </div>
            </section>

            {/* How It Works Section */}
            <section className="px-4">
              <h1 className="text-white text-[clamp(2rem,8vw,6rem)] text-center font-extrabold leading-tight tracking-[-0.033em] mb-12">
                How It Works.
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <HowItWorksCard icon={Upload} title="Upload Your Data" description="Securely upload your heart rate and ECG data from compatible devices." step="1" rotation="rotate-[1deg]" />
                <HowItWorksCard icon={Cpu} title="AI Processes Information" description="Our advanced AI algorithms analyze your data for patterns and insights." step="2" rotation="rotate-[-2deg]" />
                <HowItWorksCard icon={BarChartBig} title="Receive Personalized Insights" description="Get clear, actionable recommendations tailored to your unique health profile." step="3" rotation="rotate-[0.5deg]" />
              </div>
            </section>

            {/* Value Proposition Section */}
            <section className="px-4">
              <h1 className="text-white text-[clamp(2rem,8vw,6rem)] text-center font-extrabold leading-tight tracking-[-0.033em] mb-12">
                Value Proposition.
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard icon={Heart} title="Proactive Health Management" description="Stay ahead of potential issues with continuous monitoring." rotation="rotate-[-1deg]" />
                <FeatureCard icon={BarChartBig} title="Data-Driven Decisions" description="Empower yourself with precise data to make informed choices." rotation="rotate-[2deg]" />
                <FeatureCard icon={ShieldCheck} title="Uncompromised Privacy" description="Your health data is protected with the highest security standards." rotation="rotate-[-0.5deg]" />
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="border-t-2 border-solid border-[#4a4a4a] px-4 py-12 mt-20 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-4 text-white">
                <Heart className="text-[#f20d80] w-8 h-8" />
                <h2 className="text-white text-2xl font-extrabold leading-tight tracking-[-0.015em]">CardioPredict</h2>
              </div>
              <div className="flex gap-6">
                <a className="text-[#6a6a6a] hover:text-white transition-colors text-base font-bold" href="#">Terms of Service</a>
                <a className="text-[#6a6a6a] hover:text-white transition-colors text-base font-bold" href="#">Privacy Policy</a>
              </div>
              <div className="flex items-center gap-4">
                <a className="text-[#6a6a6a] hover:text-white transition-colors" href="#"><Twitter className="w-7 h-7" /></a>
                <a className="text-[#6a6a6a] hover:text-white transition-colors" href="#"><Facebook className="w-7 h-7" /></a>
                <a className="text-[#6a6a6a] hover:text-white transition-colors" href="#"><Instagram className="w-7 h-7" /></a>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t-2 border-solid border-[#4a4a4a]">
              <p className="text-center text-[#6a6a6a] text-sm">© 2024 CardioPredict. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;