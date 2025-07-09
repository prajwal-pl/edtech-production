import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  text: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      text: "The AI tutor feature was a game-changer for me. I could get help anytime I was stuck, making my learning journey much smoother.",
      author: {
        name: "John Doe",
        role: "Software Developer",
        initials: "JD",
      },
    },
    {
      id: "2",
      text: "The career path guidance helped me identify the skills I needed to advance in my role. I've since received a promotion thanks to what I learned here.",
      author: {
        name: "Sarah Miller",
        role: "Data Analyst",
        initials: "SM",
      },
    },
    {
      id: "3",
      text: "The project-based learning approach gave me practical experience that I could immediately add to my portfolio. It made job interviews much easier.",
      author: {
        name: "Robert Johnson",
        role: "Frontend Engineer",
        initials: "RJ",
      },
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-primary/5 via-primary/10 to-background/10 relative overflow-hidden text-foreground">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground"
          >
            What Our Students Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg"
          >
            Success stories from our community of learners
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full border-border/40 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-8 relative">
                  <Quote className="absolute top-8 right-8 h-8 w-8 text-primary/10" />
                  <p className="text-foreground mb-6 relative z-10">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {testimonial.author.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.author.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
