import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AcountsListComponent } from '../acounts-list/acounts-list.component';

@Component({
  selector: 'app-bank-form',
  standalone: true,
  imports: [CommonModule, AcountsListComponent],
  templateUrl: './bank-form.component.html',
  styleUrl: './bank-form.component.css',
})
export class BankFormComponent {
  onSubmit() {}
}
