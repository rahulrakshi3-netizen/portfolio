"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import data from "@/portfolio-data.json";

const StickyCard = ({
  i,
  title,
  type,
  description,
  technologies,
  url,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  type: string;
  description: string;
  technologies: string[];
  url: string;
  progress: any;
  range: [number, number];
  targetScale: number;
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-3vh + ${i * 20 + 80}px)`,
        }}
        className="rounded-2xl relative -top-[6%] sm:-top-[8%] flex h-[400px] sm:h-[320px] w-[92vw] max-w-[340px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[680px] origin-top flex-col overflow-hidden bg-[#1e293b] border border-[#334155] shadow-lg"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#64748b] rounded-l-2xl"></div>
        <a
          href={url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex h-full w-full flex-col"
        >
          <div className="flex-1 flex flex-col justify-center px-5 sm:px-8 py-4 sm:py-5">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#94a3b8] mb-2">
              {type}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] mb-3">
              {title}
            </h3>
            <p className="text-sm text-[#cbd5e1] leading-relaxed mb-3 line-clamp-3">
              {description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-[#334155] text-[#cbd5e1] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="px-5 sm:px-8 py-2 sm:py-2.5 border-t border-[#334155] flex items-center justify-between">
            <span className="text-xs text-[#64748b] truncate max-w-[85%]">
              {url || "URL not set"}
            </span>
            <svg className="w-3.5 h-3.5 text-[#64748b] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </a>
      </motion.div>
    </div>
  );
};

const Skiper16 = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const { projects } = data;

  return (
    <section id="projects"
        ref={container}
        className="relative w-full bg-[#0f172a] pt-6 sm:pt-14 pb-0"
      >
        <div className="text-center mb-3 sm:mb-4 px-4 sm:px-6">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#64748b] mb-2 font-medium">
            Projects
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f8fafc]">
            What I&apos;ve Built
          </h2>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center pb-32 sm:pb-28">
          {projects.map((project, i) => {
            const targetScale = Math.max(
              0.5,
              1 - (projects.length - i - 1) * 0.1,
            );
            return (
              <StickyCard
                key={`p_${i}`}
                i={i}
                title={project.name}
                type={project.type}
                description={project.description}
                technologies={project.technologies}
                url={project.url || ""}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
    </section>
  );
};

export { Skiper16 };
