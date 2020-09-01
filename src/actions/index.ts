import { Action } from 'redux';
import { v4 as uuidv4 } from 'uuid';

export enum RecipeActionType {
    Add = 'Add',
}

export interface RecipeAction extends Action<RecipeActionType> {
    id: string;
}

export interface RecipeAddAction extends RecipeAction {
    text: string;
}

export const addRecipe = (text: string): RecipeAddAction => {
    return { id: uuidv4(), text: text, type: RecipeActionType.Add };
};
