import {
  IconAlertTriangle,
  IconArrowRight,
  IconBuildingBank,
  IconCheck,
  IconClock,
  IconFile,
  IconFingerprint,
  IconIdBadge2,
  IconLock,
  IconLockOpen,
  IconPhone,
  IconSearch,
  IconShieldCheck,
  IconUpload,
  IconUser,
  IconVideo,
  type Icon as TablerIcon
} from "@tabler/icons-react";

type IconName =
  | "alert"
  | "arrow"
  | "bank"
  | "check"
  | "clock"
  | "file"
  | "fingerprint"
  | "id"
  | "lock"
  | "unlock"
  | "phone"
  | "search"
  | "shield"
  | "upload"
  | "user"
  | "video";

const icons: Record<IconName, TablerIcon> = {
  alert: IconAlertTriangle,
  arrow: IconArrowRight,
  bank: IconBuildingBank,
  check: IconCheck,
  clock: IconClock,
  file: IconFile,
  fingerprint: IconFingerprint,
  id: IconIdBadge2,
  lock: IconLock,
  unlock: IconLockOpen,
  phone: IconPhone,
  search: IconSearch,
  shield: IconShieldCheck,
  upload: IconUpload,
  user: IconUser,
  video: IconVideo
};

export function Icon({ name, className = "h-5 w-5", label }: { name: IconName; className?: string; label?: string }) {
  const TablerIconComponent = icons[name];
  return (
    <TablerIconComponent
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={className}
      role={label ? "img" : undefined}
      stroke={1.8}
    />
  );
}
