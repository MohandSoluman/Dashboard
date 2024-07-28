import { Routes } from '@angular/router';
import { BankListComponent } from './routes/bank-definition/bank-list/bank-list.component';
import { BankFormComponent } from './routes/bank-definition/bank-form/bank-form.component';
import { UserListComponent } from './routes/user-list/user-list.component';
import { UserManagmentComponent } from './routes/user-managment/user-managment.component';

export const routes: Routes = [
  { path: 'bankList', component: BankListComponent },
  { path: 'bankForm', component: BankFormComponent },
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
