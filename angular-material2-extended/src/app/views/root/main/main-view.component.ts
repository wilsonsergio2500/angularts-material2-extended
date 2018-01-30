import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'main-view-component',
  templateUrl: 'main-view.component.html',
  styles: [
    `
  .mat-sidenav{
    width: 240px;
  }
  .side-content{
    overflow-y: hidden;
    display: flex;
    height: 100%;
    flex-flow: column;
  }
  .side-content .mat-toolbar{
    flex: 0 1 auto;
  }
  .dashboard-content{
    height: 100%;
    overflow-y: auto;
    width: 100%;
    flex: 1 1 auto;
  }
`
  ]
})
export class MainViewComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this.mobileQueryListener.bind(this));
  }
  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  ngOnInit() {

  }
  mobileQueryListener() {
    this.changeDetectorRef.detectChanges();
  }
}
