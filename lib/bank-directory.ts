/**
 * A picker list of major Indian banks (code + display name), for when a citizen
 * doesn't have an IFSC code handy and just wants to say "my bank is X."
 *
 * `helpline` is only set where the number is well-established and widely
 * published (the kind printed on the bank's own site and cards) — it's
 * deliberately left unset rather than guessed for banks where we're not
 * confident of the exact digits, since a wrong number here is a real-world
 * failure, not a cosmetic one. Banks without a helpline still work: the branch
 * IFSC lookup's live `CONTACT` field is tried first regardless.
 */
export interface BankDirectoryEntry {
  code: string;
  name: string;
  helpline?: string;
}

export const bankDirectory: BankDirectoryEntry[] = [
  { code: "SBIN", name: "State Bank of India", helpline: "1800-1234" },
  { code: "HDFC", name: "HDFC Bank", helpline: "1800-202-6161" },
  { code: "ICIC", name: "ICICI Bank", helpline: "1860-120-7777" },
  { code: "UTIB", name: "Axis Bank", helpline: "1860-419-5555" },
  { code: "PUNB", name: "Punjab National Bank", helpline: "1800-180-2222" },
  { code: "KKBK", name: "Kotak Mahindra Bank", helpline: "1860-266-2666" },
  { code: "BARB", name: "Bank of Baroda", helpline: "1800-258-4455" },
  { code: "CNRB", name: "Canara Bank" },
  { code: "UBIN", name: "Union Bank of India" },
  { code: "IDIB", name: "Indian Bank" },
  { code: "YESB", name: "Yes Bank" },
  { code: "INDB", name: "IndusInd Bank" },
  { code: "FDRL", name: "Federal Bank" },
  { code: "IDFB", name: "IDFC FIRST Bank" },
  { code: "RATN", name: "RBL Bank" },
  { code: "BDBL", name: "Bandhan Bank" }
];

export function nationalHelplineFor(bankCode: string) {
  return bankDirectory.find((entry) => entry.code === bankCode)?.helpline;
}

export function bankDirectoryEntry(bankCode: string) {
  return bankDirectory.find((entry) => entry.code === bankCode);
}
