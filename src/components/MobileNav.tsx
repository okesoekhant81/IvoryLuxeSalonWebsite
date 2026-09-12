export default function MobileNav() {
  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-around rounded-[10px] border border-black/5 bg-white py-4 shadow-[0px_1px_10px_0px_rgba(0,0,0,0.15)] md:hidden">
      <a href="#home" className="flex flex-col items-center gap-1 text-sm text-black">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Home
      </a>
      <a href="#services" className="text-sm text-black/60">
        Service
      </a>
      <a href="#booking" className="text-sm text-black/60">
        Booking
      </a>
    </nav>
  );
}
