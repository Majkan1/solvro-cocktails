"use client";

import { useState } from "react";
import { Input } from "./ui/input";

export default function Header() {
  const [text, setText] = useState("");

  return (
    <header className="mb-8 flex flex-col items-center gap-4 text-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Solvro Cocktails</h1>
        <p className="mt-2 text-muted-foreground">Browse cocktails, check their ingredients and save your favourites.</p>
      </div>
      <Input
        className="w-full max-w-md"
        value={text}
        placeholder="Search cocktails…"
        onChange={(e) => setText(e.target.value)}
      />
    </header>
  );
}
