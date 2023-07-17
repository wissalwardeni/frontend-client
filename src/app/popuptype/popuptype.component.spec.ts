import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuptypeComponent } from './popuptype.component';

describe('PopuptypeComponent', () => {
  let component: PopuptypeComponent;
  let fixture: ComponentFixture<PopuptypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopuptypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopuptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
