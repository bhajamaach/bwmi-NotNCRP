export const slaConfig: Record<string, { hours: number; label: string }> = {
  "Financial Fraud": {
    hours: 72,
    label: "Illustrative SLA: first visible action expected within 72 hours"
  },
  "Women / Child Safety": {
    hours: 48,
    label: "Illustrative SLA: priority review expected within 48 hours"
  },
  "Account or Device Compromise": {
    hours: 96,
    label: "Illustrative SLA: technical review expected within 4 days"
  },
  "Harassment or Impersonation": {
    hours: 120,
    label: "Illustrative SLA: review expected within 5 days"
  },
  "Other Cybercrime": {
    hours: 120,
    label: "Illustrative SLA: review expected within 5 days"
  }
};

export function getSlaForCategory(category: string) {
  return slaConfig[category] ?? slaConfig["Other Cybercrime"];
}

export function buildSlaDeadline(category: string, createdAt: Date) {
  const sla = getSlaForCategory(category);
  return new Date(createdAt.getTime() + sla.hours * 60 * 60 * 1000).toISOString();
}
