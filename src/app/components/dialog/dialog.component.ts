import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  logout: boolean = false

  constructor (public dialogRef: MatDialogRef<DialogComponent>) {}

  closeDialog (action: boolean) {
    this.dialogRef.close(action)
  }
}