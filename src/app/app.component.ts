import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <app-shell>
      <router-outlet></router-outlet>
    </app-shell>
  `,
})
export class AppComponent {
  constructor(private route: ActivatedRoute, private router: Router, private titleService: Title) {
    this.setAppTitle();
  }

  private setAppTitle(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.mapTitleRoute())
      )
      .subscribe((title: string) => {
        this.titleService.setTitle('AM | ' + title);
      });
  }

  protected mapTitleRoute() {
    let childRoute = this.route.firstChild;
    if (childRoute) {
      while (childRoute.firstChild) childRoute = childRoute.firstChild;
      if (childRoute.snapshot.data['title']) {
        return childRoute.snapshot.data['title'];
      }
    }
    return this.titleService.getTitle();
  }
}
