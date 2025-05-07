import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const checkPointerStatus = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      const targetIsClickable = 
        hoveredElement?.tagName === "A" || 
        hoveredElement?.tagName === "BUTTON" || 
        hoveredElement?.closest("a") || 
        hoveredElement?.closest("button") ||
        (hoveredElement?.getAttribute("role") === "button");
      
      setIsPointer(!!targetIsClickable);
    };
    
    window.addEventListener("mousemove", mouseMove);
    
    const pointerCheckInterval = setInterval(checkPointerStatus, 100);
    
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      clearInterval(pointerCheckInterval);
    };
  }, [position]);

  useEffect(() => {
    const followCursor = () => {
      setFollowerPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.1,
        y: prev.y + (position.y - prev.y) * 0.1,
      }));
      
      animationFrameId = requestAnimationFrame(followCursor);
    };
    
    let animationFrameId = requestAnimationFrame(followCursor);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position]);

  return (
    <>
      <div
        className={cn(
          "custom-cursor bg-mysticJade w-3 h-3 mix-blend-difference",
          isPointer ? "scale-150" : ""
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${isPointer ? "scale(1.5)" : ""}`,
          transition: "transform 0.15s ease-out",
        }}
      />
      <div
        className="custom-cursor bg-paleWhite w-8 h-8 opacity-40"
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

export default CustomCursor;
