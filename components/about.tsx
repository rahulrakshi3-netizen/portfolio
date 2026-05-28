"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useLenis } from "lenis/react";
import data from "@/portfolio-data.json";

export default function AboutPage() {
  const { personal, education, bio, softSkills } = data;
  const lenis = useLenis();
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const elRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, visible: false });

  useEffect(() => {
    lenis?.resize();
  }, [hoveredSkill, lenis]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const section = document.getElementById("about");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      stateRef.current.tx = e.clientX;
      stateRef.current.ty = e.clientY;
      stateRef.current.visible = inside;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const s = stateRef.current;
      if (!el.matches(":hover")) {
        s.x = lerp(s.x, s.tx, 0.4);
        s.y = lerp(s.y, s.ty, 0.4);
      }
      el.style.left = `${s.x}px`;
      el.style.top = `${s.y - 36}px`;
      el.style.opacity = lerp(parseFloat(el.style.opacity) || 0, s.visible ? 1 : 0, 0.1).toString();
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", onMove);
    let raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const downloadResume = useCallback(() => {
    const a = document.createElement("a");
    a.href = personal.resume || "#";
    a.download = "Rahul_Raj_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [personal.resume]);

  return (
    <section id="about" className="relative w-full bg-white text-[#1e293b]">
      <div
        ref={elRef}
        data-resume-btn
        className="max-sm:hidden fixed z-50 select-none flex gap-1 rounded-full border border-[#1e293b] bg-white/90 backdrop-blur-sm px-1 py-1 text-[#1e293b] text-[11px] uppercase tracking-[0.25em] font-medium whitespace-nowrap leading-tight shadow-sm"
        style={{ left: "0px", top: "0px", opacity: 0 }}
      >
        <button
          onClick={() => window.open(personal.resume || "#", "_blank", "noopener,noreferrer")}
          className="rounded-full px-3 py-1.5 hover:bg-[#1e293b] hover:text-white transition-colors duration-200 cursor-pointer"
        >
          View Resume
        </button>
        <button
          onClick={downloadResume}
          className="rounded-full px-3 py-1.5 hover:bg-[#1e293b] hover:text-white transition-colors duration-200 cursor-pointer"
        >
          Download Resume
        </button>
      </div>

      <div className="px-4 sm:px-6 pt-16 sm:pt-48 pb-16 sm:pb-40 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#64748b] mb-3 font-medium">
            About
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1e293b]">
            {personal.name}
          </h2>
          <div className="w-12 h-0.5 bg-[#1e293b] mx-auto mt-4" />
          <div className="sm:hidden flex justify-center gap-2 mt-6">
            <a
              href={personal.resume || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-[#1e293b] bg-white px-4 py-1.5 text-[#1e293b] text-[11px] uppercase tracking-[0.25em] font-medium whitespace-nowrap leading-tight no-underline shadow-sm hover:bg-[#1e293b] hover:text-white transition-colors duration-200"
            >
              View Resume
            </a>
            <button
              onClick={downloadResume}
              className="inline-block rounded-full border border-[#1e293b] bg-white px-4 py-1.5 text-[#1e293b] text-[11px] uppercase tracking-[0.25em] font-medium whitespace-nowrap leading-tight shadow-sm hover:bg-[#1e293b] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Download Resume
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12 sm:mb-20">
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed text-center">
            {bio}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mb-10 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-px bg-[#1e293b]" />
              <h3 className="text-[11px] uppercase tracking-[0.25em] text-[#64748b] font-medium">
                Education
              </h3>
            </div>
            <div className="relative pl-6 border-l-2 border-[#e2e8f0] space-y-10">
              {education.map((edu, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-[#1e293b] border-2 border-white" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b] mb-2">
                      {edu.year}
                    </p>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#1e293b] leading-tight mb-1">
                      {edu.degree}
                    </p>
                    <p className="text-base sm:text-lg font-medium text-[#475569]">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-[#64748b] mt-0.5">
                      {edu.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-px bg-[#1e293b]" />
              <h3 className="text-[11px] uppercase tracking-[0.25em] text-[#64748b] font-medium">
                Soft Skills
              </h3>
            </div>
            <LayoutGroup>
              <div className="space-y-3">
                {softSkills.map((skill, i) => (
                  <motion.div
                    key={i}
                    layout
                    onMouseEnter={() => setHoveredSkill(i)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="relative border border-[#e2e8f0] rounded-lg px-4 py-3 hover:border-[#1e293b] transition-colors duration-300 cursor-default"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1e293b]" />
                      <span className="text-[10px] uppercase tracking-[0.15em] text-[#1e293b] font-semibold">
                        {skill.name}
                      </span>
                    </div>
                    <AnimatePresence mode="wait">
                      {hoveredSkill === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-[#64748b] leading-relaxed pt-2 border-t border-[#e2e8f0] mt-2">
                            {skill.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </LayoutGroup>


          </div>
        </div>
      </div>
    </section>
  );
}
