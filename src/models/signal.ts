import {Signal} from 'junte-angular/models/signal';

export class CollapsedSignal implements Signal {
  sender: any;

  constructor(public collapsed: boolean) {

  }
}
