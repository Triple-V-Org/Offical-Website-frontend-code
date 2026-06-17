'use client';

import { useState } from 'react';
import VideoBackground from '@/components/VideoBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SignupModal from '@/components/SignupModal';

export default function Home() {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      <VideoBackground />

      {/* Content scrolls over the fixed, graded video */}
      <div className="relative z-10">
        <Header onSignup={() => setSignupOpen(true)} />
        <Hero />
        <Footer />
      </div>

      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
    </main>
  );
}
