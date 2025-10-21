import React from 'react';
import { Heart, Activity, FileText, Zap } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
            Predict Your Cardiovascular Health with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Advanced machine learning algorithms analyze your health data to predict cardiovascular disease risk with unprecedented accuracy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-400">
            <button
              onClick={onGetStarted}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </button>
            <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 border border-border">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-background rounded-2xl shadow-lg my-16 animate-fade-in-up animation-delay-600">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">ECG Analysis</h3>
            <p className="text-muted-foreground">
              Upload your ECG data for instant analysis and abnormality detection using our advanced AI models.
            </p>
          </div>
          
          <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Tabular Data Prediction</h3>
            <p className="text-muted-foreground">
              Enter your health metrics to get a comprehensive cardiovascular risk assessment.
            </p>
          </div>
          
          <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Instant Results</h3>
            <p className="text-muted-foreground">
              Get your analysis results in seconds with detailed explanations and confidence scores.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How It Works</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform -translate-x-1/2"></div>
            
            {/* Step 1 */}
            <div className="mb-12 flex flex-col md:flex-row items-center animate-fade-in-up">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 text-right">
                <h3 className="text-xl font-semibold text-foreground">Upload Your Data</h3>
                <p className="text-muted-foreground">
                  Securely upload your ECG files or enter your health metrics through our simple interface.
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold z-10">
                1
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8 md:text-left">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span>ECG_Reading_2023.pdf</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="mb-12 flex flex-col md:flex-row items-center animate-fade-in-up animation-delay-200">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 text-right hidden md:block">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="h-32 bg-primary/10 rounded flex items-center justify-center">
                    <Activity className="h-12 w-12 text-primary" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold z-10">
                2
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8 md:text-left">
                <h3 className="text-xl font-semibold text-foreground">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our advanced machine learning models process your data to detect patterns and anomalies.
                </p>
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pr-8 text-right md:hidden">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="h-32 bg-primary/10 rounded flex items-center justify-center">
                    <Activity className="h-12 w-12 text-primary" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="mb-12 flex flex-col md:flex-row items-center animate-fade-in-up animation-delay-400">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 text-right">
                <h3 className="text-xl font-semibold text-foreground">Receive Results</h3>
                <p className="text-muted-foreground">
                  Get detailed results with risk assessment, explanations, and personalized recommendations.
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold z-10">
                3
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8 md:text-left">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Risk Level</p>
                      <p className="text-sm text-muted-foreground">Low</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-green-500"></div>
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
        <div className="max-w-3xl mx-auto text-center bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Take Control of Your Heart Health?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who trust our platform for accurate cardiovascular disease prediction.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Your Analysis Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;