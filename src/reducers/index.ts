import { combineReducers } from 'redux';
import { RecipeActionType, RecipeAddAction, RecipeAction } from '../actions';

export interface RecipeItem {
    id: string;
    text: string;
    completed: boolean;
}

const recipes = (state: RecipeItem[] = [], action: RecipeAction): RecipeItem[] => {
    switch (action.type) {
        case RecipeActionType.Add:
            const addAction = action as RecipeAddAction;
            return [
                ...state,
                {
                    id: addAction.id,
                    text: addAction.text,
                    completed: false,
                },
            ];
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    recipes: recipes,
});
