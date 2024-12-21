import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardcardComponentComponent } from './boardcard-component.component';

describe('BoardcardComponentComponent', () => {
  let component: BoardcardComponentComponent;
  let fixture: ComponentFixture<BoardcardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardcardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardcardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
