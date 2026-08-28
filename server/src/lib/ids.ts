export function generateAckNumber() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replaceAll("-", "");
  const random = Math.floor(100000 + Math.random() * 900000);
  return `NCRP-${datePart}-${random}`;
}

export function generateComplaintId() {
  return `cmp-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function generateGrievanceId() {
  return `grm-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
