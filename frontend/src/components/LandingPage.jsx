// LandingPage.jsx

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const heroTitle = "Welcome to AI Mentorship";
const chars = heroTitle.split("").map((char, index) => (
  <span
    key={index}
    className="hero-char inline-block"
    style={{ whiteSpace: "pre" }}
  >
    {char}
  </span>
));

export default function LandingPage() {
  const navigate = useNavigate();
  const component = useRef(null);

  const personas = [
    {
      id: "hitesh",
      name: "Hitesh Choudhary",
      tagline: "Keeps it real and practical.",
      image: "https://avatars.githubusercontent.com/u/11613311?v=4",
    },
    {
      id: "piyush",
      name: "Piyush Garg",
      tagline: "Learn and build, faster.",
      image: "https://avatars.githubusercontent.com/u/44976328?v=4",
    },
  ];

  const handleSelect = (personaId) => {
    gsap.to(component.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => navigate(`/chat/${personaId}`),
    });
  };

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    let ctx = gsap.context(() => {
      // Set initial states to prevent FOUC. GSAP will animate TO these states.
      gsap.set(".hero-char", { yPercent: 100, autoAlpha: 0 });
      gsap.set(".hero-subtitle", { y: 30, autoAlpha: 0 });
      gsap.set([".choose-mentor-title", ".choose-mentor-subtitle"], {
        yPercent: 25,
        autoAlpha: 0,
      });
      gsap.set(".hitesh-details", { x: -30, autoAlpha: 0 });
      gsap.set(".piyush-details", { x: 30, autoAlpha: 0 });
      gsap.set([".hitesh-section", ".piyush-section"], { autoAlpha: 0 });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main-container",
          pin: true,
          start: "top top",
          end: "+=3500",
          scrub: true,
        },
      });

      // --- INTRO ANIMATIONS ---
      gsap.to(".hero-char", {
        autoAlpha: 1,
        yPercent: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
      });
      gsap.to(".hero-subtitle", {
        delay: 0.75,
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".scroll-indicator", {
        delay: 1.5,
        opacity: 0,
        y: 20,
        duration: 0.8,
      });

      // --- SCROLL-DRIVEN ANIMATIONS ---
      masterTl
        .to(".hero-section", { opacity: 0, yPercent: -25, duration: 1 })
        .to(
          [".choose-mentor-title", ".choose-mentor-subtitle"],
          { autoAlpha: 1, yPercent: 0, stagger: 0.2, duration: 1 },
          "-=0.5"
        )
        .to(
          [".choose-mentor-title", ".choose-mentor-subtitle"],
          { opacity: 0, yPercent: -25, stagger: 0.2, duration: 1 },
          "+=1.5"
        )

        // Hitesh Reveal
        .to(".hitesh-section", { autoAlpha: 1, duration: 0.1 })
        .from(".hitesh-section", {
          xPercent: -100,
          duration: 1.5,
          ease: "power2.inOut",
        })
        .from(
          ".hitesh-image",
          { scale: 1.2, duration: 1.5, ease: "power2.inOut" },
          "<"
        )
        .to(".hitesh-details", { autoAlpha: 1, x: 0, duration: 1 }, "-=0.5")

        // Hitesh Exit (Smoother)
        .to(
          ".hitesh-details",
          { autoAlpha: 0, x: -30, duration: 0.75 },
          "+=1.5"
        )
        .to(
          ".hitesh-section",
          { xPercent: -100, duration: 1.5, ease: "power2.inOut" },
          "-=0.25"
        )
        .to(
          ".hitesh-image",
          { scale: 1.2, duration: 1.5, ease: "power2.inOut" },
          "<"
        )

        // Piyush Reveal
        .to(".piyush-section", { autoAlpha: 1, duration: 0.1 }, "-=1.5")
        .from(
          ".piyush-section",
          { xPercent: 100, duration: 1.5, ease: "power2.inOut" },
          "<"
        )
        .from(
          ".piyush-image",
          { scale: 1.2, duration: 1.5, ease: "power2.inOut" },
          "<"
        )
        .to(".piyush-details", { autoAlpha: 1, x: 0, duration: 1 }, "-=0.5");
    }, component);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={component} className="text-zinc-200 antialiased">
      <div className="main-container relative h-screen w-full overflow-hidden">
        <section className="hero-section absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-8xl font-bold leading-tight">
            {chars}
          </h1>
          <p className="hero-subtitle text-lg md:text-xl text-zinc-400 max-w-3xl mt-6">
            Engage in meaningful conversations with AI personas modeled after
            the brightest minds in technology. Your journey to mastery starts
            here.
          </p>
          <p className="scroll-indicator text-zinc-500 mt-16 animate-pulse">
            Scroll to discover
          </p>
        </section>

        <section className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h2 className="choose-mentor-title text-4xl md:text-6xl font-bold text-zinc-200">
            Choose Your Mentor
          </h2>
          <p className="choose-mentor-subtitle text-lg md:text-xl text-zinc-400 max-w-2xl mt-4">
            Each mentor offers a unique perspective. Select the one whose
            approach resonates with you to begin a personalized learning
            experience.
          </p>
        </section>

        <div className="mentors-container absolute inset-0 w-full h-full">
          {/* Hitesh */}
          <div
            className="hitesh-section absolute inset-0"
            style={{ "--accent-color": "rgba(0, 255, 255, 0.1)" }}
          >
            <div className="absolute inset-0 w-full h-full radial-glow"></div>
            <div className="w-full h-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-6">
              {/* FIX: Consistent layout structure */}
              <div className="hitesh-details flex flex-col items-center md:items-start">
                <h3 className="text-5xl font-bold text-zinc-100">
                  {personas[0].name}
                </h3>
                <p className="text-xl text-zinc-400 mt-2">
                  {personas[0].tagline}
                </p>
                <button
                  onClick={() => handleSelect(personas[0].id)}
                  className="group mt-8 inline-flex items-center gap-3 px-6 py-3 bg-zinc-800/50 rounded-lg ring-1 ring-white/10 hover:bg-zinc-800 transition-colors"
                >
                  Start Chatting
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <div className="hitesh-image-wrapper flex justify-center">
                <div className="hitesh-image w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl shadow-black">
                  <img
                    src={personas[0].image}
                    alt={personas[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Piyush */}
          <div
            className="piyush-section absolute inset-0"
            style={{ "--accent-color": "rgba(255, 22, 84, 0.1)" }}
          >
            <div className="absolute inset-0 w-full h-full radial-glow"></div>
            <div className="w-full h-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-6">
              {/* FIX: Consistent layout structure, reversed order */}
              <div className="piyush-image-wrapper flex justify-center">
                <div className="piyush-image w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl shadow-black">
                  <img
                    src={personas[1].image}
                    alt={personas[1].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* FIX: Symmetrical alignment */}
              <div className="piyush-details flex flex-col items-center md:items-end text-center md:text-right">
                <h3 className="text-5xl font-bold text-zinc-100">
                  {personas[1].name}
                </h3>
                <p className="text-xl text-zinc-400 mt-2">
                  {personas[1].tagline}
                </p>
                <button
                  onClick={() => handleSelect(personas[1].id)}
                  className="group mt-8 inline-flex items-center gap-3 px-6 py-3 bg-zinc-800/50 rounded-lg ring-1 ring-white/10 hover:bg-zinc-800 transition-colors"
                >
                  Start Chatting
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
