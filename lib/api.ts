
const API_URL = "https://cocktails.solvro.pl/api/v1/cocktails?"
export default async function getCocktails(){
  const res = await fetch(`${API_URL}page=1&perpage=50`); 
  if (!res.ok) throw new Error(`Failed to fetch cocktails:${res.status}`);
  return res.json();
}