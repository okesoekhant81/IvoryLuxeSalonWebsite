import Link from "next/link";
import { OutlineCta } from "./Button";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-black/5 bg-white/90 backdrop-blur-sm transition-shadow duration-300 md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="#home" className="font-serif-italic text-xl text-black">
          Ivory Luxe Salon
        </Link>
        <nav className="flex items-center gap-8 text-sm text-black/70">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors duration-300 hover:text-brown after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brown after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <OutlineCta href="#booking">Book Your Appointment</OutlineCta>
      </div>
    </header>
  );
}
