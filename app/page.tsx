import CocktailList from "@/components/cocktail-list";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <Header />
      <CocktailList />
    </main>
  );
}
