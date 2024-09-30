import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalInterface } from '@models/modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private readonly _dialog: MatDialog
  ) { }

  openDialog<CT, T = ModalInterface>(componentRef: ComponentType<CT>, data?: T, isEditing = false) {
    const config = {data, isEditing}

    this._dialog.open(componentRef, {
      data: config,
      width: '400px'
    })
  }

  closeModal(): void {
    this._dialog.closeAll()
  }
}
