
import { Card, CardContent } from "@/components/ui/card";
import { 
  Stethoscope, 
  Building, 
  Home, 
  Heart,
  Users,
  Activity
} from "lucide-react";

const TargetAudience = () => {
  const audiences = [
    {
      icon: Stethoscope,
      title: "Healthcare Professionals",
      description: "Doctors, nurses, and specialists using real-time IoT data for better patient care",
      stats: "50,000+ Professionals"
    },
    {
      icon: Building,
      title: "Care Facilities",
      description: "Hospitals, clinics, and care homes implementing comprehensive monitoring systems",
      stats: "1,200+ Facilities"
    },
    {
      icon: Home,
      title: "Home Healthcare",
      description: "Remote patient monitoring enabling care from the comfort of home",
      stats: "25,000+ Patients"
    },
    {
      icon: Users,
      title: "Professional Caregivers",
      description: "Family members and professional caregivers staying connected to patient health",
      stats: "15,000+ Caregivers"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Healthcare Professionals Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            JEGHealth serves a diverse community of healthcare professionals, 
            facilities, and caregivers committed to improving patient outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {audiences.map((audience, index) => (
            <Card 
              key={index} 
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="p-4 bg-green-100 rounded-full inline-block">
                    <audience.icon className="w-10 h-10 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {audience.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {audience.description}
                </p>
                <div className="text-green-600 font-semibold">
                  {audience.stats}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-green-600 mr-2" />
              <span className="text-4xl font-bold text-gray-900">99.9%</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Uptime</h4>
            <p className="text-gray-600">Reliable monitoring when you need it most</p>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-green-600 mr-2" />
              <span className="text-4xl font-bold text-gray-900">24/7</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Monitoring</h4>
            <p className="text-gray-600">Continuous patient care and support</p>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-green-600 mr-2" />
              <span className="text-4xl font-bold text-gray-900">90K+</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Users</h4>
            <p className="text-gray-600">Healthcare professionals trust JEGHealth</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
