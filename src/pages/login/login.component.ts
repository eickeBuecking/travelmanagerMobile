import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { AuthenticationService } from '../../services/authentication.service';
import { slideInDownAnimation } from '../../animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [ slideInDownAnimation ]
})
export class LoginComponent implements OnInit {
  submitted = false;
  error: string;
  loginForm: FormGroup;
  loading: any;

  constructor(private authService : AuthenticationService,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private navCtrl: NavController
            ) { }

  ngOnInit() {
    this.authService.logout();
    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
      }
    );
  }

  presentAlert(msg:string) {
    let alert = this.alertCtrl.create({
      title: 'Login failed',
      subTitle: msg,
      buttons: [
        {
          text: 'Try again',
          role: 'retry',
          handler: () => {
            this.tryAgain();
          }
        }
      ]});
    alert.present();
  }


  login() : void {
    this.showLoader();
    this.submitted = true;
    this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
        .subscribe(user => {
                this.navCtrl.setRoot(HomePage);
                console.log('Logged in!');
            },
            error => { this.handleError(error) }
        )
    this.loading.dismiss();
    }

  handleError(error:string) :void {
    console.log(error);
    this.error = error;
    this.presentAlert(error);
  }
  tryAgain() {
    console.log("Hit Try Again!");
    this.error = undefined;
    this.submitted = false;

  }

  showLoader(){

        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();

    }
}
