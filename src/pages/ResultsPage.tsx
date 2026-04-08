import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Clock, MapPin, DollarSign, ArrowRight, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer
} from "recharts";

const skillScores = [
  { skill: "JavaScript", score: 78, level: "Pro" },
  { skill: "Python", score: 62, level: "Competent" },
  { skill: "React", score: 71, level: "Competent" },
  { skill: "SQL", score: 45, level: "Developing" },
  { skill: "Cloud/AWS", score: 22, level: "Novice" },
  { skill: "System Design", score: 30, level: "Novice" },
  { skill: "Communication", score: 85, level: "Pro" },
  { skill: "Git/CI-CD", score: 68, level: "Competent" },
];

const radarData = skillScores.map(s => ({ subject: s.skill, score: s.score, fullMark: 100 }));

const roadmapMilestones = [
  { period: "Now", title: "Current Level", desc: "Developing Full-Stack Developer", done: true },
  { period: "1–3 months", title: "Fill Core Gaps", desc: "Complete SQL & Cloud fundamentals courses. Build 2 AWS projects.", done: false },
  { period: "3–6 months", title: "Build Portfolio", desc: "System design study. Contribute to open-source. Mock interviews.", done: false },
  { period: "6–12 months", title: "Target: Competent", desc: "Apply for mid-level roles. Get AWS certification.", done: false },
  { period: "12–18 months", title: "Reach Pro Level", desc: "Lead projects. Mentor juniors. Target Senior SWE roles.", done: false },
];

const recommendedRoles = [
  { title: "Junior Full-Stack Developer", location: "San Francisco, CA", salary: "$85K – $115K" },
  { title: "Frontend Engineer", location: "Remote / NYC", salary: "$90K – $130K" },
  { title: "Software Developer II", location: "Austin, TX", salary: "$95K – $125K" },
];

const courses = [
  { title: "The Complete SQL Bootcamp", provider: "Udemy", duration: "9h", price: "$14.99", rating: 4.7, link: "https://www.udemy.com/course/the-complete-sql-bootcamp/" },
  { title: "AWS Cloud Practitioner Essentials", provider: "Coursera", duration: "6h", price: "Free", rating: 4.8, link: "https://www.coursera.org/learn/aws-cloud-practitioner-essentials" },
  { title: "System Design for Beginners", provider: "YouTube", duration: "2h", price: "Free", rating: 4.6, link: "https://www.youtube.com/watch?v=MbjObHmDbZo" },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Pro": return "bg-accent/20 text-accent border-accent/30";
    case "Competent": return "bg-primary/20 text-primary border-primary/30";
    case "Developing": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default: return "bg-destructive/20 text-destructive border-destructive/30";
  }
};

const ResultsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Trial Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-primary/10 border border-primary/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm">Your free trial ends in <strong className="text-primary">4 days</strong>. Upgrade to keep unlimited access.</span>
          </div>
          <Button variant="hero" size="sm">Upgrade to Pro</Button>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            Your Skill Analysis <span className="text-gradient">Report</span>
          </h1>
          <p className="text-muted-foreground">Based on your resume and profile · Generated April 8, 2026</p>
        </motion.div>

        {/* Overall Score */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="w-24 h-24 rounded-full bg-cta-gradient flex items-center justify-center shadow-glow shrink-0">
            <span className="font-heading text-3xl font-bold text-primary-foreground">58</span>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="font-heading text-xl font-bold mb-1">Overall: Competent</h2>
            <p className="text-sm text-muted-foreground">
              You have strong foundations in JavaScript and communication. Focus on SQL, Cloud/AWS, and System Design to reach Pro level.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className={getLevelColor("Novice")}>2 Novice</Badge>
              <Badge variant="outline" className={getLevelColor("Developing")}>1 Developing</Badge>
              <Badge variant="outline" className={getLevelColor("Competent")}>3 Competent</Badge>
              <Badge variant="outline" className={getLevelColor("Pro")}>2 Pro</Badge>
            </div>
          </div>
        </motion.div>

        {/* Radar Chart + Skill Table */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-heading font-semibold mb-4">Skill Radar</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(207, 30%, 18%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(200, 20%, 55%)", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke="hsl(186, 55%, 46%)" fill="hsl(186, 55%, 46%)" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-heading font-semibold mb-4">Skill Breakdown</h3>
            <div className="space-y-3">
              {skillScores.map(s => (
                <div key={s.skill}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{s.skill}</span>
                    <Badge variant="outline" className={`text-xs ${getLevelColor(s.level)}`}>{s.level} · {s.score}</Badge>
                  </div>
                  <Progress value={s.score} className="h-2 bg-muted" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Roadmap */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <h3 className="font-heading text-xl font-semibold mb-6">Your Personalized Roadmap</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {roadmapMilestones.map((m, i) => (
                <div key={i} className="relative pl-10">
                  <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
                    m.done ? "bg-primary border-primary" : "bg-muted border-border"
                  }`} />
                  <span className="text-xs font-heading font-bold text-primary tracking-wider">{m.period}</span>
                  <h4 className="font-semibold text-sm mt-0.5">{m.title}</h4>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Job Roles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <h3 className="font-heading text-xl font-semibold mb-4">Recommended Roles</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {recommendedRoles.map((r, i) => (
              <div key={i} className="bg-muted/30 rounded-xl p-4 space-y-2">
                <h4 className="font-semibold text-sm">{r.title}</h4>
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="w-3 h-3" /> {r.location}</p>
                <p className="flex items-center gap-1 text-xs text-primary font-medium"><DollarSign className="w-3 h-3" /> {r.salary}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Course Recommendations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <h3 className="font-heading text-xl font-semibold mb-4">Recommended Courses</h3>
          <div className="space-y-3">
            {courses.map((c, i) => (
              <a key={i} href={c.link} target="_blank" rel="noopener noreferrer"
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-colors group"
              >
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{c.title}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">{c.provider}</Badge>
                    <span>{c.duration}</span>
                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-accent fill-accent" /> {c.rating}</span>
                    <span className="font-medium text-primary">{c.price}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/quiz/demo">
            <Button variant="hero" size="lg">Take Knowledge Quiz <ArrowRight className="w-4 h-4 ml-1" /></Button>
          </Link>
          <Button variant="heroOutline" size="lg">Download PDF Report</Button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default ResultsPage;
