import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ManagementService } from '../services/management-service.service';
import { BankList, IUser } from '../../types/user';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-user-managment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    InputIconModule,
    ToastModule,
    IconFieldModule,
  ],
  templateUrl: './user-managment.component.html',
  styleUrl: './user-managment.component.css',
  providers: [MessageService],
})
export class UserManagmentComponent implements OnInit {
  userId: string | null = null;
  form!: FormGroup;
  categories = signal<string[]>([]);
  user?: IUser;

  private _route = inject(ActivatedRoute);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _managementService = inject(ManagementService);
  private _messageService = inject(MessageService);

  bankArray: FormArray = this._fb.array([]);
  private counter: number = 0;

  readonly currencyList = [
    { name: 'Dollar', code: 'NY' },
    { name: 'Egyptian Pound', code: 'RM' },
    { name: 'Euro', code: 'LDN' },
  ];
  readonly GlAccountList = [
    { name: '1234', code: 'NY' },
    { name: '990099', code: 'RM' },
    { name: '220022', code: 'LDN' },
  ];
  readonly permissionList = [
    { name: 'Admin', role: 'role' },
    { name: 'User', role: 'role' },
    { name: 'Accountant', role: 'role' },
  ];

  ngOnInit(): void {
    this.initForm();
    this.userId = this._route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.getuserById(this.userId);
    }
  }

  getuserById(id: string) {
    const users = this._managementService.getUsersFromLocalStorage();
    this.user = users.find((user: IUser) => user.id === id);
    if (this.user) {
      this.form.patchValue(this.user);
      if (this.user.bankList) {
        this.bankArray.clear();
        this.user.bankList.forEach((bank: BankList) => {
          this.bankArray.push(this._fb.group(bank));
        });
      }
    } else {
      this.showError();
    }
  }

  createBankGroup(): FormGroup {
    return this._fb.group({
      id: [`${Date.now()}_${this.counter++}`],
      accountNumber: ['', Validators.required],
      glAccountCode: ['', Validators.required],
      glAccountName: ['', Validators.required],
      branch: ['', Validators.required],
      iban: ['', Validators.required],
      currency: ['', Validators.required],
      currentBalance: ['', [Validators.required, Validators.min(0)]],
      userPermission: ['', Validators.required],
      openingBalance: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get bankControls(): FormArray {
    return this.bankArray as FormArray;
  }

  addBankRow() {
    return this.bankArray.push(this.createBankGroup());
  }

  removeBankRow(index: number) {
    this.bankArray.removeAt(index);
  }

  initForm() {
    this.form = this._fb.group({
      id: [''],
      name: [
        ,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      code: [, Validators.compose([Validators.required])],
      startName: [, Validators.compose([Validators.required])],
      address: [
        ,
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
    });
  }

  submitForm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: IUser = {
      ...this.form.value,
      bankList: this.bankControls.value,
    };

    let users: IUser[] = this._managementService.getUsersFromLocalStorage();

    if (this.userId) {
      const index = users.findIndex((user) => user.id === this.userId);
      if (index > -1) {
        users[index] = data;
        this._managementService.updateLocalStorage(users);
        this.showSuccess('user updated successfully.');
      } else {
        this.showError();
      }
    } else {
      data.id = `${Date.now()}_${this.counter++}`;
      users.push(data);
      this._managementService.updateLocalStorage(users);
      this.showSuccess('user added successfully.');
    }

    this._router.navigateByUrl('/users').then(() => {
      window.location.reload();
    });
  }

  discard() {
    this.form.reset();
    this.bankArray.reset();
    this._router.navigateByUrl('/users');
  }

  showError() {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong',
    });
  }

  showSuccess(message: string) {
    this._messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
}
