import * as travelReducer from './travel.reducer';

export interface State {
    travels : travelReducer.State;
}

export const reducers = {
    travels: travelReducer.reducer
}