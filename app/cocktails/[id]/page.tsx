import { Suspense } from "react";
import Link from "next/link";
import CocktailDetails from "@/components/cocktail-details";

export default function CocktailPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground">
        ← Back to list
      </Link>
      <Suspense fallback={<p>Loading...</p>}>
        <CocktailDetails />
      </Suspense>
    </main>
  );
}
