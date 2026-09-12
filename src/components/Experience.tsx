import Image from "next/image";
import experienceImg from "../../public/images/experience.png";

const features = [
  {
    title: "Personalised for You",
    body: "We listen before we begin, ensuring every service is tailored to your preferences, features and lifestyle.",
  },
  {
    title: "Detail-Driven Expertise",
    body: "Our professionals approach every appointment with care, precision and a commitment to beautiful results.",
  },
  {
    title: "A Space to Unwind",
    body: "Enjoy a calm, elegant setting where you can pause, recharge and focus on yourself.",
  },
  {
    title: "More Than a Service",
    body: "We want every guest to leave feeling seen, cared for and confidently beautiful.",
  },
];

export default function Experience() {
  return (
    <>
      <section id="experience" className="mt-20 scroll-mt-20 bg-beige py-16 md:mt-28 md:py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="max-w-2xl">
            <h2 className="font-serif-italic text-3xl leading-tight text-black md:text-5xl">
              The Ivory Luxe <span className="font-serif not-italic font-normal">Experience</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
              Your appointment should feel as beautiful as the final result. From the moment you
              arrive, our team takes the time to understand your preferences, guide you through the
              right options and create an experience centred around your comfort.
            </p>
          </div>

          <div className="group relative mx-auto mt-10 aspect-[1400/918] w-full max-w-3xl md:mt-14">
            <Image
              src={experienceImg}
              alt="The Ivory Luxe Salon team"
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <h3 className="font-serif-italic text-3xl leading-tight text-black md:text-4xl">
            Beauty with <span className="block">Intention</span>
          </h3>
          <dl className="mt-10 grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.title}>
                <dt className="font-serif-italic text-base text-black">{feature.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{feature.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
