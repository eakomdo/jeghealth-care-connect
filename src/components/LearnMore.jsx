
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
      action: "Download PDF"
    },
    {
      icon: PlayCircle,
      title: "Platform Demo",
      description: "15-minute video showcasing key features and capabilities",
      type: "Video",
      action: "Watch Demo"
    },
    {
      icon: BarChart3,
      title: "Case Studies",
      description: "Real-world success stories from healthcare facilities",
      type: "Case Study",
      action: "Read Stories"
    },
    {
      icon: Calendar,
      title: "Live Demo",
      description: "Schedule a personalized demo with our healthcare experts",
      type: "Live Session",
      action: "Schedule Demo"
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
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                    <resource.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{resource.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{resource.description}</p>
                  <div className="text-green-600 text-xs font-medium mb-4">{resource.type}</div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                    {resource.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
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

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Transform Your Healthcare Practice?</h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who trust JEGHealth for their IoT monitoring needs. 
            Start your journey towards better patient outcomes today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-medium"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
