"use client";

import { useAtom } from "jotai/react";
import { favouritesAtom } from "@/lib/atoms";
import { Button } from "./ui/button";

type FavouriteButtonProps = {
  cocktailId: number;
  className?: string;
};

export default function FavouriteButton({ cocktailId, className }: FavouriteButtonProps) {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const isFavourite = favourites.includes(cocktailId);

  return (
    <Button
      variant={isFavourite ? "default" : "outline"}
      className={className}
      aria-pressed={isFavourite}
      onClick={(e) => {
        e.preventDefault();
        setFavourites(
          isFavourite
            ? favourites.filter((id) => id !== cocktailId)
            : [...favourites, cocktailId]
        );
      }}
    >
      {isFavourite ? "♥ In favourites" : "♡ Add to favourites"}
    </Button>
  );
}
