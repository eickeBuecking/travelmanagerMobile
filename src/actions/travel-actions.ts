import {Action} from '@ngrx/store';

import {TravelListItem} from '../models/travellistitem';

import { Travel } from '../models/travel';

export const LIST_TRAVELS = "[Travel] List";
export const LIST_TRAVELS_SUCCESS = "[Travel] List Success"; 

export const TRAVEL_DETAIL = "[Travel] Travel Detail";
export const TRAVEL_DETAIL_SUCCESS = "[Travel] Travel Detail Success";

export class List implements Action {
    readonly type = LIST_TRAVELS;
    constructor(public payload: string) {};
}

export class ListSuccess implements Action {
    readonly type = LIST_TRAVELS_SUCCESS;
    constructor(public payload: TravelListItem[]) {};
}

export class Detail implements Action {
    readonly type = TRAVEL_DETAIL;
    constructor(public payload: string) {};
}

export class DetailSuccess implements Action {
    readonly type = TRAVEL_DETAIL_SUCCESS;
    constructor(public payload: Travel) {};
}


export type All = 
    List | ListSuccess | Detail | DetailSuccess;