import * as ErrorActions from '../actions/error-actions';

export type Action = ErrorActions.All;

export interface ErrorState {
    errorText: string
}

const initialState: ErrorState = {
    errorText: ''
}

export function reducer (state:ErrorState = initialState, action: Action) : ErrorState {
    switch (action.type) {
       
        case ErrorActions.EFFECT_ERROR: {
            return {
                ...state,
                errorText : action.payload
            }

        }

        case ErrorActions.RESET_EFFECT_ERROR: {
            return {
                ...state,
                errorText: ''
            }
        }

        default: {
            return state;
        }
    }
}