import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginComponent } from '../login/login.component';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  template: ""
})
export class BasePage {
  error: string;
 constructor(
   public navCtrl: NavController,
   public authenticationService: AuthenticationService
  ){}

  ionViewCanEnter(): boolean{
    if (this.authenticationService.loggedIn()) {
           // logged in so return true
           return true;
       }
       console.log("User not logged in!");
       // not logged in so redirect to login page
       setTimeout(() => {
          this.navCtrl.setRoot(LoginComponent);
        }, 0);
       return false;
    }

    handleError(error:string) :void {
      console.log(error);
      this.error = error;
    }
}
