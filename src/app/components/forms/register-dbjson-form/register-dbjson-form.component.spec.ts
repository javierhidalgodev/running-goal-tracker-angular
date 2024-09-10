import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDbjsonFormComponent } from './register-dbjson-form.component';

describe('RegisterDbjsonFormComponent', () => {
  let component: RegisterDbjsonFormComponent;
  let fixture: ComponentFixture<RegisterDbjsonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterDbjsonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDbjsonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
