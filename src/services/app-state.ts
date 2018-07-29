import {Travel} from '../models/travel';

export interface AppState {
    travels: Travel[];
    selectedTravel: Travel;
}