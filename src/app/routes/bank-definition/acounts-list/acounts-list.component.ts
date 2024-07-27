import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acounts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acounts-list.component.html',
  styleUrl: './acounts-list.component.css',
})
export class AcountsListComponent implements OnInit {
  items: any = [];
  ngOnInit(): void {
    this.items = [
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
  }
}
