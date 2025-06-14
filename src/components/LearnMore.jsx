import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  PlayCircle, 
  Calendar, 
  FileText,
  BarChart3,
  Shield,
  Smartphone,
  Users
} from "lucide-react";

const LearnMore = () => {
  const resources = [
    {
      icon: FileText,
      title: "Product Overview",
      description: "Comprehensive guide to JEGHealth's IoT monitoring platform",
      type: "PDF Guide",
      action: "Download PDF",
      items: [
        "Platform Architecture Guide",
        "Device Compatibility Matrix",
        "Implementation Checklist",
        "Security & Compliance Overview",
        "Quick Start Guide"
      ]
    },
    {
      icon: PlayCircle,
      title: "Platform Demo",
      description: "15-minute video showcasing key features and capabilities",
      type: "Video",
      action: "Watch Demo",
      items: [
        "Dashboard Walkthrough Video",
        "Device Setup Tutorial",
        "Patient Monitoring Demo",
        "Analytics Features Overview",
        "Mobile App Demo"
      ]
    },
    {
      icon: BarChart3,
      title: "Case Studies",
      description: "Real-world success stories from healthcare facilities",
      type: "Case Study",
      action: "Read Stories",
      items: [
        "Hospital Network Implementation",
        "Home Care Provider Success",
        "Clinic Efficiency Improvement",
        "Remote Monitoring Results",
        "Cost Reduction Analysis"
      ]
    },
    {
      icon: Calendar,
      title: "Live Demo",
      description: "Schedule a personalized demo with our healthcare experts",
      type: "Live Session",
      action: "Schedule Demo",
      items: [
        "One-on-One Consultation",
        "Custom Use Case Review",
        "Integration Planning Session",
        "ROI Analysis Meeting",
        "Technical Q&A Session"
      ]
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: "IoT Device Integration",
      description: "Connect with 200+ medical IoT devices seamlessly",
      details: [
        "Blood pressure monitors",
        "Glucose meters",
        "Heart rate monitors",
        "Pulse oximeters",
        "Smart scales",
        "Temperature sensors"
      ]
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security for patient data protection",
      details: [
        "HIPAA compliant infrastructure",
        "End-to-end encryption",
        "Role-based access control",
        "Audit trails and logging",
        "SOC 2 Type II certified",
        "Regular security assessments"
      ]
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Advanced analytics for better patient outcomes",
      details: [
        "Real-time data visualization",
        "Trend analysis and alerts",
        "Customizable dashboards",
        "Automated reports",
        "Population health insights",
        "Predictive analytics"
      ]
    },
    {
      icon: Users,
      title: "Multi-User Platform",
      description: "Collaborative care coordination tools",
      details: [
        "Multi-provider access",
        "Patient family portals",
        "Care team coordination",
        "Secure messaging",
        "Shared care plans",
        "Role-based permissions"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Learn More About JEGHealth
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how JEGHealth is transforming healthcare through innovative IoT monitoring solutions. 
            Explore our resources, case studies, and detailed feature information.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Resources & Downloads</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                      <resource.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{resource.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{resource.description}</p>
                    <div className="text-green-600 text-xs font-medium mb-4">{resource.type}</div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Available Resources:</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {resource.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                    {resource.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Platform Features in Detail</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-to-br from-green-50 to-white border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <feature.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
