import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankDataServiceService {
  private items = [
    {
      id: 1,
      AccountNumber: 'Name',
      AccountCode: 'Short Name',
      AccountName: 'mane',
      branch: '250',
      Iban: '85201l',
      currency: 'currency',
      currentBalnce: 'balnce',
      userPermition: 'permissions',
      openingBalance: 'opening balnce',
    },
    {
      id: 2,
      AccountNumber: 'Name',
      AccountCode: 'Short Name',
      AccountName: 'mane',
      branch: '250',
      Iban: '85201l',
      currency: 'currency',
      currentBalnce: 'balnce',
      userPermition: 'permissions',
      openingBalance: 'opening balnce',
    },
    {
      id: 3,
      AccountNumber: 'Name',
      AccountCode: 'Short Name',
      AccountName: 'mane',
      branch: '250',
      Iban: '85201l',
      currency: 'currency',
      currentBalnce: 'balnce',
      userPermition: 'permissions',
      openingBalance: 'opening balnce',
    },
    {
      id: 4,
      AccountNumber: 'Name',
      AccountCode: 'Short Name',
      AccountName: 'mane',
      branch: '250',
      Iban: '85201l',
      currency: 'currency',
      currentBalnce: 'balnce',
      userPermition: 'permissions',
      openingBalance: 'opening balnce',
    },
    {
      id: 5,
      AccountNumber: 'Name',
      AccountCode: 'Short Name',
      AccountName: 'mane',
      branch: '250',
      Iban: '85201l',
      currency: 'currency',
      currentBalnce: 'balnce',
      userPermition: 'permissions',
      openingBalance: 'opening balnce',
    },
    {
      id: 6,
      AccountNumber: 'Name',
      AccountCode: 'Short Name',
      AccountName: 'mane',
      branch: '250',
      Iban: '85201l',
      currency: 'currency',
      currentBalnce: 'balnce',
      userPermition: 'permissions',
      openingBalance: 'opening balnce',
    },
  ];
  private dataSubject = new BehaviorSubject<any[]>(this.items);
  data$ = this.dataSubject.asObservable();

  updateData(newData: any[]) {
    this.dataSubject.next(newData);
  }
}
