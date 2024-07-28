import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private readonly LOCAL_STORAGE_KEY = 'ListOfUsers';
  userList: any = this.getUsersFromLocalStorage();

  public getAllUsers() {
    return this.userList;
  }

  public deleteUser(id: number): void {
    this.userList = this.userList.filter((user: any) => user.id !== id);
    this.updateLocalStorage(this.userList);
  }

  public getUsersFromLocalStorage(): any[] {
    const storedUsers = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  public updateLocalStorage(users: any[]) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(users));
  }

  public addUser(newUser: any): void {
    this.userList.push(newUser);
    this.updateLocalStorage(this.userList);
  }
}
