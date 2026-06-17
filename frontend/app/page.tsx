import VideoBackground from '@/components/VideoBackground';
import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <VideoBackground />

      {/* Content scrolls over the video */}
      <div className="relative z-10">
        <SiteHeader overlay />
        <Hero />
        <Footer />
      </div>
    </main>
  );
}
