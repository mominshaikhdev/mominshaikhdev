"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if (typeof document !== "undefined") {
    window.addEventListener("load", () => ScrollTrigger.refresh());
    window.addEventListener("hashchange", () =>
      setTimeout(() => ScrollTrigger.refresh(), 50),
    );
  }
}
export { gsap, ScrollTrigger };
export const useIsoLayoutEffect = useEffect;
