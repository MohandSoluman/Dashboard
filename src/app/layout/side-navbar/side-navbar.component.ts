import { Component } from '@angular/core';
import { SideDropDownComponent } from '../../shared/side-drop-down/side-drop-down.component';
import { SearchComponent } from '../../shared/search/search.component';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [SideDropDownComponent, SearchComponent],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css',
})
export class SideNavbarComponent {}
