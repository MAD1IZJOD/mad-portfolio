
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import ThreeScene from "@/components/ThreeScene";

const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

const Index = () => {
  return (
    <Layout>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <Hero />
        <ThreeScene />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </motion.div>
    </Layout>
  );
};

export default Index;
