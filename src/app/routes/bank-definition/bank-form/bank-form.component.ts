import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AcountsListComponent } from '../acounts-list/acounts-list.component';
import { BankDataServiceService } from '../../services/bank-data-service.service';

@Component({
  selector: 'app-bank-form',
  standalone: true,
  imports: [
    CommonModule,
    AcountsListComponent,
    ReactiveFormsModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './bank-form.component.html',
  styleUrl: './bank-form.component.css',
})
export class BankFormComponent {
  dataForm: FormGroup;
  tableData: any[] = [];
  fieldCount: number = 0;

  formFields = [
    { label: 'Code', controlName: 'code', id: 'code', placeholder: 'Code' },
    { label: 'Name', controlName: 'name', id: 'name', placeholder: 'Name' },
    {
      label: 'Short Name',
      controlName: 'shortName',
      id: 'shortName',
      placeholder: 'Short Name',
    },
    {
      label: 'Bank Address',
      controlName: 'bankAddress',
      id: 'bankAddress',
      placeholder: 'Bank Address',
    },
    {
      label: 'Contact Name',
      controlName: 'contactName',
      id: 'contactName',
      placeholder: 'Contact Name',
    },
    {
      label: 'First Name',
      controlName: 'firstName',
      id: 'firstName',
      placeholder: 'First Name',
    },
    {
      label: 'First Name',
      controlName: 'firstName',
      id: 'firstName',
      placeholder: 'First Name',
    },
    {
      label: 'First Name',
      controlName: 'firstName',
      id: 'firstName',
      placeholder: 'First Name',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private bankDataServiceService: BankDataServiceService
  ) {
    this.dataForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      shortName: ['', [Validators.required, Validators.minLength(3)]],
      bankAddress: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.dataForm.valid) {
      // Get current data
      this.bankDataServiceService.data$
        .subscribe((currentData) => {
          // Update data with new form value
          const updatedData = [...currentData, this.dataForm.value];
          this.bankDataServiceService.updateData(updatedData);
        })
        .unsubscribe();

      // Reset form after submission
      this.dataForm.reset();
    }
  }
  resetForm() {
    this.dataForm.reset();
  }

  addNewLine() {}
}
