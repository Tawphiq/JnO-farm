export const catalogue = {
  livestock: {
    number: "01",
    title: "Livestock rearing",
    name: "Livestock",
    tag: "Reared on the farm",
    blurb: "Meat & breeding",
    interest: "Livestock rearing",
    intro:
      "Healthy, vaccinated livestock, reared on our integrated farm for meat and breeding stock.",
    groups: [
      {
        title: "Our livestock",
        items: ["Pigs", "Cattle", "Sheep", "Goats", "Rabbits"],
      },
      {
        title: "Meat & breeding stock",
        items: ["Meat animals", "Breeding stock"],
        text: "Speak with our team about meat animals or breeding stock, current availability, quantities and delivery.",
      },
    ],
    note: "Tell us the type of animal, your quantity and whether you need meat or breeding stock.",
  },
  aquaculture: {
    number: "02",
    title: "Aquaculture & fish farming",
    name: "Fish",
    tag: "Freshwater farming",
    blurb: "Tilapia & catfish",
    interest: "Fish farming",
    intro:
      "Tilapia and catfish for pond stocking or the table, available at different growth stages.",
    groups: [
      {
        title: "Species",
        items: ["Tilapia — Akosombo Strain", "Catfish — African Clarias"],
      },
      {
        title: "Growth stages",
        items: ["Fingerlings", "Juveniles", "Table-size"],
      },
    ],
    note: "Let us know your preferred species, growth stage, quantity and delivery location.",
  },
  crops: {
    number: "03",
    title: "Crops, vegetables & plants",
    name: "Crops & plants",
    tag: "From the soil",
    blurb: "Crops & seedlings",
    interest: "Crops, vegetables & plants",
    intro:
      "From everyday vegetables to commercial crops and the seedlings for your next season.",
    groups: [
      {
        title: "Field crops",
        items: ["Maize", "Cashew — raw cashew nuts for export", "Oil palm"],
      },
      {
        title: "Fresh vegetables",
        items: [
          "Carrots",
          "Lettuce",
          "Green bell peppers",
          "Red bell peppers",
          "Yellow bell peppers",
          "Orange bell peppers",
        ],
      },
      {
        title: "Seedlings & plants",
        items: [
          "Oil palm seedlings",
          "Cashew seedlings",
          "Vegetable seedlings",
          "Ornamental plants",
        ],
      },
    ],
    note: "Availability varies by crop and season. Contact us for current stock, quantities and prices.",
  },
  feed: {
    number: "04",
    title: "J&O Feed — our animal feed mill",
    name: "Animal feed",
    tag: "Milled by J&O",
    blurb: "Our own mill",
    interest: "J&O animal feed",
    intro:
      "We mill our own feed, with options for poultry, pigs, cattle, sheep, goats and fish.",
    groups: [
      {
        title: "Poultry",
        items: ["Broiler Starter", "Broiler Finisher", "Layer Mash", "Grower"],
      },
      {
        title: "Pigs",
        items: ["Starter", "Grower", "Finisher", "Sow & Weaner"],
      },
      {
        title: "Cattle, sheep & goats",
        items: ["Beef Fattener", "Dairy Meal", "Goat & Sheep Feed"],
      },
      {
        title: "Fish",
        items: [
          "Floating feed for tilapia & catfish",
          "Sinking feed for tilapia & catfish",
        ],
      },
      { title: "Raw materials", items: ["Maize", "Soya", "Wheat bran"] },
    ],
    note: "Tell our team which animals you feed, their growth stage and the quantity you need.",
  },
  fertilizer: {
    number: "05",
    title: "Fertilizer, imports & exports",
    name: "Fertilizer & trade",
    tag: "Supply & export",
    blurb: "Retail & bulk",
    interest: "Fertilizer, imports & exports",
    intro:
      "Fertilizer for retail and bulk orders, with bulk supply from 27 MT to 500 MT and nationwide delivery.",
    groups: [
      {
        title: "Urea 46%",
        items: ["Granular urea", "Prilled urea"],
        text: "Direct FOB Tianjin.",
      },
      { title: "NPK — all grades", items: ["15-15-15", "20-10-10", "23-10-5"] },
      { title: "Other fertilizers", items: ["MOP", "TSP", "Ammonia sulphate"] },
      {
        title: "Export produce",
        items: ["Raw cashew nuts", "Maize", "Palm products"],
      },
      {
        title: "Retail & bulk enquiries",
        text: "Discuss your grade, tonnage, delivery destination and preferred timing directly with our team.",
      },
    ],
    note: "Request a quotation for current pricing, stock, order terms and delivery arrangements.",
  },
  consultancy: {
    number: "06",
    title: "Agro-consultancy & training",
    name: "Training",
    tag: "Grow your know-how",
    blurb: "Agro-consultancy",
    interest: "Agro-consultancy & training",
    intro:
      "Connect with Joseph, Owura and the J&O team to discuss your agricultural goals.",
    groups: [
      { title: "Services", items: ["Agro-consultancy", "Training"] },
      {
        title: "A conversation about your farm",
        text: "Tell us what you are working on, the support you need, and your experience so far. Our team will discuss the relevant agro-consultancy or training options with you.",
      },
      {
        title: "Planning your enquiry",
        // Things to mention in an enquiry, not products to add to a list.
        checklist: true,
        items: [
          "Your farming interests",
          "Your location",
          "Your goals",
          "Your preferred timing",
        ],
      },
    ],
    note: "Ask our team about available training, consultation arrangements and fees.",
  },
};
