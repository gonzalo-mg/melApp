import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiarieslistComponent } from './apiarieslist.component';

describe('ApiarieslistComponent', () => {
  let component: ApiarieslistComponent;
  let fixture: ComponentFixture<ApiarieslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiarieslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiarieslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
