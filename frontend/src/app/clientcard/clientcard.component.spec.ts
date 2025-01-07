import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientcardComponent } from './clientcard.component';

describe('ClientcardComponent', () => {
  let component: ClientcardComponent;
  let fixture: ComponentFixture<ClientcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
