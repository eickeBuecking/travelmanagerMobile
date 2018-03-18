import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from '../base/base.page';
import { TravelListItem } from '../../models/travellistitem';
import { TravelsService } from '../../services/travels.service';
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
  error: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public travelsService: TravelsService) {
      super(navCtrl);
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

  handleError(error:string) :void {
    console.log(error);
    this.error = error;
  }
}
