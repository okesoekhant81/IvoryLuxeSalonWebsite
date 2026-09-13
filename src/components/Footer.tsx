import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white pb-24 pt-10 md:pb-10">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <span className="font-serif-italic text-lg text-black">Ivory Luxe Salon</span>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <Link href="/#home" className="hover:text-brown">Home</Link>
            <Link href="/#services" className="hover:text-brown">Services</Link>
            <Link href="/#experience" className="hover:text-brown">Experience</Link>
            <Link href="/#testimonials" className="hover:text-brown">Reviews</Link>
            <Link href="/#visit" className="hover:text-brown">Visit</Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-muted">
          &copy; {new Date().getFullYear()} Ivory Luxe Salon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
