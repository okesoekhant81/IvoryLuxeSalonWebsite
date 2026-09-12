export default function Footer() {
  return (
    <footer className="mt-20 border-t border-black/5 bg-white pb-24 pt-10 md:mt-28 md:pb-10">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <span className="font-serif-italic text-lg text-black">Ivory Luxe Salon</span>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <a href="#home" className="hover:text-brown">Home</a>
            <a href="#services" className="hover:text-brown">Services</a>
            <a href="#experience" className="hover:text-brown">Experience</a>
            <a href="#testimonials" className="hover:text-brown">Reviews</a>
            <a href="#visit" className="hover:text-brown">Visit</a>
          </nav>
        </div>
        <p className="mt-8 text-xs text-muted">
          &copy; {new Date().getFullYear()} Ivory Luxe Salon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
