import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from '../base/base.page';
import { TravelListItem } from '../../models/travellistitem';
import { TravelsService } from '../../services/travels.service';
import { TravelDetailPage } from '../../pages/travel-detail/travel-detail';
import { AuthenticationService } from '../../services/authentication.service';
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
  travels: TravelListItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public travelsService: TravelsService,
              public authenticationService: AuthenticationService) {
      super(navCtrl, authenticationService);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelListPage');
    this.getTravels();
  }

  public getTravels() {
    this.travelsService.getTravels().subscribe(
      travels => {this.travels = travels}
      , error => {this.handleError(error)}
    );
  }

  public itemSelected(item: TravelListItem) {
    console.log("Clicked on : " + item.id);
    this.navCtrl.push(TravelDetailPage, { id: item.id });
  }


}
