import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliercardComponent } from './suppliercard.component';

describe('SuppliercardComponent', () => {
  let component: SuppliercardComponent;
  let fixture: ComponentFixture<SuppliercardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliercardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
