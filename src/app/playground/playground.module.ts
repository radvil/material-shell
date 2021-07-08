import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { PlaygroundRoutingModule } from './playground.routing';
import { D3CourseComponent, SvgCourseComponent, FlowchartComponent } from './routes';
import { SvgContainerComponent } from './components';
import {
  NodeShapeConnector,
  NodeShapeProcess,
  NodeShapeEllipse,
  NodeShapeSquircle,
  NodeShapeDecision,
  NodeShapeEightEdges,
  NodeShapePreparation,
  RaxViewportDirective,
  NodeShapeMerge,
  NodeShapeData,
  NodeShapeTerminator
} from 'src/app/common/flowchart';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    D3CourseComponent,
    SvgContainerComponent,
    SvgCourseComponent,
    RaxViewportDirective,
    FlowchartComponent,

    NodeShapeConnector,
    NodeShapeProcess,
    NodeShapeEllipse,
    NodeShapeSquircle,
    NodeShapeDecision,
    NodeShapeEightEdges,
    NodeShapePreparation,
    NodeShapeMerge,
    NodeShapeData,
    NodeShapeTerminator,
  ],
  imports: [
    CommonModule,
    PlaygroundRoutingModule,

    NgxGraphModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class PlaygroundModule {}
