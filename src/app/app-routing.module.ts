import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'places',
    loadChildren: () => import('./places/places.module').then( m => m.PlacesPageModule)
  },
  {
    path: '',
    redirectTo: 'places',
    pathMatch: 'full'
  },
  {
    path: 'detail',
    loadChildren: () => import('./places/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./places/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./places/new/new.module').then( m => m.NewPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
