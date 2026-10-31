"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import getCocktails from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import FavouriteButton from "./favourite-button";

const GRID = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default function CocktailList() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cocktails", page],
    queryFn: () => getCocktails(page),
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return (
      <div className={GRID}>
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} className="aspect-[3/4] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-destructive">Error: {error.message}</p>;
  }

  return (
    <section>
      <div className={GRID}>
        {data.data.map((cocktail) => (
          <Link
            key={cocktail.id}
            href={`/cocktails/${cocktail.id}`}
            className="group rounded-xl focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Card className="h-full overflow-hidden pt-0 transition-shadow group-hover:shadow-lg">
              <div className="relative aspect-square w-full bg-muted">
                <Image
                  src={cocktail.imageUrl}
                  alt={cocktail.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{cocktail.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant={cocktail.alcoholic ? "default" : "secondary"}>
                  {cocktail.alcoholic ? "Alcoholic" : "Non-alcoholic"}
                </Badge>
                <Badge variant="outline">{cocktail.category}</Badge>
              </CardContent>
              <CardFooter className="mt-auto">
                <FavouriteButton cocktailId={cocktail.id} className="w-full" />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <nav className="mt-10 flex items-center justify-center gap-4" aria-label="Pagination">
        <Button variant="outline" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          ← Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {data.meta.lastPage}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
          disabled={page === data.meta.lastPage}
        >
          Next →
        </Button>
      </nav>
    </section>
  );
}
