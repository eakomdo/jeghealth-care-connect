
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  BookOpen, 
  Video,
  Clock,
  Users,
  FileText
} from "lucide-react";

const Support = () => {
  const supportOptions = [
    {
      icon: Phone,
      title: "24/7 Phone Support",
      description: "Urgent technical support available around the clock",
      contact: "+1 (555) 123-4567",
      availability: "Available 24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Detailed technical assistance and account help",
      contact: "support@jeghealth.com",
      availability: "Response within 4 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Real-time assistance from our support team",
      contact: "Chat widget available",
      availability: "Monday - Friday, 8 AM - 8 PM EST"
    },
    {
      icon: Video,
      title: "Video Training",
      description: "One-on-one training sessions for your team",
      contact: "Schedule via support portal",
      availability: "By appointment"
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides and API documentation"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features"
    },
    {
      icon: FileText,
      title: "Knowledge Base",
      description: "Frequently asked questions and troubleshooting"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other healthcare professionals"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Support & Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the help you need, when you need it. Our dedicated support team and 
            comprehensive resources ensure you get the most out of JEGHealth.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Contact Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                    <option.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{option.title}</h4>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{option.description}</p>
                  <div className="text-green-600 font-medium text-sm mb-2">{option.contact}</div>
                  <div className="text-gray-500 text-xs flex items-center justify-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {option.availability}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Self-Service Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-blue-100 rounded-full inline-block mb-4">
                    <resource.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{resource.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{resource.description}</p>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    Access Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Training & Onboarding</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get your team up and running quickly with our comprehensive training programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Team Training</h4>
              <p className="text-gray-600 text-sm mb-4">Custom training sessions for your healthcare team</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Schedule Training
              </Button>
            </div>
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Implementation Guide</h4>
              <p className="text-gray-600 text-sm mb-4">Step-by-step implementation for your facility</p>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Download Guide
              </Button>
            </div>
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                <Video className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Video Library</h4>
              <p className="text-gray-600 text-sm mb-4">Access our complete video training library</p>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Watch Videos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
