"use client";
import { containerVariants, itemVariants } from "@/utils/motion";
import { useScroll, useTransform } from "motion/react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { useRef } from "react";

const parallaxItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

interface ParallaxLinkProps {
  heading: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  url: string;
  className?: string;
}

const ParallaxLink: React.FC<ParallaxLinkProps> = ({
  heading,
  description,
  buttonText,
  imageUrl,
  url,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <motion.div
      className={`${className} flex flex-col lg:flex-row gap-2 lg:gap-8 lg:items-center`}
      initial="hidden"
      whileInView="show"
      variants={containerVariants}
    >
      <div>
        <motion.h4 variants={itemVariants} className="font-bold text-2xl">
          {heading}
        </motion.h4>
        <motion.h6 variants={itemVariants} className="text-lg text-white/50">
          {description}
        </motion.h6>
      </div>

      <motion.div
        className={`${className} mt-2 w-full max-w-lg h-70 rounded-3xl overflow-hidden relative`}
        ref={ref}
        variants={parallaxItemVariants}
      >
        <motion.img
          style={{ y }}
          className="object-cover absolute w-full h-[130%] blur-xs"
          src={imageUrl}
          alt="hire"
          width={300}
          height={200}
        />
        <Link
          href={url}
          className="cursor-pointer duration-150 absolute bottom-3 right-3 rounded-2xl bg-black/90 hover:bg-black/90 p-4 px-8 font-semibold"
        >
          {buttonText} →
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ParallaxLink;
