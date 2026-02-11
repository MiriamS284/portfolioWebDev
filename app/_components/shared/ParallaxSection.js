"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
  style = {},
  direction = "up",
  offset = ["start end", "end start"],
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const multiplier = direction === "down" ? speed : -speed;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${multiplier * 100}%`],
  );

  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

export function ParallaxContainer({
  children,
  className = "",
  style = {},
  offset = ["start start", "end start"],
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", ...style }}
    >
      {typeof children === "function" ? children(scrollYProgress) : children}
    </div>
  );
}

export function ParallaxImage({
  children,
  speed = 0.3,
  grayscale = false,
  className = "",
  style = {},
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 50}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={style}>
      <motion.div
        style={{
          y,
          scale,
          filter: grayscale ? "grayscale(100%)" : "none",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FadeInOnScroll({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
  className = "",
  once = true,
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { y: distance, x: 0 };
    }
  };

  const initial = getInitialPosition();

  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  className = "",
  once = true,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
  distance = 20,
}) {
  const getVariants = () => {
    const hidden = { opacity: 0 };
    const visible = { opacity: 1, x: 0, y: 0 };

    switch (direction) {
      case "up":
        hidden.y = distance;
        break;
      case "down":
        hidden.y = -distance;
        break;
      case "left":
        hidden.x = distance;
        break;
      case "right":
        hidden.x = -distance;
        break;
    }

    return { hidden, visible };
  };

  return (
    <motion.div
      variants={getVariants()}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ParallaxSection;
