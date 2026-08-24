import { SkillsInterface } from "@/config/skills";
import { cn } from "@/lib/utils";

interface SkillsCardProps {
  skills: SkillsInterface[];
}

const accentStyles: Record<
  SkillsInterface["accent"],
  {
    card: string;
    icon: string;
    chip: string;
    line: string;
  }
> = {
  sky: {
    card: "border-sky-200/70 bg-sky-50/70 dark:border-sky-900/60 dark:bg-sky-950/20",
    icon: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    chip: "border-sky-200 bg-white/80 text-sky-900 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-100",
    line: "bg-sky-500",
  },
  emerald: {
    card: "border-emerald-200/70 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/20",
    icon:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    chip:
      "border-emerald-200 bg-white/80 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100",
    line: "bg-emerald-500",
  },
  violet: {
    card: "border-violet-200/70 bg-violet-50/70 dark:border-violet-900/60 dark:bg-violet-950/20",
    icon:
      "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    chip:
      "border-violet-200 bg-white/80 text-violet-900 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-100",
    line: "bg-violet-500",
  },
  amber: {
    card: "border-amber-200/70 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/20",
    icon:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    chip:
      "border-amber-200 bg-white/80 text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100",
    line: "bg-amber-500",
  },
  rose: {
    card: "border-rose-200/70 bg-rose-50/70 dark:border-rose-900/60 dark:bg-rose-950/20",
    icon: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    chip:
      "border-rose-200 bg-white/80 text-rose-900 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-100",
    line: "bg-rose-500",
  },
  cyan: {
    card: "border-cyan-200/70 bg-cyan-50/70 dark:border-cyan-900/60 dark:bg-cyan-950/20",
    icon: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
    chip:
      "border-cyan-200 bg-white/80 text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-100",
    line: "bg-cyan-500",
  },
  slate: {
    card: "border-slate-200/80 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/30",
    icon:
      "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200",
    chip:
      "border-slate-200 bg-white/80 text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100",
    line: "bg-slate-500",
  },
};

export default function SkillsCard({ skills }: SkillsCardProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        {skills.map((skill) => {
          const Icon = skill.icon;
          const styles = accentStyles[skill.accent];

          return (
            <section
              key={skill.name}
              className={cn(
                "group relative overflow-hidden rounded-lg border p-5 transition-all hover:-translate-y-1 hover:shadow-md",
                styles.card
              )}
            >
              <div
                className={cn(
                  "absolute left-0 top-0 h-full w-1",
                  styles.line
                )}
              />
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-md",
                    styles.icon
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-xl leading-tight">
                    {skill.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {skill.skills.map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium",
                      styles.chip
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
