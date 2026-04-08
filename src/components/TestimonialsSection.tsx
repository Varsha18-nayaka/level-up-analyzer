import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Priya S.", role: "CS Student, UC Berkeley", text: "SkillLens showed me I was missing key cloud skills. After following the roadmap for 3 months, I landed an internship at a top FAANG company!", rating: 5 },
  { name: "Marcus T.", role: "Bootcamp Graduate", text: "The course recommendations were spot on. I went from Novice to Competent in data structures in just 6 weeks.", rating: 5 },
  { name: "Aisha K.", role: "Career Switcher", text: "I had no idea what roles matched my skill set. SkillLens mapped me to UX Engineering — a role I didn't even know existed. Now I love my job!", rating: 4 },
];

const TestimonialsSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          Loved by <span className="text-gradient">Students</span>
        </h2>
        <p className="text-muted-foreground">See what students and job seekers are saying.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6 space-y-3"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className={`w-4 h-4 ${j < t.rating ? "text-accent fill-accent" : "text-muted-foreground"}`} />
              ))}
            </div>
            <p className="text-sm leading-relaxed">"{t.text}"</p>
            <div>
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
