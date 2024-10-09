import { CanActivateChildFn } from '@angular/router';

export const authFirestoreGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
