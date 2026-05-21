import { Metadata } from "next";
import CollectionDetailClient from "./CollectionDetailClient";

// Hardcoded for static generation — content is editable via admin panel
const collections = {
  engagement: { title: "Say Yes Forever", description: "D-color VVS1 moissanite solitaires and lab-grown diamond rings." },
  moissanite: { title: "Moissanite Collection", description: "Exceptional moissanite rings in round, pear, emerald, princess, and cushion cuts." },
  "lab-grown": { title: "Lab-Grown Diamonds", description: "IGI-certified lab-grown diamonds identical to mined diamonds." },
};

export async function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections[slug as keyof typeof collections];
  if (!collection) return { title: "Collection | Anyhave Jewelry" };
  return {
    title: `${collection.title} | Anyhave Jewelry`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CollectionDetailClient slug={slug} />;
}
