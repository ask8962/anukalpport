"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const CardContainer = ({
    children,
    className,
    containerClassName,
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top, width, height } =
            containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsMouseEntered(true);
        if (!containerRef.current) return;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        setIsMouseEntered(false);
        containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };
    return (
        <div
            className={cn("flex flex-1 items-center justify-center", containerClassName)}
            style={{ perspective: "1000px" }}
        >
            <div
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "flex flex-col items-center justify-center relative transition-all duration-200 ease-linear",
                    className
                )}
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}
            </div>
        </div>
    );
};

export const CardBody = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
                className
            )}
        >
            {children}
        </div>
    );
};

export const CardItem = ({
    as: Tag = "div",
    children,
    className,
    translateZ = 0,
    translateX = 0,
    translateY = 0,
    ...rest
}: {
    as?: any;
    children: React.ReactNode;
    className?: string;
    translateZ?: number | string;
    translateX?: number | string;
    translateY?: number | string;
    [key: string]: any;
}) => {
    return (
        <Tag
            className={cn("w-fit transition duration-200 ease-linear", className)}
            style={{
                transform: `translateZ(${translateZ}px) translateX(${translateX}px) translateY(${translateY}px)`,
            }}
            {...rest}
        >
            {children}
        </Tag>
    );
};
