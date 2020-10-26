import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalService {

  createTaskModalVisibility = new Subject<boolean>();
  editTaskModalVisibility = new Subject<boolean>();

  createTaskItem = new Subject<any>();
  userList = new Subject<any[]>();
  updateTaskItemPrevious = new Subject<any>();
  updateTaskItem = new Subject<any>();
  deleteTaskItem = new Subject<any>();
  constructor() { }
}
