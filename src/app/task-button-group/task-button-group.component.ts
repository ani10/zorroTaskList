import { Component, OnInit, Input } from '@angular/core';
import { InternalService } from '../internal.service';
import { GlobalService } from '../global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-button-group',
  templateUrl: './task-button-group.component.html',
  styleUrls: ['./task-button-group.component.scss']
})
export class TaskButtonGroupComponent implements OnInit {
  @Input() item: any
  taskModalStatus = false;
  subscriptions: Subscription = new Subscription();
  taskModalType = 'Edit Task';
  constructor(private internalService: InternalService,
    private globalService: GlobalService) { }

  ngOnInit() {
  }
  updateTask(id){
    console.log(id)
    this.internalService.taskModalVisibility.next(!this.taskModalStatus);
    this.internalService.taskModalType.next(this.taskModalType);
    this.internalService.taskId.next(id)
  }
  reassign() {
    console.log('reassign triggered');
  }
  deleteTask(id){
    console.log(id)
    this.subscriptions.add(
    this.globalService.deleteTask(id).subscribe(res => {console.log(res)}))
  }
}
