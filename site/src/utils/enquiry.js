import { business } from "../data/business.js";

export function whatsappUrl(message = "") {
  const number = business.telephone.replace(/\D/g, "");
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function divisionEnquiryUrl(division) {
  return whatsappUrl(`Hello J&O Farm Produce! I’m interested in ${division.interest}. Please help me with availability, pricing and delivery.`);
}

// The same item can appear in several groups (Grower feed for poultry and for pigs),
// so a pick is identified by its division, group and item together.
export function makePick(divisionId, division, group, item) {
  return { id: `${divisionId}/${group.title}/${item}`, division: division.interest, group: group.title, item };
}

export function describePicks(picks) {
  const byDivision = new Map();
  for (const pick of picks) {
    byDivision.set(pick.division, [...(byDivision.get(pick.division) ?? []), `• ${pick.group}: ${pick.item}`]);
  }
  return [...byDivision].map(([division, lines]) => `${division}\n${lines.join("\n")}`).join("\n\n");
}

export function listEnquiryUrl(picks) {
  return whatsappUrl(`Hello J&O Farm Produce! I’d like to ask about:\n\n${describePicks(picks)}\n\nPlease let me know availability, prices and delivery.`);
}
