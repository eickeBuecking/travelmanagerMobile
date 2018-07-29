import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../services/authentication.service';
import { BasePage } from '../base/base.page';
import { TravelsService } from '../../services/travels.service';
import { Travel } from '../../models/travel';

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
  travel: Travel;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public travelService: TravelsService,
              public authenticationService: AuthenticationService ) {
    super(navCtrl, authenticationService);
    this.id = navParams.get("id");
    if (!this.id) {
      this.handleError("Error: Error happened, no ID available!");
    }
    this.travelService.getTravel(this.id).subscribe(
      travel => {this.travel = travel},
      error => {this.handleError(error)}
    );
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelDetailPage');
  }



}
