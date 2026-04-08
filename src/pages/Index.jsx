import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import {
  Search,
  BookOpen,
  Users,
  Shield,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  MapPin,
  DollarSign,
} from "lucide-react";

import heroImg from "../assets/hero-illustration.png";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import BecomeTutorModal from "../components/modals/BecomeTutorModal";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const steps = [
  {
    icon: Search,
    title: "Post Your Requirement",
    desc: "Students post tuition needs with subject, budget, and schedule details.",
  },
  {
    icon: Users,
    title: "Tutors Apply",
    desc: "Qualified tutors browse and apply to suitable tuition posts.",
  },
  {
    icon: CheckCircle,
    title: "Get Matched",
    desc: "Review applications, approve the best tutor, and start learning!",
  },
];

const features = [
  {
    icon: Shield,
    title: "Verified Tutors",
    desc: "Every tutor is vetted and verified for quality assurance.",
  },
  {
    icon: Star,
    title: "Rating System",
    desc: "Transparent ratings help you choose the best tutors.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    desc: "Learn at your pace with customizable class timings.",
  },
  {
    icon: DollarSign,
    title: "Secure Payments",
    desc: "Safe and transparent payment processing via Stripe.",
  },
];

const HomePage = () => {
  const axiosInstance = useAxios();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["index-tuitions"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/all-approved-tuitions?limit=8`);
      return res.data.tuitions;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,hsl(168_80%_36%/0.3),transparent_50%)]" />
        <div className="container mx-auto flex flex-col-reverse items-center gap-8 px-4 py-16 md:flex-row md:py-24 lg:py-32">
          <motion.div
            className="flex-1 space-y-6 text-center md:text-left"
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              custom={0}
              variants={fadeUp}
              className="text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Find the Perfect{" "}
              <span className="relative">
                Tutor
                <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-accent" />
              </span>{" "}
              for Your Journey
            </motion.h1>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="max-w-lg text-lg text-primary-foreground/80"
            >
              Bangladesh's most trusted platform connecting students with
              qualified tutors. Post your requirements and find the perfect
              match.
            </motion.p>
            <motion.div
              custom={2}
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-3 md:justify-start"
            >
              <Button size="lg" variant="accent" asChild>
                <Link to="/tuitions">
                  Browse Tuitions <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                  >
                    Become a Tutor
                  </Button>
                </DialogTrigger>

                <BecomeTutorModal setOpenDialog={setOpenDialog} />
              </Dialog>
            </motion.div>
            <motion.div
              custom={3}
              variants={fadeUp}
              className="flex items-center justify-center gap-6 pt-2 text-sm text-primary-foreground/70 md:justify-start"
            >
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> 5,000+ Tutors
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> 10,000+ Tuitions
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" /> 4.8 Rating
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={heroImg}
              alt="eTuitionBd hero illustration"
              className="w-full max-w-md animate-float"
            />
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              Latest Tuition Posts
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover recently posted tuition opportunities
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tuitions.map((t, i) => (
              <motion.div
                key={t._id}
                className="card-elevated rounded-xl border bg-card p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <h3 className="font-heading text-lg font-semibold">
                  {t.subject}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.class} • {t.schedule}
                </p>
                <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {t.location}
                </div>
                <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-primary">
                  <DollarSign className="h-3.5 w-3.5" /> {t.budget}
                </div>
                <Button
                  size="sm"
                  className="mt-4 w-full"
                  variant="outline"
                  asChild
                >
                  <Link
                    to={`/tuition-details/${t._id}`}
                    state={{ from: location }}
                  >
                    View Details
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="default" asChild>
              <Link to="/tuitions">
                View All Tuitions <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="mt-2 text-muted-foreground">
              Get started in 3 simple steps
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
                  {i + 1}
                </div>
                <h3 className="font-heading text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/40">
        <div className="container mx-auto">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              Why Choose eTuitionBd
            </h2>
            <p className="mt-2 text-muted-foreground">
              The trusted platform for quality education
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="card-elevated rounded-xl border bg-card p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
