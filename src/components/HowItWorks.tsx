import { Upload, Cpu, Map, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Upload, step: "01", title: "Upload Your Resume", desc: "Drop in a PDF or DOCX and add your email. LinkedIn profile is optional." },
  { icon: Cpu, step: "02", title: "AI Analyzes Your Profile", desc: "Our engine parses skills, experience, and education — then scores each one." },
  { icon: Map, step: "03", title: "Get Your Roadmap", desc: "See a personalized timeline with milestones from your current level to your goal." },
  { icon: GraduationCap, step: "04", title: "Start Learning", desc: "Pick from curated courses on Udemy, Coursera, YouTube and more." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          How It <span className="text-gradient">Works</span>
        </h2>
        <p className="text-muted-foreground">Four simple steps to career clarity.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center space-y-3"
          >
            <div className="w-16 h-16 rounded-full bg-cta-gradient mx-auto flex items-center justify-center shadow-glow">
              <s.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-xs font-heading font-bold text-primary tracking-wider">{s.step}</span>
            <h3 className="font-heading font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
