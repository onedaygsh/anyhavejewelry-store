import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | Anyhave Jewelry",
  description: "Explore curated jewelry collections by Anyhave — themed selections for every moment.",
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
