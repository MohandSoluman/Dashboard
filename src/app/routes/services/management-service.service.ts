import { IUser } from './../../types/user';

import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private readonly LOCAL_STORAGE_KEY = 'ListOfUsers';
  private userListSubject: BehaviorSubject<IUser[]>;
  public userList$: Observable<IUser[]>;

  constructor() {
    const initialUsers = this.getUsersFromLocalStorage();
    this.userListSubject = new BehaviorSubject<IUser[]>(initialUsers);
    this.userList$ = this.userListSubject.asObservable();
  }

  // CREATE
  public addUser(newUser: IUser): void {
    const currentUsers = this.userListSubject.value;
    const updatedUsers = [...currentUsers, newUser];
    this.userListSubject.next(updatedUsers);
    this.updateLocalStorage(updatedUsers);
  }

  // READ
  public getAllUsers(): IUser[] {
    return this.userListSubject.value;
  }

  public getUserById(id: string): IUser | undefined {
    return this.userListSubject.value.find((user) => user.id === id);
  }

  // UPDATE
  public updateUser(updatedUser: IUser): boolean {
    const currentUsers = this.userListSubject.value;
    const index = currentUsers.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      const updatedUsers = [
        ...currentUsers.slice(0, index),
        updatedUser,
        ...currentUsers.slice(index + 1),
      ];
      this.userListSubject.next(updatedUsers);
      this.updateLocalStorage(updatedUsers);
      return true;
    }
    return false;
  }

  // DELETE
  public deleteUser(id: string): boolean {
    const currentUsers = this.userListSubject.value;
    const updatedUsers = currentUsers.filter((user) => user.id !== id);
    if (updatedUsers.length < currentUsers.length) {
      this.userListSubject.next(updatedUsers);
      this.updateLocalStorage(updatedUsers);
      return true;
    }
    return false;
  }

  // Utility methods
  public refreshLocalStorage(newUserList: IUser[]): void {
    this.userListSubject.next(newUserList);
    this.updateLocalStorage(newUserList);
  }

  private getUsersFromLocalStorage(): IUser[] {
    const storedUsers = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  private updateLocalStorage(users: IUser[]): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(users));
  }
}
// export class ManagementService {
//   private LOCAL_STORAGE_KEY = 'ListOfUsers';
//   private userList: any[] = this.getUsersFromLocalStorage();

//   constructor() {}

//   public getAllUsers(): any[] {
//     return this.userList;
//   }

//   public deleteUser(id: number): void {
//     this.userList = this.userList.filter((user) => user.id !== id);
//     this.updateLocalStorage();
//   }

//   private getUsersFromLocalStorage(): any[] {
//     const storedUsers = localStorage.getItem(this.LOCAL_STORAGE_KEY);
//     return storedUsers ? JSON.parse(storedUsers) : [];
//   }

//   private updateLocalStorage(): void {
//     localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.userList));
//   }
//   public refreshLocalStorage(newUserList: any[]): void {
//     this.userList = newUserList;
//     this.updateLocalStorage();
//   }
//   public addUser(newUser: any): void {
//     this.userList.push(newUser);
//     this.updateLocalStorage();
//   }
// }
