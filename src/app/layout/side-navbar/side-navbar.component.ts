import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideDropDownComponent } from '../../shared/side-drop-down/side-drop-down.component';
import { SearchComponent } from '../../shared/search/search.component';
import { SideNavService } from '../services/side-nav-service.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [SideDropDownComponent, SearchComponent, CommonModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css',
})
export class SideNavbarComponent implements OnInit, OnDestroy {
  isSideNavVisible: boolean = false;
  private subscription: Subscription | undefined;

  constructor(private sideNavService: SideNavService) {}

  ngOnInit() {
    this.subscription = this.sideNavService.sideNavState.subscribe(
      (state: boolean) => {
        this.isSideNavVisible = state;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
