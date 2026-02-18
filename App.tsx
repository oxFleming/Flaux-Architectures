import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import ProjectGallery from './components/ProjectGallery';
import LeadForm from './components/LeadForm';
import Studio from './components/Studio';
import Team from './components/Team';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';

function App() {
  return (
    <div className="bg-white min-h-screen text-foreground selection:bg-flaux-red selection:text-white font-sans">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Studio />
        <Team />
        <ProjectGallery />
        <Testimonials />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;