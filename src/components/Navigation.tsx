
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItemProps = {
  title: string;
  href: string;
  onClick?: () => void;
  current: string;
  setCurrent: (section: string) => void;
};

const NavItem = ({ title, href, onClick, current, setCurrent }: NavItemProps) => {
  const handleClick = () => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setCurrent(href.substring(1));
      if (onClick) onClick();
    }
  };

  return (
    <li>
      <button 
        onClick={handleClick}
        className={cn(
          "px-3 py-2 transition-all relative hover:text-mysticJade",
          current === href.substring(1) ? "text-mysticJade" : ""
        )}
      >
        {title}
        {current === href.substring(1) && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mysticJade" />
        )}
      </button>
    </li>
  );
};

const Navigation = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-16">
        <div className="font-bold text-xl">
          <a href="#home" onClick={() => setCurrentSection("home")}>R.M</a>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <NavItem title="About" href="#about" current={currentSection} setCurrent={setCurrentSection} />
            <NavItem title="Projects" href="#projects" current={currentSection} setCurrent={setCurrentSection} />
            <NavItem title="Blog" href="#blog" current={currentSection} setCurrent={setCurrentSection} />
            <NavItem title="Contact" href="#contact" current={currentSection} setCurrent={setCurrentSection} />
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-muted/80 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-muted/80 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-background z-30 md:hidden transition-transform transform pt-16",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="container mx-auto px-4 py-8">
          <ul className="flex flex-col space-y-6 text-xl">
            <NavItem 
              title="About" 
              href="#about" 
              onClick={() => setIsMenuOpen(false)} 
              current={currentSection} 
              setCurrent={setCurrentSection} 
            />
            <NavItem 
              title="Projects" 
              href="#projects" 
              onClick={() => setIsMenuOpen(false)} 
              current={currentSection} 
              setCurrent={setCurrentSection} 
            />
            <NavItem 
              title="Blog" 
              href="#blog" 
              onClick={() => setIsMenuOpen(false)} 
              current={currentSection} 
              setCurrent={setCurrentSection} 
            />
            <NavItem 
              title="Contact" 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)} 
              current={currentSection} 
              setCurrent={setCurrentSection} 
            />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
