import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="w-7 h-7 text-primary" />
          <span className="font-heading font-bold text-lg text-foreground">SkillLens</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <Link to="/results/demo">
            <Button variant="heroOutline" size="sm">See Demo</Button>
          </Link>
          <a href="#analyze">
            <Button variant="hero" size="sm">Get Started Free</Button>
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-border/50 px-4 pb-4 space-y-3">
          <a href="#features" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#pricing" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Pricing</a>
          <a href="#how-it-works" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>How It Works</a>
          <Button variant="hero" className="w-full" size="sm">Get Started Free</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
