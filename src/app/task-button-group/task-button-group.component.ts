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
  updateTask(item){
    console.log(item)
    this.internalService.editTaskModalVisibility.next(!this.taskModalStatus);
    this.internalService.updateTaskItem.next(item)
  }
  deleteTask(id){
    let postObject = new FormData();
    postObject.append('taskid', id)
    this.subscriptions.add(
    this.globalService.deleteTask(postObject).subscribe(res => {console.log(res)}))
  }
}
