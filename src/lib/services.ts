export const serviceLinks = [
  { href: "/services/hair", label: "Hair Cut & Treatments" },
  { href: "/services/nails", label: "Nails Extension" },
  { href: "/services/lashes", label: "Lashes Extension" },
];

export type ServiceItem = { name: string; price: string };
export type ServiceCategory = { title: string; description: string; items: ServiceItem[] };

export const hairMenu: ServiceCategory[] = [
  {
    title: "Ladies Hair Care & Styling",
    description:
      "Transform your look with expertly crafted haircuts, relaxing shampoo and head massages, and flawless blow-dry or styling tailored just for you.",
    items: [
      { name: "Hair Styling (Blowdry / Straightening / Curls)", price: "from AED 30" },
      { name: "Hair Wash w/ Head Massage & Blowdry", price: "from AED 45" },
      { name: "Wash, Haircut & Blowdry", price: "from AED 60" },
    ],
  },
  {
    title: "Framesi Morphosis Therapy",
    description:
      "Experience luxury Italian hair and scalp care powered by Framesi Morphosis. Advanced rituals designed to deeply detoxify the scalp, intensely repair damaged strands, and restore radiant, healthy hair.",
    items: [
      { name: "Framesi Morphosis Organic Restructure Filler Therapy", price: "from AED 200" },
      { name: "Framesi Morphosis Ultimate Hair Care Therapy", price: "from AED 200" },
      { name: "Framesi Morphosis Scalp Detox & Cleansing Therapy", price: "from AED 250" },
    ],
  },
  {
    title: "Hair Smoothing & Restructuring",
    description:
      "Rejuvenate your hair with customized treatments, bond repairs, and advanced hydration therapy to nourish and restore your locks.",
    items: [
      { name: "Nano Hydration Therapy", price: "AED 80" },
      { name: "Hair Protein Treatment", price: "from AED 300" },
      { name: "Hair Botox Treatment", price: "from AED 200" },
      { name: "Soft Rebonding Treatment", price: "from AED 350" },
      { name: "Keratin Treatment", price: "from AED 400" },
    ],
  },
  {
    title: "Ladies' Color & Technical",
    description:
      "Experience premium hair coloring and technical transformations such as Balayage, highlights, full color, rebonding, and perms, all executed with the utmost care to enhance and protect your hair.",
    items: [
      { name: "Roots Color", price: "from AED 150" },
      { name: "Full Hair Color", price: "from AED 300" },
      { name: "Hair Rebonding / Straightening", price: "from AED 300" },
      { name: "Korean Perm (C-Curl / S-Curl / Wave)", price: "from AED 300" },
      { name: "Baby Highlights", price: "from AED 400" },
      { name: "Balayage / Ombré", price: "from AED 450" },
    ],
  },
  {
    title: "Hair Extensions & Customization",
    description:
      "Transform your look with our premium, seamless hair extensions. Custom-blended for natural length, instant volume, and flawless integration.",
    items: [
      { name: "Hair Extensions", price: "from AED 300" },
      { name: "Hair Extension w/ Color", price: "from AED 700" },
    ],
  },
  {
    title: "Braids & Locks",
    description:
      "Express your style with precision braiding and dreadlock services tailored for a clean, stylish, and long-lasting finish.",
    items: [
      { name: "Braids", price: "from AED 100" },
      { name: "Dreadlocks", price: "from AED 400" },
    ],
  },
  {
    title: "Gentlemen's Grooming",
    description:
      "Tailored haircuts, hair coloring, perms, and refreshing head massages crafted specifically for men's style and grooming needs.",
    items: [
      { name: "Hair Wash w/ Head Massage & Styling", price: "from AED 40" },
      { name: "Wash, Haircut & Styling", price: "from AED 50" },
      { name: "Hair Color", price: "from AED 200" },
      { name: "Hair Perm", price: "from AED 200" },
    ],
  },
];

export const lashesMenu: ServiceCategory[] = [
  {
    title: "Russian Lashes & Volume",
    description:
      "Customized eyelash extensions using ultra-light Russian volume techniques for lightweight, dramatic, or natural-looking eyes.",
    items: [
      { name: "Lashes Refills (Infills)", price: "from AED 30" },
      { name: "Lashes Removal", price: "AED 30" },
      { name: "Lifting", price: "AED 60" },
      { name: "Natural Classic (Doll, Cateyes)", price: "AED 130" },
      { name: "Medium Volume", price: "from AED 150" },
      { name: "Specialty Lashes", price: "from AED 150" },
      { name: "Mega Volume", price: "from AED 180" },
    ],
  },
];

export const nailsMenu: ServiceCategory[] = [
  {
    title: "Nail Extensions & Add-ons",
    description:
      "Enhance your nails with custom extensions, specialized art, and professional maintenance for durable, gorgeous results.",
    items: [
      { name: "Nail Art & Custom Designs", price: "from AED 20" },
      { name: "Nail Extension & Gel Removal", price: "from AED 20" },
      { name: "Hard Gel & Extension Refill (Infill)", price: "from AED 60" },
      { name: "Soft Gel Extensions", price: "from AED 150" },
      { name: "Hard Gel Extension", price: "from AED 180" },
      { name: "Acrylic Extension", price: "from AED 190" },
    ],
  },
  {
    title: "Classic Natural Nail Care",
    description:
      "Indulge in expert manicure and pedicure techniques that ensure meticulous cuticle care, flawless gel polish, and beautiful natural nail overlays for enduring elegance.",
    items: [
      { name: "Classic Manicure", price: "from AED 40" },
      { name: "Classic Pedicure", price: "from AED 40" },
      { name: "Classic Gel Manicure", price: "from AED 60" },
      { name: "Classic Gel Pedicure", price: "from AED 60" },
      { name: "Classic Gel Manicure (Premium)", price: "from AED 70" },
      { name: "Classic Gel Pedicure (Premium)", price: "from AED 70" },
      { name: "Hard Gel Overlay", price: "from AED 110" },
    ],
  },
  {
    title: "Spa & Waxing Add-ons",
    description:
      "Nourishing body treatments, soothing hand/foot spas, and smooth, long-lasting waxing services for silky skin.",
    items: [
      { name: "Underarm Wax", price: "AED 30" },
      { name: "Half Arm Wax", price: "AED 40" },
      { name: "Half Leg Wax", price: "AED 40" },
      { name: "Paraffin Wax Treatment", price: "AED 40" },
      { name: "Full Arm Wax", price: "AED 60" },
      { name: "Full Leg Wax", price: "AED 60" },
      { name: "Hand Spa w/ Mask", price: "AED 80" },
      { name: "Foot Spa w/ Mask", price: "AED 85" },
    ],
  },
];
