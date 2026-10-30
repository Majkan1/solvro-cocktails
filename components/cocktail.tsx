"use client"
import { useQuery } from "@tanstack/react-query";
import  getCocktails  from "@/lib/api";

export default function CocktailList(){
  const {data,isPending,isError,error} = useQuery({
    queryKey:["cocktails",],
    queryFn: ()=> getCocktails(),
  });

  if(isPending) return <p> Loading ...</p>
  if (isError) return <p>Error: {error.message}</p>

  return(
    <div>
      {data.data.map((cocktail) => 
        <p key={cocktail.id}>{cocktail.name}</p>
      )}
    </div>
  )
}