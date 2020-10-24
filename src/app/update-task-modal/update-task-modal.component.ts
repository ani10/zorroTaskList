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
      priority: [null, []],
      assigned_to: [null, []],
    });
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
  handleOk(): void {
    if(this.validateForm.valid){
      let taskId;
      this.subscriptions.add(this.internalService.taskId.subscribe(res => {
        taskId = res;
      }));
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      let postObject = {...this.validateForm.value, taskid: taskId};
      this.subscriptions.add(this.globalService.updateTask(postObject).subscribe(res => {
        console.log(res);
      }))
      this.internalService.editTaskModalVisibility.next(false);
    }
  }

  handleCancel() {
    this.internalService.editTaskModalVisibility.next(false);
  }

}
