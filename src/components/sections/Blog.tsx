import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Human-Computer Interaction",
    excerpt: "Exploring how advancements in cognitive science are reshaping the way we interact with technology.",
    date: "May 2, 2025",
    category: "Design",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Architectural Patterns in Modern Computing",
    excerpt: "An analysis of emerging architectural patterns in distributed systems and their implications.",
    date: "April 18, 2025",
    category: "Computer Architecture",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Psychology and User Experience Design",
    excerpt: "How insights from cognitive psychology can inform more intuitive and engaging digital experiences.",
    date: "April 5, 2025",
    category: "Psychology",
    readTime: "6 min read",
  },
];

const BlogPostCard = ({ post, index, isVisible }: { post: typeof blogPosts[0], index: number, isVisible: boolean }) => {
  return (
    <div 
      className={cn(
        "bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md hover:border-mysticJade/50",
        isVisible ? "fade-in" : "opacity-0"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs text-muted-foreground">{post.date}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-mysticJade/10 text-mysticJade">{post.category}</span>
      </div>
      
      <h3 className="text-xl font-medium mb-3">{post.title}</h3>
      
      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{post.readTime}</span>
        <a 
          href="#" 
          className="text-sm text-mysticJade hover:text-paleWhite transition-colors"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

const Blog = () => {
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

    const element = document.querySelector("#blog");
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
    <section id="blog" className="py-24 min-h-screen section-padding">
      <div className="container mx-auto">
        <h2 className="section-heading">From the Blog</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPostCard 
              key={post.id} 
              post={post} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
        
        <div className={cn("text-center mt-12", isVisible ? "fade-in" : "opacity-0")} style={{ animationDelay: "0.4s" }}>
          <a 
            href="#" 
            className="inline-flex items-center border-b-2 border-mysticJade text-mysticJade pb-1 transition-all hover:border-paleWhite hover:text-paleWhite"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
