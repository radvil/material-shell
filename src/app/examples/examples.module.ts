import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { GojsAngularModule } from 'gojs-angular';
// ui components
import { DxButtonModule, DxDiagramModule } from 'devextreme-angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// local classes
import { ExamplesRoutingModule } from './examples.routing';
import {
  GoDiagramComponent,
  NgxDiagramComponent,
  NgxOrgTreeComponent,
  DxDiagramComponent,
} from './routes';
import { InspectorComponent, InspectorRowComponent } from './components';

@NgModule({
  declarations: [
    GoDiagramComponent,
    NgxDiagramComponent,
    InspectorComponent,
    InspectorRowComponent,
    NgxOrgTreeComponent,
    DxDiagramComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GojsAngularModule,
    NgxGraphModule,
    DxButtonModule,
    DxDiagramModule,
    // angular material
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    // local classes
    ExamplesRoutingModule,
  ],
})
export class ExamplesModule {}
