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
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { ManagementService } from '../services/management-service.service';
import { BankList, IUser } from '../../types/user';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-user-managment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    RouterModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputIconModule,
    IconFieldModule,
    DropdownModule,
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
      this.getUserById(this.userId);
    }
  }

  private getUserById(id: string): void {
    const user = this._managementService.getUserById(id);
    if (user) {
      this.user = user;
      this.form.patchValue(this.user);
      this.patchBankList(this.user.bankList);
    } else {
      this.showError('User not found');
    }
  }

  private patchBankList(bankList?: BankList[]): void {
    if (bankList && bankList.length > 0) {
      this.bankArray.clear();
      bankList.forEach((bank) => {
        this.bankArray.push(this.createBankGroup(bank));
      });
    }
  }

  private createBankGroup(bank?: BankList): FormGroup {
    return this._fb.group({
      id: [bank?.id || `${Date.now()}_${this.counter++}`],
      accountNumber: [bank?.accountNumber || '', Validators.required],
      glAccountCode: [bank?.glAccountCode || '', Validators.required],
      glAccountName: [bank?.glAccountName || '', Validators.required],
      branch: [bank?.branch || '', Validators.required],
      iban: [bank?.iban || '', Validators.required],
      currency: [bank?.currency || '', Validators.required],
      currentBalance: [
        bank?.currentBalance || '',
        [Validators.required, Validators.min(0)],
      ],
      userPermission: [bank?.userPermission || '', Validators.required],
      openingBalance: [
        bank?.openingBalance || '',
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  get bankControls(): FormArray {
    return this.bankArray;
  }

  addBankRow(): void {
    this.bankArray.push(this.createBankGroup());
  }

  removeBankRow(index: number): void {
    this.bankArray.removeAt(index);
  }

  private initForm(): void {
    this.form = this._fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', Validators.required],
      startName: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submitForm(): void {
    debugger;
    console.log(this.form.value);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: IUser = {
      ...this.form.value,
      bankList: this.bankControls.value,
    };

    if (this.userId) {
      this.updateUser(data);
    } else {
      this.addUser(data);
    }
  }

  private updateUser(data: IUser): void {
    const success = this._managementService.updateUser(data);
    if (success) {
      this.showSuccess('User updated successfully.');
      this.navigateToUsers();
    } else {
      this.showError('Failed to update user.');
    }
  }

  private addUser(data: IUser): void {
    data.id = `${Date.now()}_${this.counter++}`;
    try {
      this._managementService.addUser(data);
      this.showSuccess('User added successfully.');
      this.navigateToUsers();
    } catch (error) {
      this.showError(
        'Failed to add user: ' +
          (error instanceof Error ? error.message : String(error))
      );
    }
  }

  discard(): void {
    this.form.reset();
    this.bankArray.clear();
    this.navigateToUsers();
  }

  private navigateToUsers(): void {
    this._router.navigateByUrl('/users');
  }

  private showError(message: string): void {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  private showSuccess(message: string): void {
    this._messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
}
// export class UserManagmentComponent implements OnInit {
//   userId!: string | null;
//   form!: FormGroup;
//   categories = signal<string[]>([]);
//   user!: IUser;

//   _route = inject(ActivatedRoute);
//   _fb = inject(FormBuilder);
//   _router = inject(Router);
//   managementService = inject(ManagementService);
//   messageService = inject(MessageService);

//   bankArray: FormArray = this._fb.array([]);
//   private counter: number = 0;
//   currencyList: { name: string; code: string }[] = [];
//   permissionList: { name: string; role: string }[] = [];
//   GlAcountList: { name: string; code: string }[] = [];

//   ngOnInit(): void {
//     this.initForm();
//     this.userId = this._route.snapshot.paramMap.get('id');
//     if (this.userId) {
//       this.getuserById(this.userId);
//     }

//     this.currencyList = [
//       { name: 'Dollar', code: 'NY' },
//       { name: 'Egyption Pound', code: 'RM' },
//       { name: 'euro', code: 'LDN' },
//     ];
//     this.GlAcountList = [
//       { name: '1234', code: 'NY' },
//       { name: '990099', code: 'RM' },
//       { name: '220022', code: 'LDN' },
//     ];

//     this.permissionList = [
//       { name: 'Admin', role: 'role' },
//       { name: 'User', role: 'role' },
//       { name: 'Accountant', role: 'role' },
//     ];
//   }

//   getuserById(id: string) {
//     const users = this.managementService.getAllUsers();
//     this.user = users.find((user: IUser) => user.id === id);
//     if (this.user) {
//       this.form.patchValue(this.user);
//       if (this.user.bankList) {
//         this.bankArray.clear();
//         this.user.bankList.forEach((bank: BankList) => {
//           this.bankArray.push(this._fb.group(bank));
//         });
//       }
//     } else {
//       this.showError();
//     }
//   }

//   createBankGroup(): FormGroup {
//     return this._fb.group({
//       id: [`${Date.now()}_${this.counter++}`],
//       accountNumber: ['', Validators.required],
//       glAccountCode: ['', Validators.required],
//       glAcountName: ['', Validators.required],
//       branchr: ['', Validators.required],
//       iban: ['', Validators.required],
//       currency: ['', Validators.required],
//       currentBalance: ['', [Validators.required, Validators.min(0)]],
//       userPermission: ['', Validators.required],
//       openingBalance: ['', [Validators.required, Validators.min(0)]],
//     });
//   }

//   get bankControls(): FormArray {
//     return this.bankArray as FormArray;
//   }

//   addBankRow() {
//     return this.bankArray.push(this.createBankGroup());
//   }

//   removeBankRow(index: number) {
//     this.bankArray.removeAt(index);
//   }

//   initForm() {
//     this.form = this._fb.group({
//       id: [''],
//       name: [
//         ,
//         Validators.compose([Validators.required, Validators.minLength(3)]),
//       ],
//       code: [, Validators.compose([Validators.required])],
//       startName: [, Validators.compose([Validators.required])],
//       address: [
//         ,
//         Validators.compose([Validators.required, Validators.minLength(10)]),
//       ],
//     });
//   }

//   submitForm() {
//     if (!this.form.valid) {
//       this.form.markAllAsTouched();
//       return;
//     }

//     const data: IUser = {
//       ...this.form.value,
//       bankList: this.bankControls.value,
//     };

//     let users: IUser[] = this.managementService.getAllUsers();

//     if (this.userId) {
//       const index = users.findIndex((user) => user.id === this.userId);
//       if (index > -1) {
//         users[index] = data;
//         this.managementService.refreshLocalStorage(users);
//         this.showSuccess('user updated successfully.');
//       } else {
//         this.showError();
//       }
//     } else {
//       data.id = `${Date.now()}_${this.counter++}`;
//       users.push(data);
//       this.managementService.refreshLocalStorage(users);
//       this.showSuccess('user added successfully.');
//     }

//     this._router.navigateByUrl('/users').then(() => {
//       window.location.reload();
//     });
//   }

//   discard() {
//     this.form.reset();
//     this.bankArray.reset();
//     this._router.navigateByUrl('/users');
//   }

//   showError() {
//     this.messageService.add({
//       severity: 'error',
//       summary: 'Error',
//       detail: 'Something went wrong',
//     });
//   }

//   showSuccess(message: string) {
//     this.messageService.add({
//       severity: 'success',
//       summary: 'Success',
//       detail: message,
//     });
//   }

// }
