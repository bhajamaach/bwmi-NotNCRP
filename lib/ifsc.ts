export interface BankBranch {
  bankCode: string;
  bankName: string;
  branch: string;
  city: string;
  state: string;
  /** Direct branch phone number, when the directory has one on file for this branch. */
  contact?: string;
}

const ifscPattern = /^[A-Za-z]{4}0[A-Z0-9]{6}$/;

export function isValidIfsc(code: string) {
  return ifscPattern.test(code.trim());
}

/**
 * Looks up a real bank branch by IFSC code against Razorpay's public IFSC
 * directory (https://ifsc.razorpay.com) — a live, unauthenticated, read-only
 * API. Only branch/bank identity is fetched; no account or transaction data
 * ever leaves the browser.
 */
export async function lookupIfsc(code: string): Promise<BankBranch> {
  const trimmed = code.trim().toUpperCase();
  if (!isValidIfsc(trimmed)) {
    throw new Error("That doesn't look like a valid IFSC code (4 letters, a 0, then 6 more characters).");
  }
  const response = await fetch(`https://ifsc.razorpay.com/${trimmed}`);
  if (!response.ok) {
    throw new Error("No branch found for that IFSC code.");
  }
  const data = await response.json();
  return {
    bankCode: data.BANKCODE,
    bankName: data.BANK,
    branch: data.BRANCH,
    city: data.CITY,
    state: data.STATE,
    contact: typeof data.CONTACT === "string" && data.CONTACT.trim() ? data.CONTACT.trim() : undefined
  };
}
