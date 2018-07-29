import {TravelListItem} from '../models/travellistitem';
import * as TravelActions from '../actions/travel-actions';

export interface State {
    searchTerms : string;
    results : TravelListItem[]
}

const initialState: State = {
    searchTerms: '',
    results: []
}

export function reducer (state = initialState, action: TravelActions.All) : State {
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