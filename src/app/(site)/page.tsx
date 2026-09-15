import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Visit from "@/components/Visit";
import Reveal from "@/components/Reveal";

// CMS edits invalidate this page immediately via revalidatePath() on save;
// this is just a safety net for anything that misses that.
export const revalidate = 300;

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <Services />
      </Reveal>
      <Reveal>
        <Experience />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <Visit />
      </Reveal>
    </>
  );
}
