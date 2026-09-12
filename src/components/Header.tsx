import Link from "next/link";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 hidden md:block bg-white/90 backdrop-blur-sm border-b border-black/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="#home" className="font-serif-italic text-xl text-black">
          Ivory Luxe Salon
        </Link>
        <nav className="flex items-center gap-8 text-sm text-black/70">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-brown">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#booking"
          className="font-serif-italic rounded-full border border-brown px-5 py-2 text-sm text-brown transition-colors hover:bg-brown hover:text-white"
        >
          Book Your Appointment
        </a>
      </div>
    </header>
  );
}
