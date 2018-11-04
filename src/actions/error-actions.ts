import {Action} from '@ngrx/store';


export const EFFECT_ERROR = '[Error] Effect Error';
export const RESET_EFFECT_ERROR = '[Error] Reset Effect Error';

export class EffectError implements Action {
    readonly type = EFFECT_ERROR;
    constructor(public payload: string) {};
}

export class ResetEffectError implements Action {
    readonly type = RESET_EFFECT_ERROR;
}

export type All = 
    EffectError | ResetEffectError;