import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideDropDownComponent } from './side-drop-down.component';

describe('SideDropDownComponent', () => {
  let component: SideDropDownComponent;
  let fixture: ComponentFixture<SideDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideDropDownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
