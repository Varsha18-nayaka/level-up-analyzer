import { Brain } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-10 bg-hero">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="font-heading font-bold text-sm">SkillLens</span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 SkillLens. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
