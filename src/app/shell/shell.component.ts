import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { BreakPointService } from '../common/services';

@Component({
  selector: 'app-shell',
  template: `
    <div class="app-shell">
      <mat-sidenav-container>
        <mat-sidenav
          #sidebar
          [mode]="sidebarMode"
          [opened]="false"
        >
          <!-- [opened]="!(isHandset$ | async)" -->
          <app-sidebar (toggleSideBar)="sidebar.toggle()"></app-sidebar>
        </mat-sidenav>

        <div class="wrapper">
          <app-topbar (toggleSideBar)="sidebar.toggle()"></app-topbar>
          <main class="outlet-container">
            <ng-content select="router-outlet"></ng-content>
          </main>
        </div>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `
      .app-shell {
        height: 100%;
        width: 100%;
      }
      .wrapper {
        overflow-y: auto;
        height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .outlet-container {
        margin-top: 77px;
        padding: 2.25rem 2.25rem 0.75rem;
        flex: 1 0 auto;
        overflow: hidden;
        background-color: #edf1f7;
      }
      mat-sidenav {
        width: 16rem;
        background-color: #fff;
        box-shadow: 0 0.5rem 1rem 0 rgb(44 51 73 / 10%);
        /* color: #222b45; */
        color: #180707;
        font-family: Open Sans, sans-serif;
        font-size: 0.9375rem;
        font-weight: 400;
        line-height: 1.25rem;
      }
    `,
  ],
})
export class ShellComponent implements OnInit, OnDestroy {
  public isHandset$ = this.bpService.isHandset();
  public sidebarMode!: MatDrawerMode;
  private destroy$ = new Subject();

  constructor(public bpService: BreakPointService) {}

  ngOnInit() {
    this.isHandset$
      .pipe(
        tap((isHandset) => (this.sidebarMode = isHandset ? 'over' : 'side')),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
