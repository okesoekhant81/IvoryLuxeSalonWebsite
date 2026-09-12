import Image from "next/image";
import beforeImg from "../../public/images/before-slider.png";
import afterImg from "../../public/images/after-slider.png";
import reviewerAvatar from "../../public/images/reviewer-avatar.jpg";

const review = `I recently visited Ivory Luxe Salon for hair coloring and a scalp treatment, and the experience exceeded my expectations. I simply showed the color I had in mind, and the stylist brought it to life in a way that was even better than I imagined. His knowledge of products and ability to customize the color truly stood out.

The entire team was incredibly patient, attentive, and genuinely focused on making sure I was comfortable throughout the process. You can feel the care in every step. I also highly recommend their scalp treatment, it's both relaxing and effective.

Overall, a solid 10/10 experience. Definitely a place I'd return to and recommend to anyone looking for quality hair care.`;

function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#744e39" aria-hidden>
      <path d="M12 2.5l2.9 6.4 6.9.6-5.3 4.6 1.7 6.8L12 17.6l-6.2 3.3 1.7-6.8-5.3-4.6 6.9-.6L12 2.5z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="mt-20 scroll-mt-20 md:mt-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative h-[220px] overflow-hidden rounded-2xl md:h-[300px]">
            <Image
              src={beforeImg}
              alt="Before hair transformation at Ivory Luxe Salon"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
            <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-wide text-white">
              Before
            </span>
          </div>
          <div className="relative h-[220px] overflow-hidden rounded-2xl md:h-[300px]">
            <Image
              src={afterImg}
              alt="After hair transformation at Ivory Luxe Salon"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
            <span className="absolute left-3 top-3 rounded-full bg-brown/80 px-3 py-1 text-xs uppercase tracking-wide text-white">
              After
            </span>
          </div>
        </div>

        <div className="mt-14 md:mt-20 md:grid md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <h2 className="font-serif-italic text-3xl leading-tight text-black md:text-5xl">
              Beautiful Experiences, <span className="block">Shared</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted md:text-base">
              Discover why our clients trust Ivory Luxe Salon for their beauty moments.
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <div className="flex items-center gap-3">
              <div className="relative size-10 overflow-hidden rounded-full">
                <Image src={reviewerAvatar} alt="Win Eaindra Aung" fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <p className="font-serif text-sm text-black">Win Eaindra Aung</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className="font-serif mt-5 whitespace-pre-line text-sm leading-relaxed text-black/80 md:text-base">
              {review}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
