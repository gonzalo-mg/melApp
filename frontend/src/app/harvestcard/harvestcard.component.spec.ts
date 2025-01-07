import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestcardComponent } from './harvestcard.component';

describe('HarvestcardComponent', () => {
  let component: HarvestcardComponent;
  let fixture: ComponentFixture<HarvestcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
