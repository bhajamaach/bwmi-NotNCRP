import { demoUsers } from "@/lib/seed-data";

export function findDemoUserByMobile(mobile: string) {
  return demoUsers.find((user) => user.mobile === mobile.trim());
}

export function isValidDemoMobile(mobile: string) {
  return /^\d{10}$/.test(mobile.trim()) && Boolean(findDemoUserByMobile(mobile));
}

export function isValidOtp(otp: string) {
  return /^\d{6}$/.test(otp.trim());
}
