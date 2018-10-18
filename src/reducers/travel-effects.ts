import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from "rxjs/observable/of";
import { Injectable } from '@angular/core';
import { Effect, Actions} from '@ngrx/effects';
import {Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import * as TravelActions from '../actions/travel-actions';
import {TravelsService} from '../services/travels.service';
import { catchError } from '../../node_modules/rxjs/operators';

export class EffectError implements Action {
    readonly type = '[Error] Effect Error';
}


@Injectable()
export class TravelEffects {

    constructor(
        private actions$: Actions,
        private travelsService: TravelsService
    ) {}
    @Effect()
    search$: Observable<Action> = this.actions$.ofType(TravelActions.LIST_TRAVELS)
        .map((action : TravelActions.List) => action.payload)
        .switchMap(term => this.travelsService.getTravels()).pipe(
            catchError(err => {
                console.log ("An Error occured: " + err);
                return of([]);
            })
        )
        .map(results => new TravelActions.ListSuccess(results));
}
