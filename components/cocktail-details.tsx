"use client"

import { getCocktailById } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import {Card,CardHeader,CardContent,CardFooter} from "@/components/ui/card";
import { useParams } from "next/navigation"
import Image from "next/image"

export default function CocktailDetails(){
  const {id} = useParams<{id:string}>()
  const {data,isPending,isError,error} = useQuery({
    queryKey:["cocktail",id],
    queryFn: ()=> getCocktailById(id),
  })
    if(isPending) return <p> Loading ...</p>
    if (isError) return <p>Error: {error.message}</p>

  return(
    <div>
      <Link href="/">
        Came back 
      </Link>
      <div> 
          <Card className="flex flex-col text-center ">
            <CardHeader>
              <p>{data.data.name}</p>
              <p>{data.data.alcoholic?"Alcoholic":"non-alcoholic"}</p>
              <p>{data.data.category}</p>
            </CardHeader>
            <CardContent>
              <Image src={data.data.imageUrl} alt={data.data.name} width={200} height={200}/>
              <p>{data.data.glass}</p>
              <p>{data.data.instructions}</p>
              {data.data.ingredients.map((ingredient)=>(
                <div key={ingredient.id}>
                  <p>{ingredient.name}</p>
                  <p>{ingredient.measure?.trim()}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <button> Dodaj do ulubionych </button>
            </CardFooter>
        </Card>
      </div>
    </div>
  )
}