import {TravelListItem} from '../models/travellistitem';
import { Travel } from '../models/travel';

import * as TravelActions from '../actions/travel-actions';

export type Action = TravelActions.All;

export interface TravelState {
    searchTerms : string;
    results : TravelListItem[];
    travelId : string;
    travel : Travel;
}

const initialState: TravelState = {
    searchTerms: '',
    results: [],
    travelId: '',
    travel: null

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

        case TravelActions.TRAVEL_DETAIL: {
            return {
                ...state,
                travelId: action.payload
            }
        }
        
        case TravelActions.TRAVEL_DETAIL_SUCCESS: {
            return {
                ...state,
                travel: action.payload
            }
        }

        default: {
            return state;
        }
    }
}