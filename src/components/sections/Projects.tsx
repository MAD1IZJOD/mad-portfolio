
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "AI-Driven Interface",
    description: "A neural network-based UI that adapts to user behavior and preferences in real-time.",
    technologies: ["React", "TensorFlow.js", "Three.js"],
    imageUrl: "https://via.placeholder.com/400x300/77A8A8/FFFFFF?text=AI+Interface"
  },
  {
    id: 2,
    title: "Robotic Automation System",
    description: "Designed and built a modular robotics platform for educational and research purposes.",
    technologies: ["ROS", "Python", "C++"],
    imageUrl: "https://via.placeholder.com/400x300/7E7CEE/FFFFFF?text=Robotics"
  },
  {
    id: 3,
    title: "Cognitive Computing Framework",
    description: "Open-source framework for developing applications inspired by human cognitive processes.",
    technologies: ["JavaScript", "Node.js", "Python"],
    imageUrl: "https://via.placeholder.com/400x300/77A8A8/FFFFFF?text=Cognitive+Computing"
  },
  {
    id: 4,
    title: "Minimalist Design System",
    description: "A comprehensive design system focused on elegance and usability for digital products.",
    technologies: ["Figma", "React", "Styled Components"],
    imageUrl: "https://via.placeholder.com/400x300/7E7CEE/FFFFFF?text=Design+System"
  }
];

const ProjectCard = ({ project, index, isVisible }: { project: typeof projects[0], index: number, isVisible: boolean }) => {
  return (
    <div 
      className={cn(
        "group bg-card rounded-lg overflow-hidden border border-border transition-all hover:shadow-lg hover:border-mysticJade/50",
        isVisible ? "fade-in" : "opacity-0"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span 
              key={i} 
              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
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

    const element = document.querySelector("#projects");
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
    <section id="projects" className="py-24 min-h-screen section-padding">
      <div className="container mx-auto">
        <h2 className="section-heading">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
        
        <div className={cn("text-center mt-12", isVisible ? "fade-in" : "opacity-0")} style={{ animationDelay: "0.5s" }}>
          <a 
            href="#" 
            className="inline-flex items-center border-b-2 border-mysticJade text-mysticJade pb-1 transition-all hover:border-paleWhite hover:text-paleWhite"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
