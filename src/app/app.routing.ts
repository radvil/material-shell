import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'examples',
  //   loadChildren: () => import('./examples/examples.module').then((m) => m.ExamplesModule),
  // },
  {
    path: 'playground',
    loadChildren: () => import('./playground/playground.module').then((m) => m.PlaygroundModule),
  },
  {
    path: '',
    redirectTo: 'playground',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
