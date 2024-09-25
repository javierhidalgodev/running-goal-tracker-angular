import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWithLoadSpinnerComponent } from './button-with-load-spinner.component';

describe('ButtonWithLoadSpinnerComponent', () => {
  let component: ButtonWithLoadSpinnerComponent;
  let fixture: ComponentFixture<ButtonWithLoadSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonWithLoadSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonWithLoadSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
