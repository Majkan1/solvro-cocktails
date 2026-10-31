"use client";

import { useAtom, useSetAtom } from "jotai/react";
import { alcoholFilterAtom, pageAtom, searchAtom, type AlcoholFilter } from "@/lib/atoms";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FILTERS: { value: AlcoholFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "alcoholic", label: "Alcoholic" },
  { value: "non-alcoholic", label: "Non-alcoholic" },
];

export default function Header() {
  const [search, setSearch] = useAtom(searchAtom);
  const [alcoholFilter, setAlcoholFilter] = useAtom(alcoholFilterAtom);
  const setPage = useSetAtom(pageAtom);

  return (
    <header className="mb-8 flex flex-col items-center gap-4 text-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Solvro Cocktails</h1>
        <p className="mt-2 text-muted-foreground">Browse cocktails, check their ingredients and save your favourites.</p>
      </div>
      <Input
        type="search"
        className="w-full max-w-md"
        value={search}
        placeholder="Search cocktails…"
        aria-label="Search cocktails by name"
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by type">
        {FILTERS.map((filter) => (
          <Button
            key={filter.value}
            size="sm"
            variant={alcoholFilter === filter.value ? "default" : "outline"}
            aria-pressed={alcoholFilter === filter.value}
            onClick={() => {
              setAlcoholFilter(filter.value);
              setPage(1);
            }}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </header>
  );
}
