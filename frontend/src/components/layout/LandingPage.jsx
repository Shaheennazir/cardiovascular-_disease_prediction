import React from 'react';
import { Heart, Activity, FileText, Zap, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-1 text-text-primary mb-6 animate-fade-in-up">
            Predict Your Cardiovascular Health with AI
          </h1>
          <p className="body-large text-text-secondary mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Advanced machine learning algorithms analyze your health data to predict cardiovascular disease risk with unprecedented accuracy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-400">
            <Button size="lg" onClick={onGetStarted}>
              Get Started Free
            </Button>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 my-16 animate-fade-in-up animation-delay-600">
        <h2 className="heading-2 text-center mb-12 text-text-primary">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-surface border border-border interactive-lift">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-primary-500" />
            </div>
            <h3 className="heading-4 mb-2 text-text-primary">ECG Analysis</h3>
            <p className="body-medium text-text-secondary">
              Upload your ECG data for instant analysis and abnormality detection using our advanced AI models.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-surface border border-border interactive-lift">
            <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-secondary-500" />
            </div>
            <h3 className="heading-4 mb-2 text-text-primary">Tabular Data Prediction</h3>
            <p className="body-medium text-text-secondary">
              Enter your health metrics to get a comprehensive cardiovascular risk assessment.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-surface border border-border interactive-lift">
            <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-accent-500" />
            </div>
            <h3 className="heading-4 mb-2 text-text-primary">Instant Results</h3>
            <p className="body-medium text-text-secondary">
              Get your analysis results in seconds with detailed explanations and confidence scores.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="heading-2 text-center mb-12 text-text-primary">How It Works</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 transform -translate-x-1/2"></div>
            
            {/* Step 1 */}
            <div className="mb-12 flex flex-col md:flex-row items-center animate-fade-in-up">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 text-right">
                <h3 className="heading-4 text-text-primary">Upload Your Data</h3>
                <p className="body-medium text-text-secondary">
                  Securely upload your ECG files or enter your health metrics through our simple interface.
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white font-bold z-10">
                1
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8 md:text-left">
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <div className="flex items-center space-x-2 body-small text-text-secondary">
                    <Heart className="h-4 w-4" />
                    <span>ECG_Reading_2023.pdf</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="mb-12 flex flex-col md:flex-row items-center animate-fade-in-up animation-delay-200">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 text-right hidden md:block">
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <div className="h-32 bg-primary-100 rounded flex items-center justify-center">
                    <Activity className="h-12 w-12 text-primary-500" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white font-bold z-10">
                2
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8 md:text-left">
                <h3 className="heading-4 text-text-primary">AI Analysis</h3>
                <p className="body-medium text-text-secondary">
                  Our advanced machine learning models process your data to detect patterns and anomalies.
                </p>
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pr-8 text-right md:hidden">
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <div className="h-32 bg-primary-100 rounded flex items-center justify-center">
                    <Activity className="h-12 w-12 text-primary-500" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="mb-12 flex flex-col md:flex-row items-center animate-fade-in-up animation-delay-400">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 text-right">
                <h3 className="heading-4 text-text-primary">Receive Results</h3>
                <p className="body-medium text-text-secondary">
                  Get detailed results with risk assessment, explanations, and personalized recommendations.
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white font-bold z-10">
                3
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8 md:text-left">
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-text-primary">Risk Level</p>
                      <p className="body-small text-text-secondary">Low</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-success-500"></div>
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
        <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 md:p-12 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <h2 className="heading-2 mb-4">Ready to Take Control of Your Heart Health?</h2>
          <p className="body-large mb-8 opacity-90">
            Join thousands of users who trust our platform for accurate cardiovascular disease prediction.
          </p>
          <Button size="lg" variant="secondary" onClick={onGetStarted}>
            Start Your Analysis Today
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;