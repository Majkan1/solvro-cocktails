import { Cocktail, CocktailWithIngredients } from "@/components/types";

type PaginatedResponse<T> = {
  data: T[];
  meta: { 
    total:number,
    perPage:number,
    currentPage:number,
    lastPage:number
  };
};
const API_URL = "https://cocktails.solvro.pl/api/v1/cocktails"
export default async function getCocktails(page:number):Promise<PaginatedResponse<Cocktail>>{
  const res = await fetch(`${API_URL}?page=${page}&perPage=50`); 
  if (!res.ok) throw new Error(`Failed to fetch cocktails:${res.status}`);
  return res.json();
}

export async function getCocktailById(id:string):Promise<{ data: CocktailWithIngredients }>{
  const res = await fetch(`${API_URL}/${id}`);
  if( !res.ok) throw new Error(`Failed to fetch cocktails:${res.status}`);
  return res.json();
}