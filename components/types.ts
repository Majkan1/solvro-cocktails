export type Cocktail  = {
    id:number,
    name:string,
    instructions:string,
    alcoholic:null | boolean,
    category:string,
    glass:string,
    imageUrl:string,
    createdAt:string
    updatedAt:string,
}

export type Ingredient = {
    id:number,
    name:string,
    description:null | string,
    alcohol:null | boolean,
    type:null | string,
    percentage:null | number,
    imageUrl:string,
    createdAt:string
    updatedAt:string,
    measure:string | null,
}

export type CocktailWithIngredients =  Cocktail & {
    ingredients: Ingredient[]
}