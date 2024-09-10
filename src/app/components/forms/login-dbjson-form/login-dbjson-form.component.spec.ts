import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDbjsonFormComponent } from './login-dbjson-form.component';

describe('LoginDbjsonFormComponent', () => {
  let component: LoginDbjsonFormComponent;
  let fixture: ComponentFixture<LoginDbjsonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginDbjsonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDbjsonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
