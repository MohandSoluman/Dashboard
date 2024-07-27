import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { DropdownComponent } from '../../../shared/dropdown/dropdown.component';

@Component({
  selector: 'app-ledger',
  standalone: true,
  imports: [BreadcrumbComponent, DropdownComponent],
  templateUrl: './ledger.component.html',
  styleUrl: './ledger.component.css',
})
export class LedgerComponent {}
