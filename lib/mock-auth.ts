import type { DemoUser } from "@/lib/types";

export function findDemoUserByMobile(users: DemoUser[], mobile: string) {
  return users.find((user) => user.mobile === mobile.trim());
}

export function isValidDemoMobile(users: DemoUser[], mobile: string) {
  return /^\d{10}$/.test(mobile.trim()) && Boolean(findDemoUserByMobile(users, mobile));
}

export function isValidOtp(otp: string) {
  return /^\d{6}$/.test(otp.trim());
}
