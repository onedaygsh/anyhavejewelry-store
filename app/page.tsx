import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Bestsellers from "@/components/Bestsellers";
import ShopByShape from "@/components/ShopByShape";
import PromoSection from "@/components/PromoSection";
import RingBuilderCTA from "@/components/RingBuilderCTA";
import CraftingMemories from "@/components/CraftingMemories";
import CollectionShowcase from "@/components/CollectionShowcase";
import TechnologySection from "@/components/TechnologySection";
import Testimonials from "@/components/Testimonials";
import Commitment from "@/components/Commitment";
import GemstoneComparison from "@/components/GemstoneComparison";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Bestsellers />
      <GemstoneComparison />
      <ShopByShape />
      <PromoSection />
      <RingBuilderCTA />
      <CraftingMemories />
      <CollectionShowcase />
      <TechnologySection />
      <Testimonials />
      <Commitment />
    </>
  );
}
