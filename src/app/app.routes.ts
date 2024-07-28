import { Routes } from '@angular/router';
import { UserListComponent } from './routes/user-list/user-list.component';
import { UserManagmentComponent } from './routes/user-managment/user-managment.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'user-management',
    component: UserManagmentComponent,
  },
  {
    path: 'user-management/:id',
    component: UserManagmentComponent,
  },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users' },
];
