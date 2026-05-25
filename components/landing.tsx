"use client";

import { CrowdCanvas } from "@/components/crowd-canvas";
import { useEffect, useState } from "react";

const Typewriter = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
};

const Landing = () => {
  return (
    <div className="relative h-full w-full bg-[#0f172a] text-[#e2e8f0] overflow-hidden">
      <CrowdCanvas src="/images/peeps/all-peeps.png" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <p className="animate-fade-in text-xs uppercase tracking-[0.3em] text-[#38bdf8] mb-6 font-medium">
            Portfolio
          </p>

          <h1 className="animate-fade-in-delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
              Rahul Raj
            </span>
          </h1>

          <p className="animate-fade-in-delay-2 text-lg sm:text-xl md:text-2xl text-[#94a3b8] mb-3 font-light">
            <Typewriter text="BCA Student · Android & Full Stack Developer" speed={40} />
          </p>

          <p className="animate-fade-in-delay-2 text-sm sm:text-base text-[#64748b] mb-8 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Bangalore, India
          </p>

          <div className="animate-fade-in-delay-3 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:rahulrakshi3@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#38bdf8] text-[#0f172a] font-semibold text-sm hover:bg-[#7dd3fc] transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
            </a>

            <a
              href="https://github.com/rahulrakshi3-netizen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#334155] text-[#e2e8f0] font-semibold text-sm hover:border-[#38bdf8] hover:text-[#38bdf8] transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>

            <a
              href="tel:9538762342"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#334155] text-[#e2e8f0] font-semibold text-sm hover:border-[#38bdf8] hover:text-[#38bdf8] transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 9538762342
            </a>
          </div>

          <div className="animate-fade-in-delay-3 mt-12 flex items-center justify-center gap-6 text-[#64748b]">
            <div className="h-px w-12 bg-[#334155]"></div>
            <span className="text-xs uppercase tracking-[0.2em]">Scroll to explore</span>
            <div className="h-px w-12 bg-[#334155]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Landing };
