
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Lock, 
  FileText, 
  Eye,
  CheckCircle,
  Server
} from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Full compliance with healthcare privacy regulations and standards"
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Military-grade encryption protects all patient data in transit and at rest"
    },
    {
      icon: FileText,
      title: "Audit Trails",
      description: "Comprehensive logging and tracking of all system access and changes"
    },
    {
      icon: Eye,
      title: "Role-Based Access",
      description: "Granular permissions ensure only authorized personnel access patient data"
    },
    {
      icon: CheckCircle,
      title: "Data Validation",
      description: "Real-time data integrity checks and validation protocols"
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Cloud infrastructure with 99.9% uptime and disaster recovery"
    }
  ];

  const certifications = [
    "HIPAA Compliant",
    "SOC 2 Type II",
    "ISO 27001",
    "FDA Guidelines"
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Enterprise-Grade Security & Compliance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your patients' privacy and data security are our top priority. 
            JEGHealth meets the highest standards for healthcare data protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <feature.icon className="w-8 h-8 text-green-600" />
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

        {/* Certifications */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Certifications & Compliance
            </h3>
            <p className="text-gray-600">
              JEGHealth maintains industry-leading certifications and compliance standards
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
