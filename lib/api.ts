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
export type CocktailFilters = {
  page: number;
  search?: string;
  alcoholic?: boolean;
};

export default async function getCocktails({ page, search, alcoholic }: CocktailFilters): Promise<PaginatedResponse<Cocktail>> {
  const params = new URLSearchParams({ page: String(page), perPage: "24" });
  if (search) params.set("name", `%${search}%`);
  if (alcoholic !== undefined) params.set("alcoholic", String(alcoholic));

  const res = await fetch(`${API_URL}?${params}`);
  if (!res.ok) throw new Error(`Failed to fetch cocktails: ${res.status}`);
  return res.json();
}

export async function getCocktailById(id:string):Promise<{ data: CocktailWithIngredients }>{
  const res = await fetch(`${API_URL}/${id}`);
  if( !res.ok) throw new Error(`Failed to fetch cocktails:${res.status}`);
  return res.json();
}