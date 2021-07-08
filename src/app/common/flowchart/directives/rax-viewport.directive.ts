import {
  AfterViewInit,
  ContentChild,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[raxContainer], [raxSvgCanvas]',
})
export class RaxContainerDirective {
  constructor(private elRef: ElementRef) {}

  get nativeElement() {
    return this.elRef.nativeElement;
  }
}

@Directive({
  selector: '[raxViewport]',
})
export class RaxViewportDirective implements AfterViewInit, OnDestroy {
  constructor(private elRef: ElementRef<HTMLElement>, private rd: Renderer2) {}

  private destroy$ = new Subject<void>();
  private maxHeight!: string;
  private host!: Element | HTMLElement;
  private child!: Element | HTMLElement;

  @ContentChild(RaxContainerDirective) raxChild!: RaxContainerDirective;
  @Input('raxViewportHeight') height!: number | string;
  @Input('raxViewportWidth') width!: number | string;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.host = this.elRef.nativeElement;
    this.child = this.raxChild?.nativeElement || document.querySelector('svg.ngx-charts');

    if (this.width) {
      const width = typeof this.width === 'number' ? this.width + 'px' : this.width;
      this.rd.setStyle(this.host, 'width', width);
    }

    if (this.height) {
      const height = typeof this.height === 'number' ? this.height + 'px' : this.height;
      this.rd.setStyle(this.host, 'height', height);
    }

    this.resizeChildElement(true);

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => {
        this.resizeChildElement();
      });
  }

  resizeChildElement(onInit = false): void {
    const computedHost = getComputedStyle(this.host);
    const paddLR = parseFloat(computedHost.paddingLeft) + parseFloat(computedHost.paddingRight);
    const paddTB = parseFloat(computedHost.paddingTop) + parseFloat(computedHost.paddingBottom);
    const hostWidth = (this.host.clientWidth - paddLR).toString();
    const hostHeight = (this.host.clientHeight - paddTB).toString();

    if (onInit) {
      this.maxHeight = hostHeight;
    }
    this.rd.setAttribute(this.child, 'width', hostWidth);
    this.rd.setAttribute(this.child, 'height', this.maxHeight || hostHeight);
  }
}
