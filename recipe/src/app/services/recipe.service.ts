import { Injectable } from '@angular/core';
import { IRecipe } from '../interfaces/recipe';
import { IIngredient } from '../interfaces/ingredient';
import * as recipeData from '../../data.json';

@Injectable()
export class RecipeService {
  private recipes: IRecipe[] = [];

  constructor() {
    recipeData.recipes.forEach(recipe => {
      this.recipes.push({ ...recipe });
    });
  }

  public getRecipes(): IRecipe[] {
    return this.recipes;
  }

  public getRecipeById(id: number): IRecipe {
    return this.recipes.find(recipe => recipe.id === id);
  }

  public createRecipe(
    title: string,
    description: string,
    serves: string,
    imageUrl: string,
    ingredients: IIngredient[],
    instructions: string[]
  ) {
    const newRecipe = {
      id: this.getNextId(),
      title,
      description,
      serves,
      imageUrl,
      ingredients: [...ingredients],
      instructions: [...instructions]
    };
    this.recipes.push({ ...newRecipe });
    return newRecipe;
  }

  public updateRecipe(recipe: IRecipe): IRecipe {
    const recipeIndex = this.recipes.findIndex(r => r.id === recipe.id);
    this.recipes[recipeIndex] = recipe;
    return recipe;
  }

  public deleteRecipe(id: number): void {
    const recipeIndex = this.recipes.findIndex(r => r.id === id);
    if (recipeIndex !== -1) {
      this.recipes.splice(recipeIndex, 1);
    }
  }

  private getNextId(): number {
    const max = Math.max.apply(null, this.recipes.map(recipe => recipe.id));
    return max + 1;
  }
}
