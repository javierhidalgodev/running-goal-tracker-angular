import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { authFirestoreGuard } from './auth-firestore.guard';

describe('authFirestoreGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authFirestoreGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
