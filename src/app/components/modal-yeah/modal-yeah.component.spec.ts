import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalYeahComponent } from './modal-yeah.component';

describe('ModalYeahComponent', () => {
  let component: ModalYeahComponent;
  let fixture: ComponentFixture<ModalYeahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalYeahComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalYeahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
