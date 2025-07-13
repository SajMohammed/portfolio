"use client";

import { motion, Variants } from "framer-motion";
import { TextColor } from "@/components/ui/text-color";
import ProfileCard from "@/components/ui/profile-card";

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-14">
      <motion.div
        className="w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <TextColor 
            firstLine="About Me."
            className="mb-6"
          />
        </motion.div>
        
        <motion.div 
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-left text-white mb-12"
          variants={itemVariants}
        >
          The story behind the code
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={itemVariants}
        >
          {/* Profile Card on the left side */}
          <div className="w-full max-w-md mx-auto lg:mx-0 mb-8 lg:mb-0">
            <ProfileCard 
              avatarUrl="/images/IMG_8456.jpg"
              name=""
              title=""
              handle="sajmo"
              status="Online"
              showUserInfo={true}
              contactText="Contact Me"
              onContactClick={() => window.location.href = "#contact"}
            />
          </div>
          
          {/* Text content on the right side */}
          <div className="prose prose-lg prose-invert max-w-full font-jetbrains-mono mt-4 lg:mt-0"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            <p>
              I'm Saj, a software developer and product enthusiast who believes the best code tells a story.
            </p>
            <br />
            <p>
              Over the past 7 years, I've evolved from a curious developer who loved breaking things 
              to a technical leader who specializes in building them right and robust. I've 
              architected logistics platforms that handle millions of tracking events, built 
              authentication systems that protect sensitive data, and designed dashboards that 
              turn overwhelming data into actionable insights.
            </p>
            <br />
            <p>
              My superpower? I translate between human needs and technical possibilities. Whether 
              I'm explaining microservices to a Founder or optimizing database queries for a startup, 
              I bridge the gap between what business wants and what technology can deliver.
            </p>
            <br />
            <p>
              When I'm not architecting cloud solutions, you'll find me building my own products, trying my hands at cooking, photography,
              reading books, and learning new things.
            </p>
            <br />
            <p>
              The common thread? I love creating systems that just work.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 