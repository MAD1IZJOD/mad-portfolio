
import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !textRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      textRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    };
    
    const container = containerRef.current;
    
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);
  
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden section-padding"
      ref={containerRef}
    >
      <div 
        className="text-center max-w-4xl mx-auto z-10 transition-transform duration-75 ease-out"
        ref={textRef}
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-mysticJade">Design.</span> Build. <span className="text-paleWhite">Innovate.</span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Exploring the intersection of design, technology, and human experience. Crafting elegant solutions for complex problems.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            onClick={scrollToAbout}
            className="px-6 py-2 bg-mysticJade hover:bg-mysticJade/90 text-white rounded-md transition-all hover:scale-105"
          >
            Explore my work
          </button>
          <a 
            href="#contact" 
            className="px-6 py-2 border border-border hover:border-paleWhite hover:text-paleWhite rounded-md transition-all hover:scale-105"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        whileHover={{ scale: 1.2 }}
      >
        <button 
          onClick={scrollToAbout}
          className="rounded-full p-2 border border-border hover:border-mysticJade transition-all animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} className="text-muted-foreground" />
        </button>
      </motion.div>
      
      {/* Animated gradient backgrounds */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-mysticJade/20 rounded-full filter blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-paleWhite/20 rounded-full filter blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </section>
  );
};

export default Hero;
