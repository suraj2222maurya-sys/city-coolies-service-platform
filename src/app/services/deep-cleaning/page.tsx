import type { Metadata } from "next";
import DeepCleaningMarketplace from "./DeepCleaningMarketplace";

export const metadata: Metadata = {
  title: "Deep Cleaning Services | City Coolies",
  description:
    "Explore professional deep cleaning services from City Coolies for homes, rooms, kitchens, bathrooms, water tanks and industrial properties.",
};

type DeepCleaningSearchParams = {
  category?: string | string[];
};

type DeepCleaningPageProps = {
  searchParams?:
    | DeepCleaningSearchParams
    | Promise<DeepCleaningSearchParams>;
};

export default async function DeepCleaningPage({
  searchParams,
}: DeepCleaningPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const categoryValue = resolvedSearchParams?.category;
  const category = Array.isArray(categoryValue)
    ? categoryValue[0]
    : categoryValue;

  return (
    <main>
      <DeepCleaningMarketplace initialCategory={category} />
    </main>
  );
}