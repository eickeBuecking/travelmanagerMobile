import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from '../../pages/base/base.page';
import { AuthenticationService } from '../../services/authentication.service';
import { TravelsService } from '../../services/travels.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the NewTravelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-travel',
  templateUrl: 'new-travel.html',
})
export class NewTravelPage extends BasePage {
  travelForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authenticationService: AuthenticationService,
              public travelService: TravelsService,
              public formBuilder: FormBuilder) {
    super(navCtrl, authenticationService);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTravelPage');
  }

  ngOnInit() {
    this.travelForm = this.formBuilder.group(
      {
        name: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
        description: ['', Validators.compose([Validators.maxLength(120)])],
        startDate: ['', Validators.required],
        endDate: ['']
      }
    );
  }

}
