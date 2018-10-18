import * as travelReducer from './travel-reducer';

export interface State {
     travels : travelReducer.State;
}

export const reducers = {
     travels: travelReducer.reducer
}

export function selectResultCount(state: State) {
    return state.travels.results.length;
}

export function selectResults(state: State) {
    return state.travels.results;
}