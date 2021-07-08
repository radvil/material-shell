import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'svg-container',
  template: `
    <mat-card class="section-card" [style]="cardStyle">
      <!-- <mat-card-header>{{ title }}</mat-card-header> -->
      <ng-content></ng-content>
    </mat-card>
  `,
})
export class SvgContainerComponent implements OnInit {
  constructor() {}

  public cardStyle = {
    width: 630 + 'px',
    height: 360 + 'px',
  };

  @Input('title') title = 'Default Title';
  @Input('width')
  set width(value: number) {
    this.cardStyle = { ...this.cardStyle, width: value + 'px' };
  }
  @Input('height') 
  set height(value: number) {
    this.cardStyle = { ...this.cardStyle, height: value + 'px' };
  }

  ngOnInit(): void {}
}
