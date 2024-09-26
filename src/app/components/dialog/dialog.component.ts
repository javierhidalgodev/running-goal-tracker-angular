import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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