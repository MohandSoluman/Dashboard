import { Component } from '@angular/core';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { SideNavService } from '../services/side-nav-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownComponent, BreadcrumbComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private sideNavService: SideNavService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSideNav() {
    this.sideNavService.toggleSideNav();
  }
}
