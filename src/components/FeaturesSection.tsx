import { Brain, Target, BookOpen, TrendingUp, Award, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Brain, title: "AI Resume Parsing", desc: "Extracts skills, roles, and experience from any resume format in seconds." },
  { icon: Target, title: "Skill Gap Analysis", desc: "Maps your abilities against industry standards and pinpoints what's missing." },
  { icon: TrendingUp, title: "Career Roadmap", desc: "Get a personalized timeline from your current level to your dream role." },
  { icon: BookOpen, title: "Course Recommendations", desc: "Curated picks from Udemy, Coursera, YouTube & more, matched to your gaps." },
  { icon: Award, title: "Proficiency Scoring", desc: "From Novice to Pro — see exactly where you stand in every skill category." },
  { icon: Zap, title: "Job & Salary Insights", desc: "Discover matching roles, expected locations, and salary bands for your profile." },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 bg-hero">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          Everything You Need to <span className="text-gradient">Level Up</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          One upload, six powerful insights — your complete career intelligence dashboard.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-6 hover:shadow-glow transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-base mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
