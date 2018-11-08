import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../../services/authentication.service';

import { BasePage } from '../base/base.page';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasePage  
{

  constructor(public navCtrl: NavController, authenticationService: AuthenticationService) {
    super(navCtrl,authenticationService);
  }
  
}
