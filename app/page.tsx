import CocktailList from '@/components/cocktail-list';
import Header from '@/components/header'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Header/>
      <CocktailList/>
    </div>
  );
}
