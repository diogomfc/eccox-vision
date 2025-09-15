"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect } from "react";
import "./progress-circle.css";

interface ProgressCircleProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
  status: "Concluida" | "Pendente";
}

export function ProgressCircle({ percentage, size = "md", status }: ProgressCircleProps) {
  const dimensions = {
    sm: { size: 40, stroke: 3 },
    md: { size: 48, stroke: 4 },
    lg: { size: 56, stroke: 5 },
  };

  const { size: circleSize, stroke } = dimensions[size];
  const radius = (circleSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  // Usa MotionValue para o valor de porcentagem, iniciando em 0
  const progress = useMotionValue(0);
  // Usa useTransform para converter a porcentagem em strokeDashoffset
  const offset = useTransform(progress, (latestProgress) => {
    return circumference - (latestProgress / 100) * circumference;
  });

  useEffect(() => {
    // Anima o MotionValue de progresso para o valor da porcentagem
    const animation = animate(progress, percentage, {
      duration: 1.2,
      ease: "easeOut",
    });

    return animation.stop;
  }, [percentage, progress]);

  const interpolateColor = (percent: number) => {
    const red = [240, 68, 56];
    const green = [50, 213, 131];
    
    const r = Math.round(red[0] + (green[0] - red[0]) * (percent / 100));
    const g = Math.round(red[1] + (green[1] - red[1]) * (percent / 100));
    const b = Math.round(red[2] + (green[2] - red[2]) * (percent / 100));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const strokeColor = interpolateColor(percentage);
  const bgColor = `rgba(${percentage < 50 ? '42, 14, 14' : '14, 42, 21'})`;

  return (
    <div
      className="progress-circle relative flex items-center justify-center"
      style={{ width: circleSize, height: circleSize }}
    >
      {/* Círculo de fundo */}
      <svg className="absolute" width={circleSize} height={circleSize}>
        <circle
          stroke={bgColor}
          strokeWidth={stroke}
          fill="none"
          r={radius}
          cx={circleSize / 2}
          cy={circleSize / 2}
        />
      </svg>

      {/* Círculo de progresso animado */}
      <motion.svg
        className="absolute -rotate-90"
        width={circleSize}
        height={circleSize}
      >
        <motion.circle
          stroke={strokeColor}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          // Aplica o MotionValue para a animação
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          fill="none"
          r={radius}
          cx={circleSize / 2}
          cy={circleSize / 2}
        />
      </motion.svg>

      {/* Texto da porcentagem, também animado */}
      <motion.span
        className="progress-percentage absolute font-bold text-sm"
        style={{ color: strokeColor }}
      >
        <motion.span>{useTransform(progress, Math.round)}</motion.span>%
      </motion.span>
    </div>
  );
}