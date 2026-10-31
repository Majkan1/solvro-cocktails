"use client"
import { useAtom, useSetAtom } from "jotai/react";
import { pageAtom, searchAtom } from "@/lib/atoms";
import { Input } from "./ui/input";

export default function Header(){
  const [text,setText] = useAtom(searchAtom);
  const setPage = useSetAtom(pageAtom);
  return(
    <div className="flex flex-col items-center gap-4 mb-8 text-center">
      <h1 className="text-4xl font-bold">Solvro Cocktails</h1>
      <p className="text-muted-foreground">Find a cocktail, check the ingredients and save your favourites</p>
      <Input className="w-full max-w-md"
      value={text}
      placeholder="Search cocktails..."
      onChange={(e)=>{setText(e.target.value); setPage(1)}}
      />
    </div>
  )
}
