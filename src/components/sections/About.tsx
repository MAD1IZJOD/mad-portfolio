
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const skills = [
  { name: "Design", level: 90 },
  { name: "Computer Architecture", level: 85 },
  { name: "AI & ML", level: 80 },
  { name: "Robotics", level: 75 },
  { name: "Psychology", level: 70 },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector("#about");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="about" className="min-h-screen py-24 section-padding">
      <div className="container mx-auto">
        <h2 className="section-heading">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={cn("space-y-6", isVisible ? "fade-in" : "opacity-0")}>
            <p className="text-lg">
              I'm a multidisciplinary creator passionate about the intersection of technology and design. With a background spanning various technical disciplines, I bring a unique perspective to solving complex problems.
            </p>
            
            <p className="text-lg">
              My work focuses on creating elegant, user-centered experiences that leverage the latest technological advancements. I believe in thoughtful design that considers both aesthetics and functionality.
            </p>
            
            <p className="text-lg">
              When I'm not coding or designing, you might find me exploring the latest research in cognitive psychology, tinkering with robotics projects, or diving into the newest developments in artificial intelligence.
            </p>
          </div>
          
          <div className={cn("space-y-8", isVisible ? "fade-in" : "opacity-0")} style={{ animationDelay: "0.2s" }}>
            <h3 className="text-xl font-semibold mb-4">Skills & Expertise</h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-mysticJade to-paleWhite"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : "0%", 
                        transition: `width 1s ease-out ${0.3 + index * 0.1}s` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
