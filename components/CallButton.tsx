import { Icon } from "@/components/Icon";

export function CallButton({ number, label }: { number: string; label?: string }) {
  return (
    <a
      aria-label={label ?? `Call ${number}`}
      className="focus-ring inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy bg-navy text-white hover:bg-navy-hover"
      href={`tel:${number.replace(/[^\d+]/g, "")}`}
    >
      <Icon className="h-4 w-4" name="phone" />
    </a>
  );
}
