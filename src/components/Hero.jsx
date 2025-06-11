
import { Button } from "@/components/ui/button";
import { Shield, Activity, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-teal-200 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-teal-300 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-teal-200 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              JEG<span className="text-teal-600">Health</span>
            </h1>
            <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
          </div>
          
          {/* Main Headline */}
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 leading-tight">
            Professional IoT Health Monitoring
            <br />
            <span className="text-teal-600">For Healthcare Excellence</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Securely monitor and analyze real-time health data from IoT devices. 
            Designed for healthcare professionals and caregivers who demand precision, 
            security, and actionable insights.
          </p>
          
          {/* Key Features Icons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="p-3 bg-teal-100 rounded-full">
                <Activity className="w-6 h-6 text-teal-600" />
              </div>
              <span className="font-medium">Real-time Monitoring</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <span className="font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="font-medium">Multi-Patient Dashboard</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300"
            >
              Get Started
            </Button>
          </div>
          
          {/* Trust Badge */}
          <div className="mt-12 text-sm text-gray-500">
            <p>Trusted by healthcare professionals • Secure • Reliable • Professional</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
