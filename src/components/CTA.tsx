
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
      <div className="container mx-auto px-6">
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Patient Care?
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of healthcare professionals who trust JEGHealth 
            for secure, real-time IoT health monitoring.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <Link to="/login">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Users className="w-5 h-5 mr-2" />
              Access Your Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
          <div className="opacity-90">
            <div className="text-3xl font-bold mb-2">99.9%</div>
            <div className="text-lg">Uptime Guarantee</div>
          </div>
          <div className="opacity-90">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-lg">Expert Support</div>
          </div>
          <div className="opacity-90">
            <div className="text-3xl font-bold mb-2">HIPAA</div>
            <div className="text-lg">Compliant</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
