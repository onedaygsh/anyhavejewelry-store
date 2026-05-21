import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import CustomizationSteps from "@/components/CustomizationSteps";
import UgcGallery from "@/components/UgcGallery";

const Bestsellers = dynamic(() => import("@/components/Bestsellers"));
const GemstoneComparison = dynamic(() => import("@/components/GemstoneComparison"));
const ShopByShape = dynamic(() => import("@/components/ShopByShape"));
const PromoSection = dynamic(() => import("@/components/PromoSection"));
const RingBuilderCTA = dynamic(() => import("@/components/RingBuilderCTA"));
const CraftingMemories = dynamic(() => import("@/components/CraftingMemories"));
const CollectionShowcase = dynamic(() => import("@/components/CollectionShowcase"));
const TechnologySection = dynamic(() => import("@/components/TechnologySection"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Commitment = dynamic(() => import("@/components/Commitment"));

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadgeBar />
      <Features />
      <Bestsellers />
      <CustomizationSteps />
      <GemstoneComparison />
      <ShopByShape />
      <PromoSection />
      <UgcGallery />
      <RingBuilderCTA />
      <CraftingMemories />
      <CollectionShowcase />
      <TechnologySection />
      <Testimonials />
      <Commitment />
    </>
  );
}
