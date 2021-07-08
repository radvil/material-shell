import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-course',
  templateUrl: './svg-course.component.html',
  styleUrls: ['./svg-course.component.scss']
})
export class SvgCourseComponent implements OnInit {

  constructor() { }

  public canvasWidth = 700;
  public canvasHeight = 500

  ngOnInit(): void {
  }

}
