"use client"
import { useQuery } from "@tanstack/react-query";
import  getCocktails  from "@/lib/api";
import { Cocktail } from "./types";

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
      <div key={cocktail.id}>
        <p>{cocktail.name}</p>
        <p>{cocktail.instructions}</p> 
        <p>{cocktail.alcoholic}</p>
        <p>{cocktail.category}</p>
      </div>
      )}
    </div>
  )
}