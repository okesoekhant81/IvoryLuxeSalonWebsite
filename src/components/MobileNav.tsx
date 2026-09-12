const items = [
  {
    href: "#home",
    label: "Home",
    icon: (
      <>
        <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    href: "#services",
    label: "Service",
    icon: (
      <>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <path d="M8.5 7.5 20 18M20 6 8.5 16.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    href: "https://wa.me/971529866033",
    label: "Booking",
    external: true,
    icon: (
      <>
        <rect x="4" y="5.5" width="16" height="15" rx="2" />
        <path d="M4 10h16M8 3.5v3M16 3.5v3" strokeLinecap="round" />
      </>
    ),
  },
];

export default function MobileNav() {
  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-around rounded-full border border-white/50 bg-white/50 py-3 shadow-[0px_8px_30px_0px_rgba(0,0,0,0.12)] backdrop-blur-xl backdrop-saturate-150 md:hidden">
      {items.map((item, index) => (
        <a
          key={item.href}
          href={item.href}
          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`flex flex-col items-center gap-1 px-4 text-xs transition-colors duration-300 hover:text-brown ${
            index === 0 ? "text-black" : "text-black/60"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {item.icon}
          </svg>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
