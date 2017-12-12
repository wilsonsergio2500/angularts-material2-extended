import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styles: [
    `
  .mat-sidenav{
    width: 240px;
  }
`
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

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
