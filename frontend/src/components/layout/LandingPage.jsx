import React from 'react';
import { Heart, Activity, FileText, Zap } from 'lucide-react';
import { TactileButton } from '../ui/tactile-button';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-zen-dark-blue dark:text-zen-light-blue mb-6 animate-fade-in-up">
            Predict Your Cardiovascular Health with AI
          </h1>
          <p className="text-xl text-zen-dark-blue/80 dark:text-zen-light-blue/80 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Advanced machine learning algorithms analyze your health data to predict cardiovascular disease risk with unprecedented accuracy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-400">
            <TactileButton variant="primary" size="lg" onClick={onGetStarted}>
              Get Started Free
            </TactileButton>
            <TactileButton variant="outline" size="lg">
              View Demo
            </TactileButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 my-16 animate-fade-in-up animation-delay-600">
        <h2 className="text-3xl font-bold text-center mb-12 text-zen-dark-blue dark:text-zen-light-blue">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl glassmorphic hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-zen-dark-blue dark:text-zen-light-blue">ECG Analysis</h3>
            <p className="text-zen-dark-blue/70 dark:text-zen-light-blue/70">
              Upload your ECG data for instant analysis and abnormality detection using our advanced AI models.
            </p>
          </div>
          
          <div className="p-6 rounded-xl glassmorphic hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-zen-dark-blue dark:text-zen-light-blue">Tabular Data Prediction</h3>
            <p className="text-zen-dark-blue/70 dark:text-zen-light-blue/70">
              Enter your health metrics to get a comprehensive cardiovascular risk assessment.
            </p>
          </div>
          
          <div className="p-6 rounded-xl glassmorphic hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-zen-dark-blue dark:text-zen-light-blue">Instant Results</h3>
            <p className="text-zen-dark-blue/70 dark:text-zen-light-blue/70">
              Get your analysis results in seconds with detailed explanations and confidence scores.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-zen-dark-blue dark:text-zen-light-blue">How It Works</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform -translate-x-1/2"></div>
            
            {/* Step 1 */}
            <div className="mb-12 flex flex-col md:flex-row items-center animate-fade-in-up">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 text-right">
                <h3 className="text-xl font-semibold text-zen-dark-blue dark:text-zen-light-blue">Upload Your Data</h3>
                <p className="text-zen-dark-blue/70 dark:text-zen-light-blue/70">
                  Securely upload your ECG files or enter your health metrics through our simple interface.
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-tactile-text-light font-bold z-10">
                1
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8 md:text-left">
                <div className="p-4 rounded-lg glassmorphic">
                  <div className="flex items-center space-x-2 text-sm text-zen-dark-blue/70 dark:text-zen-light-blue/70">
                    <Heart className="h-4 w-4" />
                    <span>ECG_Reading_2023.pdf</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="mb-12 flex flex-col md:flex-row items-center animate-fade-in-up animation-delay-200">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 text-right hidden md:block">
                <div className="p-4 rounded-lg glassmorphic">
                  <div className="h-32 bg-primary/10 rounded flex items-center justify-center">
                    <Activity className="h-12 w-12 text-primary" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-tactile-text-light font-bold z-10">
                2
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8 md:text-left">
                <h3 className="text-xl font-semibold text-zen-dark-blue dark:text-zen-light-blue">AI Analysis</h3>
                <p className="text-zen-dark-blue/70 dark:text-zen-light-blue/70">
                  Our advanced machine learning models process your data to detect patterns and anomalies.
                </p>
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pr-8 text-right md:hidden">
                <div className="p-4 rounded-lg glassmorphic">
                  <div className="h-32 bg-primary/10 rounded flex items-center justify-center">
                    <Activity className="h-12 w-12 text-primary" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="mb-12 flex flex-col md:flex-row items-center animate-fade-in-up animation-delay-400">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 text-right">
                <h3 className="text-xl font-semibold text-zen-dark-blue dark:text-zen-light-blue">Receive Results</h3>
                <p className="text-zen-dark-blue/70 dark:text-zen-light-blue/70">
                  Get detailed results with risk assessment, explanations, and personalized recommendations.
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-tactile-text-light font-bold z-10">
                3
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8 md:text-left">
                <div className="p-4 rounded-lg glassmorphic">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-zen-dark-blue dark:text-zen-light-blue">Risk Level</p>
                      <p className="text-sm text-zen-dark-blue/70 dark:text-zen-light-blue/70">Low</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-zen-green/10 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-zen-green"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 md:p-12 glassmorphic">
          <h2 className="text-3xl font-bold mb-4 text-zen-dark-blue dark:text-zen-light-blue">Ready to Take Control of Your Heart Health?</h2>
          <p className="text-lg text-zen-dark-blue/80 dark:text-zen-light-blue/80 mb-8">
            Join thousands of users who trust our platform for accurate cardiovascular disease prediction.
          </p>
          <TactileButton variant="primary" size="lg" onClick={onGetStarted}>
            Start Your Analysis Today
          </TactileButton>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;