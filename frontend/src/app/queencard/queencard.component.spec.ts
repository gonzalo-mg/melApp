import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueencardComponent } from './queencard.component';

describe('QueencardComponent', () => {
  let component: QueencardComponent;
  let fixture: ComponentFixture<QueencardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueencardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueencardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
