import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BankDataServiceService } from '../../services/bank-data-service.service';

@Component({
  selector: 'app-acounts-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './acounts-list.component.html',
  styleUrl: './acounts-list.component.css',
})
export class AcountsListComponent implements OnInit {
  tableData: any[] = [];

  constructor(private bankDataServiceService: BankDataServiceService) {}
  ngOnInit(): void {
    this.bankDataServiceService.data$.subscribe((data) => {
      this.tableData = data;
    });
  }
}
