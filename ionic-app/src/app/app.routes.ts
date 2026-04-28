import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'event-detail',
    loadComponent: () => import('./pages/event-detail/event-detail.page').then( m => m.EventDetailPage)
  },
  {
    path: 'event-form',
    loadComponent: () => import('./pages/event-form/event-form.page').then( m => m.EventFormPage)
  },
];
