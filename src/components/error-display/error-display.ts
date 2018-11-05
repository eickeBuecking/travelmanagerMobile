import { Component, Input } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import * as ErrorActions from '../../actions/error-actions';
import * as fromRoot from '../../reducers/reducers';
import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

/**
 * Generated class for the ErrorDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'error-display',
  templateUrl: 'error-display.html'
})
export class ErrorDisplayComponent {
  errorTextSubscription: Subscription;
  errorText: Observable<string>;
  constructor(private toastCtrl: ToastController, public store: Store<fromRoot.State>) {
    console.log("DisplayComponent erzeugt!");
    this.errorText = this.store.select(fromRoot.getErrorText);
  }
  
  ngOnInit() {
    let count: number = 0;
    this.errorTextSubscription = this.errorText.pipe(filter(text => text!= null && text.length>0)).subscribe(
      (text) =>  {
        if (text && text.length > 0 ) {
          let toast = this.toastCtrl.create({
            message: text,
            showCloseButton: true,
            duration: 3000,
            position: 'top'
          });
          console.log("Erzeugtes Toast " + count);
          toast.onDidDismiss(() => {
            this.store.dispatch(new ErrorActions.ResetEffectError());
            console.log("Dismissed");
          })
  
          toast.present();
        }
        
    })
  }
  ngOnDestroy() {
    this.errorTextSubscription.unsubscribe();
    console.log("DisplayComponent destroyed");

  }



    
}
