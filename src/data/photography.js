// Each key is where the photo appears. Entries with a Pexels id are stock photography,
// illustrative of agriculture rather than J&O premises or staff. J&O's own photos are
// added with scripts/add-photo.mjs and marked `own: true` (no id or slug needed).
export const photography = {
  field: { file: "maize-field", id: 96715, slug: "corn-field-during-daytime", alt: "Morning sunlight falling across a lush green maize field", large: true },
  livestock: { file: "cattle", id: 394887, slug: "cows-green-grass-field", alt: "Cattle grazing together in a green pasture", position: "center 65%" },
  aquaculture: { file: "tilapia", id: 31636077, slug: "close-up-of-fresh-tilapia-fish-in-a-basket", alt: "Fresh tilapia arranged in a woven basket" },
  crops: { file: "peppers", id: 7543205, slug: "fresh-red-bell-peppers-in-close-up-view", alt: "Fresh red bell peppers with green stems" },
  feed: { file: "maize-grain", id: 30204262, slug: "close-up-of-yellow-corn-kernels-background", alt: "Golden maize kernels, a raw material for animal feed" },
  fertilizer: { file: "seedling", id: 12969371, slug: "close-up-of-man-holding-a-seedling-in-soil-in-his-hands", alt: "Hands cupping rich soil and a young seedling" },
  consultancy: { file: "harvest", id: 40006604, slug: "gardener-harvesting-lush-green-leafy-vegetables", alt: "A gardener tending green leafy vegetables by hand" },
  palms: { file: "palms", id: 12699219, slug: "aerial-footage-of-coconut-tree-plantation", alt: "An aerial view of a lush tropical palm plantation", large: true },
  corn: { file: "corn", id: 614006, slug: "brown-and-green-corn-field", alt: "A mature maize cob growing among green and golden leaves" },
};

export const stockPhotos = Object.values(photography).filter((photo) => !photo.own);

export function photoSource(photo) {
  return `https://www.pexels.com/photo/${photo.slug}-${photo.id}/`;
}
