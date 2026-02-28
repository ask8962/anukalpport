"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseover", handleHoverStart);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseover", handleHoverStart);
        };
    }, [cursorX, cursorY, isVisible]);

    if (typeof window === "undefined") return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary/50 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                opacity: isVisible ? 1 : 0,
            }}
            animate={{
                scale: isHovering ? 2 : 1,
                backgroundColor: isHovering ? "rgba(139, 92, 246, 0.2)" : "transparent",
                borderColor: isHovering ? "rgba(139, 92, 246, 0.8)" : "rgba(139, 92, 246, 0.5)",
            }}
            transition={{
                scale: { duration: 0.2 },
                backgroundColor: { duration: 0.2 }
            }}
        >
            <motion.div
                className="w-1.5 h-1.5 bg-primary rounded-full"
                animate={{
                    opacity: isHovering ? 0 : 1,
                    scale: isHovering ? 0 : 1
                }}
            />
        </motion.div>
    );
};
