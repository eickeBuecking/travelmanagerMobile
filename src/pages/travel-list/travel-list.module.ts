import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelListPage } from './travel-list';
import { ErrorDisplayComponent } from '../../components/error-display/error-display'; 

@NgModule({
  declarations: [
    TravelListPage,
    ErrorDisplayComponent
  ],
  imports: [
    IonicPageModule.forChild(TravelListPage), ErrorDisplayComponent
  ],
})
export class TravelListPageModule {}
