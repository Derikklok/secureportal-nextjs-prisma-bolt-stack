import FeatureSection from "./home-page-components/feature-section/feature-section";
import FooterSection from "./home-page-components/footer-section/footer-section";
import NavBarHeader from "./home-page-components/header/header";
import HeroSection from "./home-page-components/hero-section/hero-section";

export default function Home() {
  return (
    <main>
      <NavBarHeader />
      <HeroSection />
      <FeatureSection />
      <FooterSection />
    </main>
  );
}
