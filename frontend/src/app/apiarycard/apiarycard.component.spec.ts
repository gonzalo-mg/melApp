import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiarycardComponent } from './apiarycard.component';

describe('ApiarycardComponent', () => {
  let component: ApiarycardComponent;
  let fixture: ComponentFixture<ApiarycardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiarycardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiarycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
