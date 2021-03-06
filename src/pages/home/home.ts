import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginComponent } from '../login/login.component';
//import { BasePage } from '../base/base.page';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage //extends BasePage  
{

  constructor(public navCtrl: NavController) {
    //super(navCtrl);
  }
  ionViewCanEnter(): boolean{
    if (localStorage.getItem('currentUser')) {
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
}
