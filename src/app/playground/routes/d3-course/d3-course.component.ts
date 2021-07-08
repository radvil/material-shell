import { Component, OnInit } from '@angular/core';
import { arc } from 'd3-shape';

interface SvgConfig {
  width: number;
  height: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
}

@Component({
  selector: 'app-d3-course',
  templateUrl: './d3-course.component.html',
  styleUrls: ['./d3-course.component.scss'],
})
export class D3CourseComponent implements OnInit {
  constructor() {}

  public svgConfig: SvgConfig = {
    width: 630,
    height: 360,
    fill: '#ffda00',
    stroke: 'black',
    strokeWidth: 18,
  };

  get centerX(): number {
    return this.svgConfig.width / 2;
  }

  get centerY(): number {
    return this.svgConfig.height / 2;
  }

  get radiusY(): number {
    return this.centerY - (this.svgConfig?.strokeWidth || 0 / 2);
  }

  public eyeOffsetX = 72;
  public eyeOffsetY = 45;
  public eyeRadius = 36;

  public groupTransform = `translate(${this.centerX}, ${this.centerY})`;
  public mouthWidth = 20;
  public mouthRadius = 140;
  public mouthArc = arc()
    .innerRadius(this.mouthWidth)
    .outerRadius(this.mouthRadius)
    .startAngle(Math.PI / 2)
    .endAngle((Math.PI * 3) / 2);

  ngOnInit(): void {
  }
}
