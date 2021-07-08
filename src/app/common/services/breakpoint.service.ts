import { Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class BreakPointService {
  constructor(private _breakpoint$: BreakpointObserver) { }

  public isHandset(): Observable<boolean> {
    const breakpoint = this._breakpoint$.observe(Breakpoints.Handset);
    return breakpoint.pipe(map(result => result.matches));
  }
}