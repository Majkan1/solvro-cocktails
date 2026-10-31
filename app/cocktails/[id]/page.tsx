import { Suspense } from "react"
import CocktailDetails from "@/components/cocktail-details"

export default function CocktailPage(){
  return(
    <Suspense fallback={<p> Loading ...</p>}>
      <CocktailDetails/>
    </Suspense>
  )
}
