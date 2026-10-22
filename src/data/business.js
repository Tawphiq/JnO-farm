// Business details used on the page and in search results (see scripts/prerender.mjs).
// Leave a field empty until J&O confirms it: empty fields are not shown anywhere.
export const business = {
  name: "J&O Farm Produce Ltd",
  legalName: "Joseph & Owura Farm Produce Ltd",
  telephone: "+233243503083",
  email: "",
  // The live address, e.g. "https://www.example.com.gh". Enables the canonical URL,
  // the share image in link previews, and sitemap.xml. SITE_URL at build time overrides it.
  siteUrl: "",
  address: { locality: "Ankwensu", region: "Eastern Region", country: "GH" },
  founders: [
    { name: "Joseph Ocloo" },
    { name: "Edward Appiah-Dwomoh", alternateName: "Owura" },
  ],
  // Shown to bulk buyers in the supply section, e.g.
  // { label: "Company registration", value: "CS123456789" },
  // { label: "Fertilizer registration", value: "…" },
  // { label: "Established", value: "2015" },
  credentials: [],
};
