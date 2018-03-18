import { Destination } from './destination';
export class Travel {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  destinations: Destination[];
}
