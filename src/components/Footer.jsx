import React from "react";
import { Link } from "react-router";
import { GraduationCap } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold">eTuitionBd</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Connecting students with qualified tutors. Find the perfect match
            for your learning journey.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                to="/tuitions"
                className="hover:text-primary transition-colors"
              >
                Browse Tuitions
              </Link>
            </li>
            <li>
              <Link
                to="/tutors"
                className="hover:text-primary transition-colors"
              >
                Find Tutors
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">
            Contact Us
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>support@etuitionbd.com</li>
            <li>+880 1700-000000</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} eTuitionBd. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
