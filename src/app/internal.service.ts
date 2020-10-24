import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalService {

  createTaskModalVisibility = new Subject<boolean>();
  editTaskModalVisibility = new Subject<boolean>();

  updateTaskItem = new Subject<any>();
  constructor() { }
}
