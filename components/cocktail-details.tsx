"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getCocktailById } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import FavouriteButton from "@/components/favourite-button";

export default function CocktailDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cocktail", id],
    queryFn: () => getCocktailById(id),
  });

  if (isPending) {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-destructive">Error: {error.message}</p>;
  }

  const cocktail = data.data;

  return (
    <article className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={cocktail.imageUrl}
          alt={cocktail.name}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{cocktail.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant={cocktail.alcoholic ? "default" : "secondary"}>
              {cocktail.alcoholic ? "Alcoholic" : "Non-alcoholic"}
            </Badge>
            <Badge variant="outline">{cocktail.category}</Badge>
            <Badge variant="outline">{cocktail.glass}</Badge>
          </div>
        </div>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Ingredients</h2>
          <ul className="divide-y rounded-lg border">
            {cocktail.ingredients.map((ingredient) => (
              <li key={ingredient.id} className="flex justify-between gap-4 px-4 py-2">
                <span>{ingredient.name}</span>
                <span className="text-muted-foreground">{ingredient.measure?.trim()}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">Instructions</h2>
          <p className="leading-relaxed text-muted-foreground">{cocktail.instructions}</p>
        </section>

        <FavouriteButton cocktailId={cocktail.id} className="self-start" />
      </div>
    </article>
  );
}
