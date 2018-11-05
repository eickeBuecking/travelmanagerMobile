
import { of } from "rxjs/observable/of";
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType} from '@ngrx/effects';
import {Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import * as TravelActions from '../actions/travel-actions';
import * as ErrorActions from '../actions/error-actions';
import {TravelsService} from '../services/travels.service';


import { map, switchMap, catchError} from 'rxjs/operators';




@Injectable()
export class TravelEffects {

    constructor(
        private actions$: Actions,
        private travelsService: TravelsService
    ) {}
    @Effect()
    search$: Observable<Action> = this.actions$.pipe(
        ofType(TravelActions.LIST_TRAVELS),
        switchMap(() => this.travelsService.getTravels().pipe(
            map(results => new TravelActions.ListSuccess(results)),
            catchError(err => of(new ErrorActions.EffectError(err)))
        ))
    );   

    @Effect()
    loadTravel: Observable<Action> = this.actions$.pipe(
        ofType(TravelActions.TRAVEL_DETAIL),
        map((action: TravelActions.Detail) => action.payload),
        switchMap((travelId : string) => this.travelsService.getTravel(travelId).pipe(
            map(result => new TravelActions.DetailSuccess(result)),
            catchError(err => of(new ErrorActions.EffectError(err)))
        ))
    );
}

