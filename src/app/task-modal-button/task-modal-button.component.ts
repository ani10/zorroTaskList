import { Component, OnInit } from '@angular/core';
import { InternalService } from '../internal.service';

@Component({
  selector: 'app-task-modal-button',
  templateUrl: './task-modal-button.component.html',
  styleUrls: ['./task-modal-button.component.scss']
})
export class TaskModalButtonComponent implements OnInit {
  taskModalStatus = false;
  taskModalType = 'Create Task';

  constructor(private internalService: InternalService) { }

  ngOnInit() {
  }
  createTaskDialogToggle() {
    this.internalService.createTaskModalVisibility.next(!this.taskModalStatus);
  }
}
