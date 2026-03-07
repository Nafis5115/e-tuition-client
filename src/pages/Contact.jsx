import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => (
  <div className="section-padding">
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-center text-3xl font-bold md:text-4xl">Contact Us</h1>
      <p className="mt-2 text-center text-muted-foreground">
        Have a question? We'd love to hear from you.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="card-elevated rounded-xl border bg-card p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="c-name">Name</Label>
            <Input id="c-name" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-email">Email</Label>
            <Input id="c-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-subject">Subject</Label>
            <Input id="c-subject" placeholder="How can we help?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-message">Message</Label>
            <Textarea id="c-message" placeholder="Your message..." rows={5} />
          </div>
          <Button className="w-full">Send Message</Button>
        </div>

        <div className="space-y-6">
          {[
            { icon: Mail, label: "Email", value: "support@etuitionbd.com" },
            { icon: Phone, label: "Phone", value: "+880 1700-000000" },
            { icon: MapPin, label: "Address", value: "Dhaka, Bangladesh" },
          ].map((c, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold">{c.label}</p>
                <p className="text-sm text-muted-foreground">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ContactPage;
