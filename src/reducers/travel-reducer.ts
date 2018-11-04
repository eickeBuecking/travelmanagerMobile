import {TravelListItem} from '../models/travellistitem';
import * as TravelActions from '../actions/travel-actions';

export type Action = TravelActions.All;

export interface TravelState {
    searchTerms : string;
    results : TravelListItem[]
}

const initialState: TravelState = {
    searchTerms: '',
    results: []
}

export function reducer (state:TravelState = initialState, action: Action) : TravelState {
    switch (action.type) {
        case TravelActions.LIST_TRAVELS: {
            return {
                ...state,
                searchTerms: action.payload
            };
        }

        case TravelActions.LIST_TRAVELS_SUCCESS: {
            return {
                ...state,
                results: action.payload
            };
        }

        default: {
            return state;
        }
    }
}