import {Action} from '@ngrx/store';

import {TravelListItem} from '../models/travellistitem';

export const LIST_TRAVELS = "[Travel] List";
export const LIST_TRAVELS_SUCCESS = "[Travel] List Success"; 
export const EFFECT_ERROR = '[Error] Effect Error';

export class EffectError implements Action {
    readonly type = EFFECT_ERROR;
    constructor(public payload: string) {};
}

export class List implements Action {
    readonly type = LIST_TRAVELS;
    constructor(public payload: string) {};
}

export class ListSuccess implements Action {
    readonly type = LIST_TRAVELS_SUCCESS;
    constructor(public payload: TravelListItem[]) {};
}


export type All = 
    List | ListSuccess | EffectError;