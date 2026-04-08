import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Share2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quizQuestions = [
  {
    domain: "Programming",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
  },
  {
    domain: "SQL",
    question: "Which SQL keyword is used to combine rows from two tables?",
    options: ["MERGE", "COMBINE", "JOIN", "UNION"],
    correct: 2,
  },
  {
    domain: "Cloud",
    question: "What does S3 stand for in AWS?",
    options: ["Simple Storage Service", "Secure Server System", "Serverless Service Stack", "Standard Storage System"],
    correct: 0,
  },
  {
    domain: "System Design",
    question: "Which pattern distributes incoming requests across multiple servers?",
    options: ["Caching", "Sharding", "Load Balancing", "Replication"],
    correct: 2,
  },
  {
    domain: "Soft Skills",
    question: "What is the primary goal of a retrospective meeting?",
    options: ["Assign new tasks", "Demo features", "Reflect and improve", "Estimate stories"],
    correct: 2,
  },
];

const QuizPage = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 >= quizQuestions.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
    }
  };

  const score = answers.reduce((acc, a, i) => acc + (a === quizQuestions[i].correct ? 1 : 0), 0);

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-cta-gradient mx-auto flex items-center justify-center shadow-glow">
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="font-heading text-2xl font-bold">Quiz Complete!</h2>
            <p className="text-3xl font-heading font-bold text-gradient">{score}/{quizQuestions.length}</p>
            <p className="text-muted-foreground text-sm">
              {score >= 4 ? "Excellent! Your fundamentals are strong." : score >= 2 ? "Good start! A few areas need attention." : "Keep learning — your roadmap will get you there!"}
            </p>

            {/* Rating */}
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm font-medium mb-2">How was your experience?</p>
              <div className="flex justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    key={s}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(s)}
                    className="p-1"
                  >
                    <Star className={`w-7 h-7 transition-colors ${s <= (hoverRating || rating) ? "text-accent fill-accent" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground">
                  Thanks for your feedback! 🎉
                </motion.p>
              )}
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <Button variant="hero" size="lg">
                <Share2 className="w-4 h-4 mr-1" /> Share Results
              </Button>
              <Button variant="heroOutline" size="lg" onClick={() => window.location.href = "/results/demo"}>
                View Full Report
              </Button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  const q = quizQuestions[current];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-heading text-2xl font-bold">Knowledge Quiz</h1>
          <span className="text-sm text-muted-foreground">{current + 1} / {quizQuestions.length}</span>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-muted rounded-full mb-8">
          <div className="h-full bg-cta-gradient rounded-full transition-all" style={{ width: `${((current) / quizQuestions.length) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="glass rounded-2xl p-6 space-y-5"
          >
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">{q.domain}</Badge>
            <h2 className="font-heading text-lg font-semibold">{q.question}</h2>
            <div className="space-y-2.5">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    selected === i
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border/50 bg-muted/20 text-muted-foreground hover:border-border hover:bg-muted/40"
                  }`}
                >
                  <span className="font-medium mr-2 text-primary">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              ))}
            </div>
            <Button variant="hero" className="w-full" disabled={selected === null} onClick={handleNext}>
              {current + 1 === quizQuestions.length ? "Finish Quiz" : "Next Question"}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default QuizPage;
