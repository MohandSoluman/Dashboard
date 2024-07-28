import { Routes } from '@angular/router';
import { BankListComponent } from './routes/bank-definition/bank-list/bank-list.component';
import { BankFormComponent } from './routes/bank-definition/bank-form/bank-form.component';

export const routes: Routes = [
  { path: 'bankList', component: BankListComponent },
  { path: 'bankForm', component: BankFormComponent },
  { path: '', redirectTo: '/bankList', pathMatch: 'full' },
];
