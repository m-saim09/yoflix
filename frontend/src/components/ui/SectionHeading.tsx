import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.28em]",
          inverse ? "text-sky-200" : "text-sky-600"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl",
          inverse ? "text-white" : "text-slate-950"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-5 text-base leading-7 sm:text-lg",
          inverse ? "text-slate-300" : "text-slate-600"
        )}
      >
        {description}
      </p>
    </div>
  );
}
