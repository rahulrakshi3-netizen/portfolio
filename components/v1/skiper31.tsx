"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { useLenis } from "lenis/react";

import { cn } from "@/lib/utils";
import data from "@/portfolio-data.json";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  return (
    <motion.span
      className={cn("inline-block text-[#3b82f6]", isSpace && "w-4")}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

const devicon = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const techLogos: Record<string, string> = {
  Java: `${devicon}/java/java-original.svg`,
  Python: `${devicon}/python/python-original.svg`,
  JavaScript: `${devicon}/javascript/javascript-original.svg`,
  "Android Studio": `${devicon}/androidstudio/androidstudio-original.svg`,
  Capacitor: `${devicon}/capacitor/capacitor-original.svg`,
  HTML: `${devicon}/html5/html5-original.svg`,
  CSS: `${devicon}/css3/css3-original.svg`,
  "Node.js": `${devicon}/nodejs/nodejs-original.svg`,
  MySQL: `${devicon}/mysql/mysql-original.svg`,
};

type LogoProps = {
  src: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const TechLogo = ({
  src,
  index,
  centerIndex,
  scrollYProgress,
}: LogoProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [Math.abs(distanceFromCenter) * 50, 0],
  );

  return (
    <motion.img
      src={src}
      alt=""
      className="inline-block w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-2 sm:mx-3"
      style={{ x, scale, y, transformOrigin: "center" }}
      draggable={false}
    />
  );
};

const Bracket = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={className}
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};

const Skiper31 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  const p1 = useMotionValue(0);
  const p2 = useMotionValue(0);
  const p3 = useMotionValue(0);

  useLenis(() => {
    const vh = window.innerHeight;
    for (const [ref, p] of [[targetRef, p1], [targetRef2, p2], [targetRef3, p3]] as const) {
      if (!ref.current) continue;
      const rect = ref.current.getBoundingClientRect();
      p.set(Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh))));
    }
  });

  const { skills, certifications } = data;

  const text = "skills & tech";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const allTech = [...new Set([
    ...skills.languages,
    ...skills.android,
    ...skills.web,
    ...skills.databases,
  ])];
  const logoCenter = Math.floor(allTech.length / 2);

  const techNames = allTech.join(" · ");
  const toolChars = techNames.split("");
  const toolCenter = Math.floor(toolChars.length / 2);

  return (
    <section id="skills" className="w-full bg-[#0f172a]">
      <div
 ref={targetRef}
        className="relative box-border flex h-[90vh] sm:h-[100vh] items-center justify-center gap-[2vw] overflow-hidden bg-[#0f172a] p-[2vw]"
      >
        <div
          className="w-full max-w-4xl text-center text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tighter text-[#f8fafc] px-4"
          style={{ perspective: "500px" }}
        >
          {characters.map((char, index) => (
            <CharacterV1
              key={index}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={p1}
            />
          ))}
        </div>
      </div>
      <div
        ref={targetRef2}
        className="relative -mt-[45vh] box-border flex h-[90vh] sm:h-[100vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#0f172a] p-[2vw]"
      >
        <p className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-xl font-medium tracking-tight text-[#f8fafc] px-4 whitespace-nowrap">
          <Bracket className="h-5 sm:h-10 text-[#3b82f6]" />
          <span className="font-medium">Tech Stack</span>
          <Bracket className="h-5 sm:h-10 scale-x-[-1] text-[#3b82f6]" />
        </p>
        <div className="w-full max-w-5xl text-center leading-relaxed px-4 flex flex-wrap items-center justify-center py-6">
          {allTech.map((name, index) => (
            <TechLogo
              key={name}
              src={techLogos[name]}
              index={index}
              centerIndex={logoCenter}
              scrollYProgress={p2}
            />
          ))}
        </div>
      </div>
      <div
        ref={targetRef3}
        className="relative -mt-[40vh] box-border flex h-[90vh] sm:h-[100vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#0f172a] p-[2vw]"
      >
        <p className="flex items-center justify-center gap-3 text-lg sm:text-xl font-medium tracking-tight text-[#f8fafc] px-4">
          <Bracket className="h-6 sm:h-10 text-[#3b82f6]" />
          <span className="font-medium">Tools</span>
          <Bracket className="h-6 sm:h-10 scale-x-[-1] text-[#3b82f6]" />
        </p>
        <div
          className="w-full max-w-5xl text-center text-lg sm:text-xl md:text-2xl font-medium text-[#64748b] px-4"
          style={{ perspective: "500px" }}
        >
          {toolChars.map((char, index) => (
            <motion.span
              key={index}
              className={cn(
                "inline-block",
                char === " " && "w-3",
              )}
              style={{
                x: useTransform(p3, [0, 0.5], [(index - toolCenter) * 90, 0]),
                rotate: useTransform(p3, [0, 0.5], [(index - toolCenter) * 50, 0]),
                y: useTransform(p3, [0, 0.5], [-Math.abs(index - toolCenter) * 20, 0]),
                scale: useTransform(p3, [0, 0.5], [0.75, 1]),
                transformOrigin: "center",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export { CharacterV1, Skiper31 };
