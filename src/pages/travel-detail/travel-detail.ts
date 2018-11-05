import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../services/authentication.service';
import { BasePage } from '../base/base.page';
import { TravelsService } from '../../services/travels.service';
import { Travel } from '../../models/travel';
import {Observable} from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as TravelActions from '../../actions/travel-actions';
import * as fromRoot from '../../reducers/reducers';
import { switchMap } from 'rxjs/operators';

/**
 * Generated class for the TravelDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-travel-detail',
  templateUrl: 'travel-detail.html',
})
export class TravelDetailPage extends BasePage {
  id: string;
  travel: Observable<Travel>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public travelService: TravelsService,
              public authenticationService: AuthenticationService,
              public store: Store<fromRoot.State> ) {
    super(navCtrl, authenticationService);
    this.id = navParams.get("id");
    if (!this.id) {
      this.handleError("Error: Error happened, no ID available!");
    }
    this.travel = this.store.select(fromRoot.getTravel);
  }

  ngOnInit() {
    this.store.dispatch(new TravelActions.Detail(this.id));
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelDetailPage');
  }



}
