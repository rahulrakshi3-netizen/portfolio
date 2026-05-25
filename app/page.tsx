"use client";

import { useEffect, useState } from "react";
import ReactLenis from "lenis/react";
import { useLenis } from "lenis/react";
import { Skiper39 } from "@/components/v1/skiper39";
import { Skiper16 } from "@/components/v1/skiper16";
import { Skiper31 } from "@/components/v1/skiper31";
import AboutPage from "@/components/about";
import data from "@/portfolio-data.json";

const links = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
];

function SideNav() {
  const lenis = useLenis();
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", "projects", "skills", "about"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const isDark = active === "projects" || active === "skills";

  return (
    <nav className="fixed left-4 sm:left-6 top-24 sm:top-32 z-50 hidden sm:flex sm:flex-col gap-5">
      {links.map((link) => (
        <button
          key={link.href}
          onClick={() => lenis?.scrollTo(link.href)}
          className="group relative text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#64748b] no-underline text-left cursor-pointer"
        >
          <span className="relative">
            {link.label}
            <span
              className={`absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                isDark ? "bg-white" : "bg-[#1e293b]"
              }`}
            />
          </span>
        </button>
      ))}
    </nav>
  );
}

function MobileNav() {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-8 h-8 flex flex-col items-center justify-center gap-1"
        aria-label="Menu"
      >
        <span className={`block h-px w-5 bg-[#1e293b] transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
        <span className={`block h-px w-5 bg-[#1e293b] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`block h-px w-5 bg-[#1e293b] transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-10 right-0 bg-white border border-[#e2e8f0] rounded-lg shadow-lg py-2 px-1 flex flex-col gap-1 min-w-[140px]">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => { lenis?.scrollTo(link.href); setOpen(false); }}
              className="text-xs uppercase tracking-[0.15em] text-[#1e293b] px-3 py-2 rounded hover:bg-[#f1f5f9] transition-colors text-left cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
      <ReactLenis root>
        <SideNav />
        <MobileNav />
        <Skiper39 />
        <Skiper16 />
        <Skiper31 />
        <AboutPage />
        <footer id="footer" className="w-full bg-[#0f172a] text-[#f8fafc]">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#334155] to-transparent" />
        <div className="px-5 sm:px-6 py-10 sm:py-14 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0">
              <div className="flex flex-col gap-2 sm:gap-3 sm:pr-10">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#f8fafc]">
                  {data.personal.name}
                </span>
                <p className="text-sm text-[#94a3b8] leading-relaxed sm:max-w-sm">
                  {data.personal.title} &mdash; {data.bio.split(".")[0]}.
                </p>
                <p className="text-[11px] sm:text-xs text-[#475569] mt-1">
                  &copy; {new Date().getFullYear()} {data.personal.name}. Crafted with care.
                </p>
              </div>
              <div className="relative flex flex-col gap-2 sm:gap-3 sm:px-10 sm:before:absolute sm:before:left-0 sm:before:top-0 sm:before:h-full sm:before:w-px sm:before:bg-gradient-to-b sm:before:from-[#334155] sm:before:to-transparent">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#64748b] font-medium">
                  Certifications by Course
                </span>
                <div className="space-y-2 sm:space-y-3 text-sm">
                  {data.certifications.filter(c => !c.includes("Prize")).map((cert, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-[10px] text-[#475569] mt-1">&#9679;</span>
                      <span className="text-[13px] sm:text-sm text-[#94a3b8] leading-snug">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex flex-col gap-2 sm:gap-3 sm:pl-10 sm:before:absolute sm:before:left-0 sm:before:top-0 sm:before:h-full sm:before:w-px sm:before:bg-gradient-to-b sm:before:from-[#334155] sm:before:to-transparent">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#64748b] font-medium">
                  Connect
                </span>
                <div className="space-y-1.5 sm:space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-[#475569] text-[10px] sm:text-xs w-5">&#9993;</span>
                    <a href={`mailto:${data.personal.email}`} className="text-[13px] sm:text-sm text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                      {data.personal.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#475569] text-[10px] sm:text-xs w-5">&#9742;</span>
                    <span className="text-[13px] sm:text-sm text-[#94a3b8]">+91 {data.personal.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#475569] text-[10px] sm:text-xs w-5">&#9906;</span>
                    <span className="text-[13px] sm:text-sm text-[#94a3b8]">{data.personal.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#475569] text-[10px] sm:text-xs w-5">&#9733;</span>
                    <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="text-[13px] sm:text-sm text-[#94a3b8] hover:text-[#f8fafc] transition-colors underline underline-offset-4 decoration-[#334155] hover:decoration-[#f8fafc]">
                      GitHub
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#475569] text-[10px] sm:text-xs w-5">&#9670;</span>
                    <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-[13px] sm:text-sm text-[#94a3b8] hover:text-[#f8fafc] transition-colors underline underline-offset-4 decoration-[#334155] hover:decoration-[#f8fafc]">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </ReactLenis>
  );
}
