"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Redesigned interactive testimonial carousel with autoplay, drag, keyboard nav

type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Roshan Kumar Jha",
    role: "Product Manager, ImproveFX",
    text: "Aditya delivered a polished dashboard with thoughtful UX — fast, communicative, and focused on results.",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Abhishek Jha",
    role: "CTO, MediLenz",
    text: "Excellent full-stack skills. Aditya built reliable APIs and a clean admin interface that scaled well.",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Founder, SourcifyHub",
    text: "Great to work with — proactive, detail-oriented, and always delivering on schedule.",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Vikash Kumar Pal",
    role: "Developer, ImproveFX",
    text: "Aditya's technical expertise and collaborative approach made our project a success. Highly recommended!",
    avatar: "/placeholder.svg",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const clampIndex = useCallback((i: number) => {
    const len = testimonials.length;
    return ((i % len) + len) % len;
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((i) => clampIndex(i + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, clampIndex]);

  const prev = useCallback(
    () => setIndex((i) => clampIndex(i - 1)),
    [clampIndex]
  );
  const next = useCallback(
    () => setIndex((i) => clampIndex(i + 1)),
    [clampIndex]
  );

  const item = testimonials[index];

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/10 via-black/5 to-black/10"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold text-white"
          >
            What people say
          </h2>
          <p className="text-white/70 mt-2">
            Selected testimonials from collaborators and clients
          </p>
        </motion.div>

        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="relative"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={index}
              className="cursor-grab"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80) prev();
                else if (info.offset.x < -80) next();
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden px-6 py-8">
                <CardHeader>
                  <div className="flex items-center gap-6">
                    <img
                      src={item.avatar || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-white/10 shadow-md"
                    />
                    <div>
                      <CardTitle className="text-white text-xl">
                        {item.name}
                      </CardTitle>
                      <div className="text-sm text-white/70">{item.role}</div>
                      <div className="mt-2 flex items-center text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-lg">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <blockquote className="text-white/90 text-lg italic leading-relaxed mt-6">
                    <span className="text-4xl align-top text-white/30 mr-3">
                      “
                    </span>
                    {item.text}
                  </blockquote>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="text-white/60 text-sm">
                      {index + 1} / {testimonials.length}
                    </div>
                    <div className="hidden sm:flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/90 p-2"
                        onClick={prev}
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/90 p-2"
                        onClick={next}
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-transform ${
                  i === index
                    ? "bg-white scale-125"
                    : "bg-white/30 hover:scale-110"
                }`}
              />
            ))}
          </div>

          {/* Mobile arrows overlay */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={prev}
              aria-label="Previous"
              className="p-3 rounded-full bg-black/40 text-white/90 ml-3 backdrop-blur"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              onClick={next}
              aria-label="Next"
              className="p-3 rounded-full bg-black/40 text-white/90 mr-3 backdrop-blur"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
