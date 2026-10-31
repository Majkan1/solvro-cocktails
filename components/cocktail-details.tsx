"use client"

import { getCocktailById } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai/react"
import { favouritesAtom } from "@/lib/atoms"

export default function CocktailDetails(){
  const {id} = useParams<{id:string}>()
  const [favourites,setFavourites] = useAtom(favouritesAtom)
  const {data,isPending,isError,error} = useQuery({
    queryKey:["cocktail",id],
    queryFn: ()=> getCocktailById(id),
  })
    if(isPending) return <p className="text-center"> Loading ...</p>
    if (isError) return <p className="text-center">Error: {error.message}</p>

  return(
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
        Back to list
      </Link>
      <div className="grid gap-8 md:grid-cols-2 mt-6">
        <Image src={data.data.imageUrl} alt={data.data.name} width={600} height={600} className="w-full h-auto rounded-xl"/>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">{data.data.name}</h1>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge>{data.data.alcoholic?"Alcoholic":"Non-alcoholic"}</Badge>
              <Badge variant="outline">{data.data.category}</Badge>
              <Badge variant="outline">{data.data.glass}</Badge>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Ingredients</h2>
            <ul className="border rounded-lg divide-y">
              {data.data.ingredients.map((ingredient)=>(
                <li key={ingredient.id} className="flex justify-between px-4 py-2">
                  <p>{ingredient.name}</p>
                  <p className="text-muted-foreground">{ingredient.measure?.trim()}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Instructions</h2>
            <p className="text-muted-foreground">{data.data.instructions}</p>
          </div>
          <Button className="self-start" variant="outline" onClick={()=>{
            setFavourites(favourites.includes(data.data.id)?favourites.filter((id)=> id !== data.data.id):[...favourites,data.data.id])
          }}>
            {favourites.includes(data.data.id)?"Remove from favourites":"Add to favourites"}
          </Button>
        </div>
      </div>
    </div>
  )
}
