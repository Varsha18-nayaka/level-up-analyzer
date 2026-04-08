import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-illustration.jpg";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center bg-hero overflow-hidden pt-16">
    {/* Background glow effects */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-[100px]" />

    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Career Intelligence
        </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Discover Your <span className="text-gradient">Skill Gaps</span>,{" "}
          <br className="hidden md:block" />
          Unlock Your Career
        </h1>

        <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
          Upload your resume, get an instant AI analysis of your strengths and gaps,
          a personalized learning roadmap, and curated course recommendations — all in minutes.
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="#analyze">
            <Button variant="hero" size="lg" className="text-base">
              Analyze My Skills Free
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
          <a href="#how-it-works">
            <Button variant="heroOutline" size="lg" className="text-base">
              See How It Works
            </Button>
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          ✦ Free 5-day trial · No credit card required · Your data stays private
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl animate-pulse-glow" />
          <img
            src={heroImg}
            alt="AI skill analysis visualization with connected nodes and data charts"
            className="relative rounded-2xl shadow-elevated w-full"
            width={1024}
            height={768}
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
