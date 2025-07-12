import HeroSection from "@/components/sections/HeroSection";
import StacksSection from "@/components/sections/StacksSection";
import WorkSection from "@/components/sections/WorkSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black w-full flex flex-col items-center">
      <section id="hero" className="h-screen w-full overflow-visible">
        <HeroSection />
      </section>
      {/* Added mt-32 for mobile and mt-48 for medium screens to create more space */}
      <section id="stacks" className="min-h-screen w-full max-w-7xl mx-auto px-4 mt-32 md:mt-48">
        <StacksSection />
      </section>
      <section id="work" className="min-h-screen w-full max-w-7xl mx-auto px-4">
        <WorkSection />
      </section>
      <section id="blog" className="min-h-screen w-full max-w-7xl mx-auto px-4">
        <BlogSection />
      </section>
      <section id="contact" className="min-h-screen w-full max-w-7xl mx-auto px-4">
        <ContactSection />
      </section>
    </main>
  );
}
