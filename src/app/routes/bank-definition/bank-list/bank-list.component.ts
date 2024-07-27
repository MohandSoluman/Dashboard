import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank-list',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './bank-list.component.html',
  styleUrl: './bank-list.component.css',
})
export class BankListComponent implements OnInit {
  items: any = [];
  ngOnInit(): void {
    this.items = [
      { id: 1, code: '011', name: 'Name', shortName: 'Short Name' },
      { id: 2, code: '011', name: 'Name', shortName: 'Short Name' },
      { id: 3, code: '011', name: 'Name', shortName: 'Short Name' },
      { id: 4, code: '011', name: 'Name', shortName: 'Short Name' },
      { id: 5, code: '011', name: 'Name', shortName: 'Short Name' },
      { id: 6, code: '011', name: 'Name', shortName: 'Short Name' },
    ];
  }
  newItem = { name: '' };
  editItem: any;
  isCreateModalOpen = false;
  isEditModalOpen = false;

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  openEditModal(item: any) {
    this.editItem = { ...item };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  createItem() {
    const newId = this.items.length
      ? Math.max(...this.items.map((i: any) => i.id)) + 1
      : 1;
    this.items.push({ id: newId, name: this.newItem.name });
    this.newItem.name = '';
    this.closeCreateModal();
  }

  updateItem() {
    const index = this.items.findIndex((i: any) => i.id === this.editItem.id);
    if (index !== -1) {
      this.items[index] = { ...this.editItem };
    }
    this.closeEditModal();
  }

  deleteProduct() {
    //this.items = this.items.filter((item) => item.id !== id);
  }
}
