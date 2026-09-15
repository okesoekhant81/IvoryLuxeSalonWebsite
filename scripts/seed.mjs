import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const hairMenu = [
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

const lashesMenu = [
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

const nailsMenu = [
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

async function seedMenu(page, categories) {
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const { data: category, error } = await supabase
      .from("ServiceCategory")
      .insert({
        id: crypto.randomUUID(),
        page,
        title: cat.title,
        description: cat.description,
        order: i,
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;

    const items = cat.items.map((item, j) => ({
      id: crypto.randomUUID(),
      categoryId: category.id,
      name: item.name,
      price: item.price,
      order: j,
    }));
    const { error: itemsError } = await supabase.from("ServiceItem").insert(items);
    if (itemsError) throw itemsError;

    console.log(`  + ${page}: ${cat.title} (${items.length} items)`);
  }
}

async function main() {
  const { count: existingCategories } = await supabase
    .from("ServiceCategory")
    .select("*", { count: "exact", head: true });

  if (existingCategories > 0) {
    console.log(`ServiceCategory already has ${existingCategories} rows — skipping menu seed.`);
  } else {
    console.log("Seeding service menu...");
    await seedMenu("hair", hairMenu);
    await seedMenu("nails", nailsMenu);
    await seedMenu("lashes", lashesMenu);
  }

  const { count: existingTestimonials } = await supabase
    .from("Testimonial")
    .select("*", { count: "exact", head: true });

  if (existingTestimonials > 0) {
    console.log(`Testimonial already has ${existingTestimonials} rows — skipping testimonial seed.`);
  } else {
    console.log("Seeding testimonial...");
    const { error } = await supabase.from("Testimonial").insert({
      id: crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
      name: "Win Eaindra Aung",
      rating: 5,
      body: "I recently visited Ivory Luxe Salon for hair coloring and a scalp treatment, and the experience exceeded my expectations. I simply showed the color I had in mind, and the stylist brought it to life in a way that was even better than I imagined. His knowledge of products and ability to customize the color truly stood out.\n\nThe entire team was incredibly patient, attentive, and genuinely focused on making sure I was comfortable throughout the process. You can feel the care in every step. I also highly recommend their scalp treatment, it's both relaxing and effective.\n\nOverall, a solid 10/10 experience. Definitely a place I'd return to and recommend to anyone looking for quality hair care.",
      avatarUrl: null,
      published: true,
      order: 0,
    });
    if (error) throw error;
  }

  const { count: existingUsers } = await supabase.from("User").select("*", { count: "exact", head: true });

  if (existingUsers > 0) {
    console.log(`User already has ${existingUsers} rows — skipping admin user seed.`);
  } else {
    const username = process.env.SEED_ADMIN_USERNAME || "admin";
    const password = process.env.SEED_ADMIN_PASSWORD || crypto.randomBytes(9).toString("base64url");
    const name = process.env.SEED_ADMIN_NAME || "Admin";

    const hashed = await bcrypt.hash(password, 10);
    const { error } = await supabase.from("User").insert({ id: crypto.randomUUID(), username, password: hashed, name, role: "admin" });
    if (error) throw error;

    console.log("\nCreated initial admin user:");
    console.log(`  username: ${username}`);
    console.log(`  password: ${password}`);
    console.log("  (change this after first login — see /admin/users)\n");
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
