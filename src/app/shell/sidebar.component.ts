import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BreakPointService } from 'src/app/common/services';
import { exampleMenuListItems, playgroundMenuListItems } from './menu';

@Component({
  selector: 'app-sidebar',
  template: `
    <mat-nav-list>
      <div matRipple routerLink="/" class="branding-container">
        <img src="assets/icons/angular.png" width="33" alt="brand image" />
        <span>AM</span>
      </div>

      <div class="menu-heading">
        <span class="badge dark">Examples</span>
      </div>
      <a
        *ngFor="let xM of exampleMenuItems"
        (click)="closeOnClicked()"
        routerLinkActive="active"
        [routerLink]="xM.link"
        mat-list-item
      >
        <mat-icon *ngIf="xM.iconName">{{ xM.iconName }}</mat-icon>
        <span>{{ xM.label }}</span>
      </a>

      <div class="menu-heading">
        <span class="badge dark">Playground</span>
      </div>
      <a
        *ngFor="let pM of playgroundMenuItems"
        (click)="closeOnClicked()"
        routerLinkActive="active"
        [routerLink]="pM.link"
        mat-list-item
      >
        <mat-icon *ngIf="pM.iconName">{{ pM.iconName }}</mat-icon>
        <span>{{ pM.label }}</span>
      </a>
    </mat-nav-list>
  `,
  styles: [
    `
      .branding-container {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin: 1rem;
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
        /* color: #222b45; */
        color: #180707;
        background: #f1f1f1;
        border-radius: 2rem;
        img {
          margin-right: 0.5rem;
        }
        span {
          color: #4a3b3b;
          font-family: Open Sans, sans-serif;
          font-weight: 700;
        }
      }
      .menu-heading {
        font-family: Open Sans, sans-serif;
        font-size: 0.8125rem;
        font-weight: 600;
        line-height: 1.5rem;
        padding: 0.75rem 1rem;
        color: #8f9bb3;
        text-transform: uppercase;
        border-bottom: 1px solid #edf1f7;
      }
      a[mat-list-item] {
        border-bottom: 1px solid #edf1f7;
        color: #222b45;
        font-family: Open Sans, sans-serif;
        font-size: 0.8125rem;
        font-weight: 600;
        line-height: 1.5rem;
        &:hover {
          background-color: #00008b0f;
          /* color: #3366ff !important; */
          color: #dd0031 !important;
        }
        mat-icon {
          margin-right: 0.5rem;
          &:hover {
            /* color: #3366ff; */
            color: #dd0031;
          }
        }
        &.active {
          /* color: #3366ff !important; */
          color: #dd0031 !important;
          mat-icon {
            /* color: #3366ff; */
            color: #dd0031;
          }
        }
      }
    `,
  ],
})
export class SidebarComponent implements OnDestroy {
  public exampleMenuItems = exampleMenuListItems;
  public playgroundMenuItems = playgroundMenuListItems;
  private isHandset!: boolean;
  private destroy$ = new Subject<void>();
  @Output('toggleSideBar') onToggled = new EventEmitter<void>();

  constructor(private bpService: BreakPointService) {
    this.bpService
      .isHandset()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isHandset) => (this.isHandset = isHandset));
  }

  closeOnClicked(): void {
    if (this.isHandset) this.onToggled.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
