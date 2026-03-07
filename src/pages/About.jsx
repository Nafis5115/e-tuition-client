import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, Target, Heart } from "lucide-react";

const AboutPage = () => (
  <div className="section-padding">
    <div className="container mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold md:text-4xl">About eTuitionBd</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          eTuitionBd is Bangladesh's leading tuition management platform,
          connecting students with qualified tutors since 2024. We believe every
          student deserves access to quality education.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {[
          {
            icon: GraduationCap,
            title: "Our Mission",
            desc: "To make quality education accessible to every student across Bangladesh through a seamless tutor-student matching platform.",
          },
          {
            icon: Users,
            title: "Our Community",
            desc: "Over 5,000 verified tutors and 10,000+ students trust eTuitionBd for their educational needs.",
          },
          {
            icon: Target,
            title: "Our Goal",
            desc: "To eliminate the friction in finding qualified tutors and provide a transparent, efficient marketplace.",
          },
          {
            icon: Heart,
            title: "Our Values",
            desc: "Quality, transparency, accessibility, and trust form the foundation of everything we do.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="card-elevated rounded-xl border bg-card p-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutPage;
