
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Clock } from "lucide-react";

const About = () => {
  const milestones = [
    {
      icon: Heart,
      year: "2019",
      title: "Founded",
      description: "JEGHealth was founded with a mission to revolutionize healthcare through IoT technology"
    },
    {
      icon: Users,
      year: "2021",
      title: "First 10,000 Users",
      description: "Reached our first milestone of healthcare professionals using our platform"
    },
    {
      icon: Award,
      year: "2022",
      title: "HIPAA Certification",
      description: "Achieved full HIPAA compliance and SOC 2 Type II certification"
    },
    {
      icon: Clock,
      year: "2024",
      title: "24/7 Monitoring",
      description: "Launched continuous monitoring capabilities serving 90,000+ users worldwide"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About JEGHealth
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to transforming healthcare through innovative IoT solutions, 
            empowering healthcare professionals with real-time patient monitoring capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At JEGHealth, we believe that every patient deserves the highest quality of care, 
              regardless of their location. Our mission is to bridge the gap between patients 
              and healthcare providers through cutting-edge IoT technology.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We provide healthcare professionals with the tools they need to monitor patients 
              remotely, enabling early intervention, reducing hospital readmissions, and 
              improving overall patient outcomes.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Vision</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              To become the global leader in healthcare IoT monitoring solutions, making 
              quality healthcare accessible to everyone, everywhere.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where distance is no barrier to receiving excellent 
              healthcare, where technology seamlessly connects patients with their care 
              teams, and where data-driven insights lead to better health outcomes for all.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Our Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="bg-green-50 border-0 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                    <milestone.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{milestone.year}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{milestone.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-2">Innovation</h4>
                <p className="text-gray-600">Continuously pushing the boundaries of healthcare technology</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-2">Privacy</h4>
                <p className="text-gray-600">Maintaining the highest standards of patient data protection</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-2">Compassion</h4>
                <p className="text-gray-600">Putting patient care and wellbeing at the center of everything we do</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
