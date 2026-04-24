"use client";

import LinkButton from "@/components/LinkButton";
import ParallaxLink from "@/modules/home/ParallaxLink";
import { containerVariants, itemVariants } from "@/utils/motion";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="p-4 w-full flex-1 flex flex-col gap-12 items-center min-h-[83vh]">
        {/* First Hero Section */}
        <motion.section
          initial="hidden"
          whileInView="show"
          variants={containerVariants}
          className="text-center max-w-2xl space-y-4"
        >
          <motion.h2 className="text-4xl font-bold" variants={itemVariants}>
            <span className="bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 bg-size-[200%_200%] bg-clip-text text-transparent animate-gradient">
              AI-powered
            </span>{" "}
            interviews for smarter hiring
          </motion.h2>
          <motion.p
            className="text-white/70 text-lg mt-4"
            variants={itemVariants}
          >
            Eburon Jobs helps companies find top talent faster and helps
            candidates showcase their skills effortlessly. Your perfect match is
            just a click away.
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center gap-8"
            variants={itemVariants}
          >
            <LinkButton href="/employer">I&apos;m an Employer</LinkButton>
            <LinkButton href="/candidate/profile" variant="outline">
              I&apos;m a Candidate
            </LinkButton>
          </motion.div>
        </motion.section>

        {/* Parallax cards */}
        <section className="flex flex-col lg:justify-center w-full max-w-4xl gap-8 mt-12">
          <ParallaxLink
            heading="Hire"
            description="Potential Candidates Utilizing Power of AI."
            buttonText="Try Now"
            imageUrl="/hire.png"
            url="/employer"
          />
          <hr className="my-4 lg:my-12 text-white/30" />
          <ParallaxLink
            heading="Find"
            description="Your Dream Job Effortlessly With Help of Eburon AI"
            buttonText="Try Now"
            imageUrl="/find.png"
            url="/candidate/profile"
            className="lg:flex-row-reverse!"
          />
        </section>

        {/* How it works */}
        <motion.section
          initial="hidden"
          whileInView="show"
          variants={containerVariants}
          className="my-12 max-w-3xl text-center flex flex-col items-center"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-semibold mb-6"
          >
            How it works
          </motion.h3>
          <div className="flex flex-col items-center gap-6 text-white/60 text-sm">
            <div className="space-y-2">
              <motion.h4
                variants={itemVariants}
                className="font-semibold text-white text-lg"
              >
                1. Apply
              </motion.h4>
              <motion.p variants={itemVariants}>
                Fill out your profile and complete a quick AI interview.
              </motion.p>
            </div>
            <div className="space-y-2">
              <motion.h4
                variants={itemVariants}
                className="font-semibold text-white text-lg"
              >
                2. Evaluate
              </motion.h4>
              <motion.p variants={itemVariants}>
                AI analyzes your answers and generates confidence scores.
              </motion.p>
            </div>
            <div className="space-y-2">
              <motion.h4
                variants={itemVariants}
                className="font-semibold text-white text-lg"
              >
                3. Match
              </motion.h4>
              <motion.p variants={itemVariants}>
                Employers review top candidates and find the perfect match.
              </motion.p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default HomePage;
