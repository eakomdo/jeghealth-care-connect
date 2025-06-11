
import { Card, CardContent } from "@/components/ui/card";
import { 
  Smartphone, 
  Monitor, 
  Lock, 
  Clock, 
  BarChart3, 
  Bell,
  FileText,
  Stethoscope,
  Wifi
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile IoT Integration",
      description: "Seamlessly connect with mobile devices to capture real-time health readings from various IoT sensors and medical devices."
    },
    {
      icon: Monitor,
      title: "Professional Dashboard",
      description: "Comprehensive web-based dashboard designed for healthcare professionals to monitor multiple patients efficiently."
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level encryption, HIPAA compliance, and secure authentication to protect sensitive patient data."
    },
    {
      icon: Clock,
      title: "Real-time Monitoring",
      description: "Instant notifications and live data streams ensure you never miss critical health events or emergencies."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Powerful analytics tools to identify trends, generate reports, and make data-driven healthcare decisions."
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Customizable alert system that notifies caregivers when readings fall outside normal parameters."
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "Generate comprehensive reports for patient records, insurance claims, and medical documentation."
    },
    {
      icon: Stethoscope,
      title: "Clinical Integration",
      description: "Designed to integrate with existing electronic health records (EHR) and clinical workflows."
    },
    {
      icon: Wifi,
      title: "Cloud Connectivity",
      description: "Secure cloud infrastructure ensures data accessibility from anywhere while maintaining compliance."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional-Grade Health Monitoring
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge IoT technology with healthcare expertise 
            to deliver the tools professionals need for effective patient care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-teal-100 rounded-lg">
                      <feature.icon className="w-8 h-8 text-teal-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
