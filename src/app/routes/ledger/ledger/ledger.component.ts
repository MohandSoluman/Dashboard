import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { DropdownComponent } from '../../../shared/dropdown/dropdown.component';
import { HeaderComponent } from '../../../layout/header/header.component';
import { SearchComponent } from '../../../shared/search/search.component';
import { CommonModule } from '@angular/common';
import { SideDropDownComponent } from '../../../shared/side-drop-down/side-drop-down.component';
import { SideNavbarComponent } from '../../../layout/side-navbar/side-navbar.component';

@Component({
  selector: 'app-ledger',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    DropdownComponent,
    HeaderComponent,
    SearchComponent,
    SideDropDownComponent,
    SideNavbarComponent,
  ],
  templateUrl: './ledger.component.html',
  styleUrl: './ledger.component.css',
})
export class LedgerComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
