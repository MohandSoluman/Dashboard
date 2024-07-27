// side-nav.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  private _sideNavVisible = new BehaviorSubject<boolean>(true);
  sideNavState = this._sideNavVisible.asObservable();

  toggleSideNav() {
    this._sideNavVisible.next(!this._sideNavVisible.value);
  }
}
