"use client";

import { useEffect, useRef, useState } from "react";
import "./countersection.css";

export const CounterSection = () => {
  const statsData = [
    {
      number: 200,
      label: "Integrations",
      icon: (
        <svg
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="13" cy="13" r="3" />
          <path d="M13 2v4M13 20v4M2 13h4M20 13h4M5 5l3 3M18 18l3 3M5 21l3-3M18 8l3-3" />
        </svg>
      ),
    },

    {
      number: 30,
      label: "Compliance experts and former auditors",
      icon: (
        <svg
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="4" y="5" width="18" height="14" rx="2" />
          <path d="M8 10h8M8 14h5" />
        </svg>
      ),
    },

    {
      number: 79,
      label: "Million in funding",
      icon: (
        <svg
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <ellipse cx="13" cy="6" rx="5" ry="2" />
          <path d="M8 6v6c0 1.1 2.2 2 5 2s5-.9 5-2V6" />
          <path d="M8 12v6c0 1.1 2.2 2 5 2s5-.9 5-2v-6" />
        </svg>
      ),
    },
  ];

  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const Counter = ({
    target,
    start,
  }: {
    target: number;
    start: boolean;
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!start) return;

      let current = 0;
      const increment = target / 80;

      const interval = setInterval(() => {
        current += increment;

        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.ceil(current));
        }
      }, 25);

      return () => clearInterval(interval);
    }, [start, target]);

    return <span>{count}</span>;
  };

  return (
    <section ref={sectionRef} className="hero bg-white">
      <div className="container bg-white">
        <h1>
          Comprehensive <span>compliance</span> platform.
          <br />
          World class expertise.
        </h1>

        <p>
          Get compliant, mitigate risk, and use security as a differentiator —
          all with the support you need.
        </p>

        <div className="stats-box">
          {statsData.map((item, i) => (
            <div className="stat-card" key={i}>
              <div className="icon">{item.icon}</div>

              <div className="number">
                <Counter target={item.number} start={inView} />+
              </div>

              <div className="label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};