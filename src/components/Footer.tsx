import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { isDarkTheme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="font-bold text-xl mb-2">R.M</div>
            <p className="text-sm text-muted-foreground">
              Design. Build. Innovate.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {year} All Rights Reserved
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Crafted with care in {isDarkTheme ? "the dark" : "the light"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
