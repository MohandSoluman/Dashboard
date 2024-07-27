import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountsListComponent } from './acounts-list.component';

describe('AcountsListComponent', () => {
  let component: AcountsListComponent;
  let fixture: ComponentFixture<AcountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcountsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
