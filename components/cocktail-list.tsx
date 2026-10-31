"use client"
import { useQuery } from "@tanstack/react-query";
import  getCocktails  from "@/lib/api";
import { Cocktail } from "./types";
import Image from "next/image";
import { Card,CardHeader,CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button"
import { Badge } from "./ui/badge";
import Link from "next/link";
import { useAtom } from "jotai/react";
import { favouritesAtom, pageAtom, searchAtom } from "@/lib/atoms";

export default function CocktailList(){
  const [page,setPage] = useAtom(pageAtom);
  const [search] = useAtom(searchAtom);
  const [favourites,setFavourites] = useAtom(favouritesAtom)
  const {data,isPending,isError,error} = useQuery({
    queryKey:["cocktails",page,search],
    queryFn: ()=> getCocktails(page,search),
  });

  if(isPending) return <p className="text-center"> Loading ...</p>
  if (isError) return <p className="text-center">Error: {error.message}</p>
  if(data.data.length === 0) return <p className="text-center">No cocktails found</p>

  return(
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.data.map((cocktail:Cocktail) => 
          <Link key={cocktail.id} href={`/cocktails/${cocktail.id}`}>
            <Card className="h-full overflow-hidden pt-0 hover:shadow-lg">
              <Image src={cocktail.imageUrl} alt={cocktail.name} width={400} height={400} className="w-full h-auto"/>
              <CardHeader>
                <CardTitle className="text-lg">{cocktail.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge>{cocktail.alcoholic?"Alcoholic":"Non-alcoholic"}</Badge>
                <Badge variant="outline">{cocktail.category}</Badge>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full" variant="outline" onClick={(e)=>{
                  e.preventDefault();
                  setFavourites(favourites.includes(cocktail.id)?favourites.filter((id)=> id !== cocktail.id):[...favourites,cocktail.id])
                }}>
                  {favourites.includes(cocktail.id)?"Remove from favourites":"Add to favourites"}
                </Button>
              </CardFooter>
            </Card>
          </Link>
        )}
      </div>
      <div className="flex justify-center items-center gap-4 mt-10">
        <Button variant="outline" onClick={()=>setPage(p=>p-1)} disabled={page===1}>
          Previous
        </Button>
        <p>Page {page} of {data.meta.lastPage}</p>
        <Button variant="outline" onClick={()=>setPage(p=>p+1)} disabled={page === data.meta.lastPage}>
          Next
        </Button>
      </div>
    </div>
  )
}
