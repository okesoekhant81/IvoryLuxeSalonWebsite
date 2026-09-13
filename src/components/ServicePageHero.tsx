import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export default function ServicePageHero({
  image,
  alt,
  eyebrow,
  title,
}: {
  image: StaticImageData;
  alt: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="relative h-[320px] w-full overflow-hidden md:h-[420px]">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover object-bottom" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="mx-auto w-full max-w-6xl px-6 pb-8 md:px-10 md:pb-12">
          <Link
            href="/#services"
            className="inline-block font-serif-italic text-sm text-white/80 underline decoration-1 underline-offset-4 transition-opacity duration-300 ease-out hover:opacity-70"
          >
            ← Back to Services
          </Link>
          <p className="mt-4 font-sans text-lg font-normal text-white/85 md:text-xl">{eyebrow}</p>
          <h1 className="font-serif-italic text-4xl leading-tight text-white md:text-6xl">{title}</h1>
        </div>
      </div>
    </section>
  );
}
