
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { mergeMap } from 'rxjs/operators';
import * as elementResizeDetectorMaker from 'element-resize-detector';

export interface IElementResized {
  width: number;
  height: number;
}

export class ResizeSubscriber {

  private Subscription: Subscription;


  Subscribe(element: HTMLElement, rszcallback: (resized: IElementResized) => void) {

    const resizeDetecor = elementResizeDetectorMaker();

    const obs = Observable.merge(
      Observable.create((observer) => {

        resizeDetecor.listenTo(element, (elementchanged: HTMLElement) => {
          observer.next(<IElementResized>{ width: elementchanged.clientWidth, height: elementchanged.clientHeight });
        });

        return () => {
          resizeDetecor.removeAllListeners(element);
        };
      })
    ).debounceTime(250).distinctUntilChanged();

    this.Subscription = obs.subscribe(rszcallback);

  }

  Unsubscribe() {
    this.Subscription.unsubscribe();
  }

}
