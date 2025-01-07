import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestlistComponent } from './harvestlist.component';

describe('HarvestlistComponent', () => {
  let component: HarvestlistComponent;
  let fixture: ComponentFixture<HarvestlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
