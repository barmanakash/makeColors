import Hero from '../components/Hero';
import {
  Marquee,
  Stats,
  HomeServices,
  Showcase,
  WhyUs,
  HomeProcess,
  Faq,
  HomeCta,
} from '../components/HomeSections';
import { useReveal } from '../hooks/useReveal';
import '../components/Home.css';

function HomePage() {
  const ref = useReveal();

  return (
    <main className="home" ref={ref}>
      <Hero />
      <Marquee />
      <Stats />
      <HomeServices />
      <Showcase />
      <WhyUs />
      <HomeProcess />
      <Faq />
      <HomeCta />
    </main>
  );
}

export default HomePage;
