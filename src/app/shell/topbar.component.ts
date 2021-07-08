import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BreakPointService } from 'src/app/common/services';

@Component({
  selector: 'app-topbar',
  template: `
    <mat-toolbar>
      <button class="menu" mat-icon-button (click)="clickMenu.emit()">
        <mat-icon>menu</mat-icon>
      </button>

      <!-- <div routerLink="/" class="branding-container">
        <img src="assets/icons/angular.png" width="36" alt="brand image" />
        <span>Material starter</span>
      </div> -->

      <span class="spacer"></span>

      <button mat-icon-button>
        <mat-icon>palette</mat-icon>
      </button>

      <button #topMenu mat-icon-button [matMenuTriggerFor]="userMenu">
        <mat-icon>account_circle</mat-icon>
      </button>

      <mat-menu #userMenu="matMenu">
        <div mat-menu-item class="user">
          <img src="assets/images/portraits/1.png" alt="username" />
          <div class="meta">
            <h3>vforvodka</h3>
            <small>Radvil Loade</small>
          </div>
        </div>

        <div mat-menu-item class="dark-mode">
          <mat-icon>invert_colors</mat-icon>
          <span>Dark mode</span>

          <span class="spacer"></span>

          <mat-slide-toggle></mat-slide-toggle>
        </div>

        <button mat-menu-item routerLink="/">
          <mat-icon>person_add</mat-icon>
          <span>Register</span>
        </button>

        <button mat-menu-item routerLink="auth/login">
          <mat-icon>fingerprint</mat-icon>
          <span>Login</span>
        </button>

        <button mat-menu-item>
          <mat-icon color="warn">power_settings_new</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [
    `
      mat-toolbar {
        position: absolute;
        z-index: 9999;
        top: 0;
        right: 0;
        background-color: #ffffff;
        box-shadow: 0 0.5rem 1rem 0 rgb(44 51 73 / 10%);
        height: 4.75rem;
        padding: 1.25rem;
        mat-icon {
          color: #222b45;
        }
      }
      /* .branding-container {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin: 0 0.5rem;
        font-family: Open Sans, sans-serif;
        font-weight: 600;
        font-size: 1.5rem;
        color: #222b45;
        img {
          margin-right: 0.5rem;
        }
      } */
      .spacer {
        flex: 1 0 auto;
      }
      [mat-menu-item].user {
        display: flex;
        min-width: 180px;
        padding: 1rem;
      }
      [mat-menu-item].user img {
        margin-right: 1rem;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
      .meta {
        line-height: 1rem;
        width: 100%;
        h3 {
          margin: 0;
        }
        font-weight: bold;
      }
      [mat-menu-item].dark-mode {
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class TopbarComponent implements OnInit, OnDestroy {
  public hidden = false;
  public isHandset$!: Observable<boolean>;
  private _destroy$ = new Subject();
  @Output('toggleSideBar') clickMenu = new EventEmitter();
  @ViewChild('topMenu', { static: true })
  public topMenu!: ElementRef<HTMLButtonElement>;

  constructor(private bpService: BreakPointService) {}

  ngOnInit(): void {
    this.isHandset$ = this.bpService.isHandset();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
