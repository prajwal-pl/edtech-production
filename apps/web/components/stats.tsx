import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

export function Stats() {
  const stats: Stat[] = [
    {
      value: "97%",
      label: "Satisfaction Rate",
    },
    {
      value: "10K+",
      label: "Active Learners",
    },
    {
      value: "500+",
      label: "Courses Available",
    },
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-white/10 blur-xl opacity-70"></div>
                <h3 className="text-4xl md:text-5xl font-bold mb-2 relative">
                  {stat.value}
                </h3>
              </div>
              <p className="text-primary-foreground/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
