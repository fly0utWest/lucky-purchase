import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  iconColor?: string;
  className?: string;
}

export function AnimatedCard({
  icon: Icon,
  title,
  description,
  index = 0,
  iconColor = "text-primary",
  className = "",
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`rounded-xl bg-card p-6 shadow-sm ${className}`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}
