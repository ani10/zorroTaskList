import { Component, Input, HostListener, OnInit, OnDestroy } from '@angular/core';
import { InternalService } from '../internal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from '../global.service';
import { Users } from '../data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent implements OnInit, OnDestroy {

  isVisible: boolean;
  @Input() userList: Users[];
  title = 'Create Task';
  priority = ['low', 'medium', 'high'];
  validateForm!: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(
    private internalService: InternalService,
    private globalService: GlobalService,
    private fb: FormBuilder) {}
  ngOnInit() {
    this.subscriptions.add(
      this.internalService.createTaskModalVisibility.subscribe(status => {
      this.isVisible = status;
    }));
    this.validateForm = this.fb.group({
      message: [null, [Validators.required]],
      due_date: [null, []],
      priority: [1, []],
      assigned_to: [null, []],
    });
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
  handleOk(): void {
    if(this.validateForm.valid){
      let postObject = new FormData();
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
        postObject.append(i, this.validateForm.controls[i].value)
      }
      this.subscriptions.add(this.globalService.createTask(postObject).subscribe(res => {
        if(res['status'] == 'success') {
          this.internalService.createTaskItem.next(this.validateForm.value)
        }
      }))
      this.subscriptions.add(this.internalService.createTaskModalVisibility.next(false));
    }
  }
  handleCancel() {
    this.internalService.createTaskModalVisibility.next(false);
    this.validateForm.reset();
  }
}
