export type SiteContentField = {
  key: string;
  label: string;
  type: "text" | "textarea";
  defaultValue: string;
};

export const SITE_CONTENT_FIELDS: SiteContentField[] = [
  { key: "hero.eyebrow", label: "Hero label", type: "text", defaultValue: "Welcome to Ivory Luxe Salon" },
  { key: "hero.title_small", label: "Hero heading — small line", type: "text", defaultValue: "Your Beauty" },
  { key: "hero.title_big", label: "Hero heading — emphasis word", type: "text", defaultValue: "Elevated" },
  {
    key: "hero.description",
    label: "Hero description",
    type: "textarea",
    defaultValue:
      "Step into a space where beauty feels personal. From polished everyday looks to special-occasion transformations, Ivory Luxe Salon delivers refined beauty services designed around you.",
  },
  {
    key: "contact.address",
    label: "Address",
    type: "textarea",
    defaultValue: "M-33, Al Dana Centre, Al Maktoum Road, Al Rigga, Dubai",
  },
  { key: "contact.hours", label: "Opening hours", type: "text", defaultValue: "11:00AM to 11:00PM (Every Day)" },
  { key: "contact.phone", label: "Phone", type: "text", defaultValue: "04 566 7874" },
  { key: "contact.whatsapp", label: "WhatsApp number", type: "text", defaultValue: "+971 52 986 6033" },
  { key: "contact.email", label: "Email", type: "text", defaultValue: "booking@theivoryluxe.com" },
];
