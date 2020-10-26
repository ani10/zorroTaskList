import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../data.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InternalService } from '../internal.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.scss']
})
export class UpdateTaskModalComponent implements OnInit {

  isVisible: boolean;
  @Input() userList: Users[];
  title = 'Edit Task';
  priority = ['low', 'medium', 'high'];
  validateForm!: FormGroup;
  subscriptions: Subscription = new Subscription();
  taskid: string;

  constructor(
    private internalService: InternalService,
    private globalService: GlobalService,
    private fb: FormBuilder) {}
  ngOnInit() {
    this.subscriptions.add(
      this.internalService.editTaskModalVisibility.subscribe(status => {
      this.isVisible = status;
    }));
    this.validateForm = this.fb.group({
      message: [null, [Validators.required]],
      due_date: [null, []],
      priority: [1, []],
      assigned_to: [null, []],
    });
    this.subscriptions.add(
      this.internalService.updateTaskItemPrevious.subscribe(status => {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].setValue(status[i]);
        this.taskid = status['id']
      }
    }));
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
  handleOk(): void {
    if(this.validateForm.valid){
      let postObject = new FormData();
      for (const i in this.validateForm.controls) {
        postObject.append(i, this.validateForm.controls[i].value);
      }
      postObject.append('taskid', this.taskid);
      this.subscriptions.add(this.globalService.updateTask(postObject).subscribe(res => {
        if(res['status'] == 'success') {
          this.internalService.updateTaskItem.next(this.validateForm.value);
        }
      }))
      this.internalService.editTaskModalVisibility.next(false);
    }
  }
  handleCancel() {
    this.internalService.editTaskModalVisibility.next(false);
  }

}
