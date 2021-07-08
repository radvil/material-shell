import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { D3CourseComponent, FlowchartComponent, SvgCourseComponent } from './routes';

const routes: Routes = [
  {
    path: 'd3-crash-course',
    component: D3CourseComponent,
    data: { title: 'Playground | D3 Crash Course' }
  },
  {
    path: 'svg-crash-course',
    component: SvgCourseComponent,
    data: { title: 'Playground | SVG Crash Course' }
  },
  {
    path: 'flowchart',
    component: FlowchartComponent,
    data: { title: 'Playground | Flowchart' }
  },
  {
    path: '',
    redirectTo: 'flowchart',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule { }
