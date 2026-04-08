import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Linkedin, Mail, Phone, FileText, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { parseAndValidateResume, type ResumeValidation } from "@/lib/resumeParser";

const AnalyzeForm = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({ linkedin: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeValidation, setResumeValidation] = useState<ResumeValidation | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address";
    if (!file) errs.file = "Please upload your resume (PDF or DOCX)";
    else if (resumeValidation && !resumeValidation.isValid) errs.file = resumeValidation.error || "Invalid resume";
    if (!consent) errs.consent = "You must agree to the privacy policy";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      navigate("/results/demo");
    }, 2000);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // Size check
    if (f.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, file: "File must be under 10 MB" }));
      setFile(null);
      setResumeValidation(null);
      return;
    }

    // Type check
    if (!["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(f.type)) {
      setErrors(prev => ({ ...prev, file: "Only PDF and DOCX files are accepted" }));
      setFile(null);
      setResumeValidation(null);
      return;
    }

    // Set file and start parsing
    setFile(f);
    setErrors(prev => ({ ...prev, file: "" }));
    setParsing(true);
    setResumeValidation(null);

    const result = await parseAndValidateResume(f);
    setResumeValidation(result);
    setParsing(false);

    if (!result.isValid) {
      setErrors(prev => ({ ...prev, file: result.error || "This doesn't appear to be a valid resume." }));
    }
  };

  return (
    <section id="analyze" className="py-20 relative">
      <div className="absolute inset-0 bg-hero" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Start Your <span className="text-gradient">Free Analysis</span>
            </h2>
            <p className="text-muted-foreground">
              Upload your resume and we'll map your skills in under 60 seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5 shadow-card">
            {/* LinkedIn */}
            <div className="space-y-1.5">
              <Label htmlFor="linkedin" className="flex items-center gap-2 text-sm">
                <Linkedin className="w-4 h-4 text-primary" /> LinkedIn Profile
                <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/your-profile"
                value={form.linkedin}
                onChange={e => setForm(p => ({ ...p, linkedin: e.target.value }))}
                className="bg-muted/50 border-border/50"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary" /> Email Address
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="bg-muted/50 border-border/50"
              />
              {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary" /> Mobile Number
                <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                className="bg-muted/50 border-border/50"
              />
            </div>

            {/* Resume Upload */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-primary" /> Resume Upload
                <span className="text-destructive">*</span>
              </Label>
              <div
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors bg-muted/20 ${
                  resumeValidation?.isValid
                    ? "border-green-500/50 bg-green-500/5"
                    : errors.file
                    ? "border-destructive/50 bg-destructive/5"
                    : "border-border/50 hover:border-primary/50"
                }`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFile}
                  className="hidden"
                />
                {parsing ? (
                  <>
                    <Loader2 className="w-8 h-8 mx-auto mb-2 text-primary animate-spin" />
                    <p className="text-sm text-primary font-medium">Scanning your document…</p>
                    <p className="text-xs text-muted-foreground mt-1">Checking for resume content</p>
                  </>
                ) : resumeValidation?.isValid && file ? (
                  <>
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <p className="text-sm text-primary font-medium">{file.name}</p>
                    <p className="text-xs text-green-400 mt-1">
                      ✓ Resume verified — found {resumeValidation.sectionsFound.join(", ")}
                    </p>
                  </>
                ) : file && errors.file ? (
                  <>
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-destructive" />
                    <p className="text-sm text-destructive font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Click to upload a different file</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload PDF or DOCX</p>
                    <p className="text-xs text-muted-foreground mt-1">Max 10 MB · We'll verify it's a real resume</p>
                  </>
                )}
              </div>
              {errors.file && <p className="text-destructive text-xs">{errors.file}</p>}
            </div>

            {/* Consent */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={v => setConsent(!!v)}
                className="mt-0.5"
              />
              <Label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                I agree to the <a href="#" className="text-primary underline">Privacy Policy</a>. 
                We never share your resume — it's used for analysis only and deleted after 30 days.
              </Label>
            </div>
            {errors.consent && <p className="text-destructive text-xs ml-6">{errors.consent}</p>}

            <Button variant="hero" size="lg" className="w-full text-base" disabled={loading || parsing}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing your skills…
                </>
              ) : (
                <>Analyze My Resume — It's Free</>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              🔒 256-bit encrypted · GDPR compliant · Data deleted after 30 days
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyzeForm;
