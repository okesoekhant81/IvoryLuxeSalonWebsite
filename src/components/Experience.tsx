import Image from "next/image";
import experienceImg from "../../public/images/experience.png";
import Heading from "./Heading";

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
      <section id="experience" className="scroll-mt-20 bg-beige pt-16 md:pt-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="max-w-2xl">
            <Heading eyebrow="The Ivory Luxe" emphasis="Experience" />
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

      <section className="pt-16 md:pt-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Heading eyebrow="Beauty with" emphasis="Intention" />
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
