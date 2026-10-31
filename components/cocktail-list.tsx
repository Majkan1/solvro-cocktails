"use client"
import { useQuery } from "@tanstack/react-query";
import  getCocktails  from "@/lib/api";
import { Cocktail } from "./types";
import Image from "next/image";

export default function CocktailList(){
  const {data,isPending,isError,error} = useQuery({
    queryKey:["cocktails"],
    queryFn: ()=> getCocktails(),
  });

  if(isPending) return <p> Loading ...</p>
  if (isError) return <p>Error: {error.message}</p>

  return(
    <div className="grid grid-cols-3">
      {data.data.map((cocktail:Cocktail) => 
      <div key={cocktail.id} className="">
        <p>{cocktail.name}</p>
        <p>{cocktail.instructions}</p> 
        <p>{cocktail.alcoholic}</p>
        <p>{cocktail.category}</p>
        <Image src={cocktail.imageUrl} alt={cocktail.name} width={200} height={200}/>
      </div>
      )}
    </div>
  )
}