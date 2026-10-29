// Each key is where the photo appears. Entries with a Pexels id are stock photography,
// illustrative of agriculture rather than J&O premises or staff. J&O's own photos are
// added with scripts/add-photo.mjs and marked `own: true` (no id or slug needed).
// Photos of people are kept away from copy about the J&O team, so no one is presented
// as a founder, staff member or customer.
export const photography = {
  hero: { file: "golden-pasture", id: 36374911, slug: "pastoral-landscape-with-grazing-herds-in-golden-sunset", alt: "Cattle and sheep grazing beneath a broad tree in hazy golden light", large: true, position: "50% 62%" },
  livestock: { file: "long-horn-cattle", id: 17831709, slug: "herds-of-cows-in-a-meadow", alt: "Long-horned cattle grazing in a grassy meadow", position: "60% 50%" },
  aquaculture: { file: "fish-farm", id: 28738439, slug: "traditional-fish-farming-in-tranquil-waters", alt: "Aerial view of floating fish-farm pens on a calm lake below dry hills" },
  crops: { file: "peppers-carrots", id: 33624070, slug: "fresh-vegetables-at-local-jos-market", alt: "Red, yellow and green bell peppers with fresh carrots in a market tray" },
  feed: { file: "poultry-house", id: 2253583, slug: "industrial-chicken-farm", alt: "White broiler chickens crowding a poultry house", position: "50% 70%" },
  fertilizer: { file: "fertilizer-granules", id: 31673795, slug: "hands-holding-granular-fertilizer-outdoors", alt: "Cupped hands holding granular fertilizer" },
  consultancy: { file: "greenhouse", id: 36937772, slug: "man-inspecting-plants-in-a-zaria-greenhouse", alt: "A grower inspecting rows of young plants inside a greenhouse" },
  order: { file: "phone-in-field", id: 31885830, slug: "man-outdoors-using-smartphone-in-abuja-nigeria", alt: "A man in a cap reading a message on his phone at the edge of a field", position: "50% 35%" },
  bulk: { file: "palm-plantation", id: 3246159, slug: "coconut-trees", alt: "Aerial view of a palm plantation beside a road", large: true },
  about: { file: "maize-cob", id: 3307282, slug: "person-holding-corn-from-its-tree", alt: "A hand holding a ripe maize cob in a sunlit field" },
  aboutDetail: { file: "piglets", id: 27167732, slug: "piglets-at-farm", alt: "Three young pigs standing on fresh grass" },
  market: { file: "maize-market", id: 36392326, slug: "women-selling-corn-at-accra-market", alt: "Two women selling dried maize at an outdoor market" },
  tilapia: { file: "tilapia", id: 15553656, slug: "stack-of-fresh-fish-at-market", alt: "Fresh tilapia stacked closely together" },
  cashew: { file: "raw-cashew", id: 12717147, slug: "brown-unpeeled-cashew-nuts-in-close-up-photography", alt: "A pile of raw, unshelled cashew nuts" },
  goats: { file: "goats", id: 29755332, slug: "close-up-portrait-of-african-goats-in-barn", alt: "Two goats looking out from a warm, shaded barn" },
  dusk: { file: "fish-farm-dusk", id: 37052302, slug: "fisherman-working-at-fish-farm-during-sunset", alt: "A fish farmer working on floating pens at dusk" },
};

export const stockPhotos = Object.values(photography).filter((photo) => !photo.own);

export function photoSource(photo) {
  return `https://www.pexels.com/photo/${photo.slug}-${photo.id}/`;
}
