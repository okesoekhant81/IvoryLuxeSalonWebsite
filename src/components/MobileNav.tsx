import Link from "next/link";

const homeIcon = (
  <>
    <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

const hairIcon = (
  <>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M8.5 7.5 20 18M20 6 8.5 16.5" strokeLinecap="round" />
  </>
);

const nailsIcon = (
  <>
    <rect x="8" y="10" width="8" height="10" rx="1.5" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" strokeLinecap="round" />
    <rect x="10" y="4" width="4" height="3" rx="0.5" />
  </>
);

const lashesIcon = (
  <>
    <path d="M2 12c2.5-4 6-6 10-6s7.5 2 10 6c-2.5 4-6 6-10 6s-7.5-2-10-6Z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 6 5 4M10 4.5l-.5-2M14 4.5l.5-2M18 6l1-2" strokeLinecap="round" />
  </>
);

const bookingIcon = (
  <>
    <rect x="4" y="5.5" width="16" height="15" rx="2" />
    <path d="M4 10h16M8 3.5v3M16 3.5v3" strokeLinecap="round" />
  </>
);

export default function MobileNav() {
  const items = [
    { href: "/#home", label: "Home", icon: homeIcon },
    { href: "/services/hair", label: "Hair", icon: hairIcon },
    { href: "/services/nails", label: "Nails", icon: nailsIcon },
    { href: "/services/lashes", label: "Lashes", icon: lashesIcon },
    { href: "/book", label: "Booking", icon: bookingIcon },
  ];

  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-around rounded-full border border-white/50 bg-white/50 py-3 shadow-[0px_8px_30px_0px_rgba(0,0,0,0.12)] backdrop-blur-xl backdrop-saturate-150 md:hidden">
      {items.map((item, index) => {
        const className = `px-3 py-1 transition-colors duration-300 hover:text-brown ${
          index === 0 ? "text-black" : "text-black/60"
        }`;
        const iconSvg = (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {item.icon}
          </svg>
        );
        return (
          <Link key={item.href} href={item.href} aria-label={item.label} className={className}>
            {iconSvg}
          </Link>
        );
      })}
    </nav>
  );
}
