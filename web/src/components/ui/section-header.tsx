interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
