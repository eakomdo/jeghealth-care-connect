
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TargetAudience from "@/components/TargetAudience";
import Security from "@/components/Security";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Support from "@/components/Support";
import LearnMore from "@/components/LearnMore";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <section id="features">
        <Features />
      </section>
      <TargetAudience />
      <section id="security">
        <Security />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="learn-more">
        <LearnMore />
      </section>
      <section id="support">
        <Support />
      </section>
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
