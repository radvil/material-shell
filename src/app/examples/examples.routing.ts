import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DxDiagramComponent, GoDiagramComponent, NgxDiagramComponent, NgxOrgTreeComponent } from './routes';

const routes: Routes = [
  {
    path: 'ngx-diagram',
    component: NgxDiagramComponent,
    data: { title: 'Examples | Ngx Diagram' },
  },
  {
    path: 'ngx-org-tree',
    component: NgxOrgTreeComponent,
    data: { title: 'Examples | Ngx Tree Diagram' },
  },
  {
    path: 'go-diagram',
    component: GoDiagramComponent,
    data: { title: 'Examples | GoJs Diagram' },
  },
  {
    path: 'dx-diagram',
    component: DxDiagramComponent,
    data: { title: 'Examples | DevExtreme Diagram' },
  },
  {
    path: '',
    redirectTo: 'go-diagram',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
