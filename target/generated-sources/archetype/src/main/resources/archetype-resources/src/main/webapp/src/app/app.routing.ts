import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' }
];

export const AppRoutes = RouterModule.forRoot(routes, { useHash: true });
