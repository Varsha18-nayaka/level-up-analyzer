import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Free Trial",
    price: "$0",
    period: "for 5 days",
    desc: "Full access to see if SkillLens is right for you.",
    features: ["Unlimited resume analyses", "Skill gap reports", "Basic roadmap", "3 course recommendations", "1 quiz attempt"],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    desc: "Everything you need for continuous career growth.",
    features: ["Everything in Free", "Advanced roadmaps", "Unlimited course picks", "Job & salary insights", "Unlimited quizzes", "Priority support", "Export PDF reports"],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    desc: "For bootcamps, universities & career coaches.",
    features: ["Everything in Pro", "Up to 50 users", "Admin dashboard", "Bulk resume upload", "Analytics & benchmarks", "Custom branding"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-20 bg-hero">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          Simple, <span className="text-gradient">Transparent</span> Pricing
        </h2>
        <p className="text-muted-foreground">Start free. Upgrade when you're ready.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-6 ${
              t.highlighted
                ? "bg-card-gradient border-2 border-primary/40 shadow-glow relative"
                : "glass"
            }`}
          >
            {t.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cta-gradient text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Most Popular
              </div>
            )}
            <h3 className="font-heading font-bold text-lg mb-1">{t.name}</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-heading text-3xl font-bold">{t.price}</span>
              <span className="text-muted-foreground text-sm">{t.period}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-5">{t.desc}</p>
            <ul className="space-y-2.5 mb-6">
              {t.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant={t.highlighted ? "hero" : "heroOutline"} className="w-full">
              {t.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
