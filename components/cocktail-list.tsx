"use client"
import { useState } from "react";
import { useQuery,keepPreviousData } from "@tanstack/react-query";
import  getCocktails  from "@/lib/api";
import { Cocktail } from "./types";
import Image from "next/image";
import { Card,CardHeader, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button"
import Link from "next/link";

export default function CocktailList(){
  const [page,setPage] = useState(1);
  const {data,isPending,isError,error} = useQuery({
    queryKey:["cocktails",page],
    queryFn: ()=> getCocktails(page),
  });

  if(isPending) return <p> Loading ...</p>
  if (isError) return <p>Error: {error.message}</p>

  return(
    <div>
      <div className="flex gap-3 absolute top-2 right-2 mb-5 mt-5">
        <Button onClick={()=>setPage(p=>p-1)} disabled={page===1}>
          Previous
        </Button>
        <p>{page} of {data.meta.lastPage}</p>
        <Button onClick={()=>setPage(p=>p+1)} disabled={page === data.meta.lastPage}>
          Next            
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-5">
        {data.data.map((cocktail:Cocktail) => 
          <Card key={cocktail.id} className="flex flex-col text-center ">
            <Link href={ `/cocktails/${cocktail.id}`}>
              <CardHeader>
                <p>{cocktail.name}</p>
                <p>{cocktail.alcoholic?"Alcoholic":"non-alcoholic"}</p>
                <p>{cocktail.category}</p>
              </CardHeader>
              <CardContent>
                <Image src={cocktail.imageUrl} alt={cocktail.name} width={200} height={200}/>
              </CardContent>
              <CardFooter>
                <button> Add to favourites </button>
              </CardFooter>
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
}