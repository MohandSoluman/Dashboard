import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SideNavbarComponent } from './layout/side-navbar/side-navbar.component';
import { BankListComponent } from './routes/bank-definition/bank-list/bank-list.component';
import { BankFormComponent } from './routes/bank-definition/bank-form/bank-form.component';
import { LedgerComponent } from './routes/ledger/ledger/ledger.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SideNavbarComponent,
    BankListComponent,
    BankFormComponent,
    LedgerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dashboard';
}
