import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent1 } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent1;
  let fixture: ComponentFixture<PopupComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupComponent1 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
