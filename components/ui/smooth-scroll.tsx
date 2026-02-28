"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/react-lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    return (
        <Lenis root options={{ lerp: 0.05, smoothWheel: true }}>
            {children}
        </Lenis>
    );
};
