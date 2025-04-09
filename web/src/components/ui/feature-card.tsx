import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor = "text-primary",
  className = "",
}: FeatureCardProps) {
  return (
    <div className={`rounded-xl bg-card p-6 shadow-sm ${className}`}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
