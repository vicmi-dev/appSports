import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'places', pathMatch: 'full'
  },
  {
    path: 'places',
    children: [
      {
        path: '',
        loadChildren: () => import('./places/places.module').then(m => m.PlacesPageModule)
      },
      {
        path: 'edit/:placeId',
        loadChildren: () => import('./places/edit/edit.module').then(m => m.EditPageModule)
      },
      {
        path: 'new',
        loadChildren: () => import('./places/new/new.module').then(m => m.NewPageModule)
      },
      {
        path: ':placeId',
        loadChildren: () => import('./places/detail/detail.module').then(m => m.DetailPageModule)
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings/bookings.module').then( m => m.BookingsPageModule)
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
