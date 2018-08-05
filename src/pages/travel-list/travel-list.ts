import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from '../base/base.page';
import { TravelListItem } from '../../models/travellistitem';
import { TravelsService } from '../../services/travels.service';
import { TravelDetailPage } from '../travel-detail/travel-detail';
import { NewTravelPage } from '../new-travel/new-travel';
import { AuthenticationService } from '../../services/authentication.service';
import {Observable} from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as TravelActions from '../../actions/travel-actions';
import * as fromRoot from '../../reducers/reducers';

/**
 * Generated class for the TravelListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-travel-list',
  templateUrl: 'travel-list.html',
})
export class TravelListPage extends BasePage {
  travels: Observable<TravelListItem[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public travelsService: TravelsService, public store: Store<fromRoot.State>,
              public authenticationService: AuthenticationService) {
                super(navCtrl, authenticationService);
                this.travels = this.store.select(state => state.travels.results);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelListPage');
    this.getTravels();
  }

  public getTravels() {
    this.travelsService.getTravels().subscribe(
      travels => this.store.dispatch(new TravelActions.ListSuccess(travels))
      , error => {this.handleError(error)}
    );
  }

  public itemSelected(item: TravelListItem) {
    console.log("Clicked on : " + item.id);
    this.navCtrl.push(TravelDetailPage, { id: item.id });
  }

  public addTravel() {
    this.navCtrl.push(NewTravelPage);
  }

}
