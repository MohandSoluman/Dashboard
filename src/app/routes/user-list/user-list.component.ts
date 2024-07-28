import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ManagementService } from '../services/management-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputIconModule,
    IconFieldModule,
  ],

  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [MessageService],
})
export class UserListComponent implements OnInit {
  users = signal<any[]>([]);
  filteredUsers = signal<any[]>([]);
  searchTerm = signal<string>('');

  managementService = inject(ManagementService);
  messageService = inject(MessageService);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users.set(this.managementService.getAllUsers());
    this.filteredUsers.set(this.managementService.getAllUsers());
  }

  onSearchChange(event: any) {
    const val = event.target.value as string;
    this.searchTerm.set(val);
    if (val === '') {
      this.filteredUsers.set(this.users());
    } else {
      const filtered = this.users().filter((product) =>
        product.name.toLowerCase().includes(val.toLowerCase())
      );
      this.filteredUsers.set(filtered);
    }
  }

  onDeleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.managementService.deleteUser(id);
        this.loadUsers();
        this.showSuccess('Product Deleted Successfully');
      }
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong',
    });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
}
