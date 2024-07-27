import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-drop-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-drop-down.component.html',
  styleUrl: './side-drop-down.component.css',
})
export class SideDropDownComponent {
  @Input() name: string = '';
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
