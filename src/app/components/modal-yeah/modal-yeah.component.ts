import { Component, inject, OnInit } from '@angular/core';
import { ModalService } from '@services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoalService } from '@services/goal.service';
import { ModalInterface } from '@models/modal.model';

@Component({
  selector: 'app-modal-yeah',
  templateUrl: './modal-yeah.component.html',
  styleUrl: './modal-yeah.component.scss'
})
export class ModalYeahComponent {
  matDialog = inject(MAT_DIALOG_DATA)
  
  constructor (
    private readonly _modalService: ModalService,
    private readonly _goalService: GoalService,
  ) { }

  // ngOnInit(): void {
  //   console.log(this.matDialog)
  // }
}