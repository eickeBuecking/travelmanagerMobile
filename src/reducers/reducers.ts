import * as travelReducer from './travel-reducer';
import * as errorReducer from './error-reducer';

export interface State {
     travels : travelReducer.TravelState;
     errors: errorReducer.ErrorState
}

export const reducers = {
     travels: travelReducer.reducer,
     errors: errorReducer.reducer
    }

export function selectResultCount(state: State) {
    return state.travels.results.length;    
}

export function selectResults(state: State) {
    return state.travels.results;
}

export function getErrorText(state: State) {
    return state.errors.errorText;
}

export function getTravel(state: State) {
    return state.travels.travel;
}