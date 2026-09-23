import { cn } from "@/lib/utils";

export function OrbitalMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full max-w-[420px]", className)} aria-hidden>
      <div className="absolute inset-[38%] rounded-full bg-lime shadow-[0_0_48px_rgba(107,182,52,0.65)]" />
      <div className="absolute inset-[8%] rounded-full border border-lime/80 [animation:spin_22s_linear_infinite]" />
      <div className="absolute inset-[18%] rounded-full border border-lime/50 [animation:spin_16s_linear_infinite] [animation-direction:reverse]" />
      <div className="absolute inset-[28%] rounded-full border border-white/30 [animation:spin_28s_linear_infinite]" />
      <span className="absolute left-[16%] top-[18%] grid h-8 w-8 place-items-center rounded-full bg-[#e7f6d4] text-xs font-bold text-forest">
        A
      </span>
      <span className="absolute right-[14%] top-[30%] grid h-8 w-8 place-items-center rounded-full bg-[#e7f6d4] text-xs font-bold text-forest">
        C
      </span>
      <span className="absolute bottom-[16%] left-[42%] grid h-8 w-8 place-items-center rounded-full bg-[#e7f6d4] text-xs font-bold text-forest">
        I
      </span>
    </div>
  );
}
