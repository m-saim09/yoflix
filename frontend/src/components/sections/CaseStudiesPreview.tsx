"use client";

import { useEffect, useRef, useState } from "react";
import "./countersection.css";

export const CounterSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);
  const [visible, setVisible] = useState(false);

  const statsData = [
    { number: 200, label: "Integrations" },
    { number: 30, label: "Compliance experts and former auditors" },
    { number: 79, label: "Million in funding" },
  ];

  // Smooth reveal + counter trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);

            // restart counter animation
            setStart(false);
            setTimeout(() => setStart(true), 120);
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const Counter = ({ target, label, trigger }: any) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!trigger) return;

      let startVal = 0;

      const duration = 1800;
      const steps = 80;
      const increment = target / steps;

      const interval = setInterval(() => {
        startVal += increment;

        if (startVal >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.ceil(startVal));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, [trigger, target]);

    return (
      <div className="stat-card">
        <div className="number">{count}+</div>
        <div className="label">{label}</div>
      </div>
    );
  };

  return (
    <section
      ref={ref}
      className={`hero ${visible ? "show" : ""}`}
    >
      <div className="container">

        {/* HEADING */}
        <h1 className="title">
          Comprehensive compliance platform. World class expertise.
        </h1>

        <p className="subtitle">
          Get compliant, mitigate risk, and use security as a differentiator —
          all with the support you need.
        </p>

        {/* STATS */}
        <div className="stats-box">
          {statsData.map((item, i) => (
            <Counter
              key={i}
              target={item.number}
              label={item.label}
              trigger={start}
            />
          ))}
        </div>

      </div>
    </section>
  );
};