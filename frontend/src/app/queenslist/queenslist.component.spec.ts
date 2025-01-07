import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueenslistComponent } from './queenslist.component';

describe('QueenslistComponent', () => {
  let component: QueenslistComponent;
  let fixture: ComponentFixture<QueenslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueenslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueenslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
