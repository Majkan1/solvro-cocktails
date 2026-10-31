"use client"
import { useAtom, useSetAtom } from "jotai/react";
import { pageAtom, searchAtom } from "@/lib/atoms";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Header(){
  const [text,setText] = useAtom(searchAtom);
  const setPage = useSetAtom(pageAtom);
  return(
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-5 mt-5 ">Hello to my cocktail list !!!</h1>
        <Input className="text-center w-120 "
        value={text}
        placeholder="Write here the cocktail you would like"
        onChange={(e)=>{setText(e.target.value); setPage(1)}}
        />
      </div>
      <Button className="ml-5">
        Ulubione
      </Button>
    </div>
  )
}