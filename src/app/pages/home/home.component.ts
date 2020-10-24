import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Subscription, Observable } from 'rxjs';
import { InternalService } from 'src/app/internal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  actionItem: any;

  constructor(private globalService: GlobalService,
    private internalService: InternalService) { }

  tasksList = [];
  high = [];
  medium = [];
  low = [];
  ngOnInit() {
    this.initializeTasksList();
    this.internalService.deleteTaskItem.subscribe(res=>{
      console.log(res);
      this.actionItem = res;
      this.deleteLocally(this.actionItem);
    })
  }
  deleteLocally(item){
    if(this.high.includes(item)){
      let index = this.high.indexOf(item);
      this.high.splice(index, 1);
    }
    if(this.medium.includes(item)){
      let index = this.medium.indexOf(item);
      this.medium.splice(index, 1);
    }
    if(this.low.includes(item)){
      let index = this.low.indexOf(item);
      this.low.splice(index, 1);
    }
  }
  initializeTasksList() {
    this.subscriptions.add(
      this.globalService.getTaskList().subscribe((res)=>{
        this.tasksList = res['tasks'];
        this.tasksList.map(item => {
          let priority = item.priority;
          switch(priority) {
            case '1':
              this.low.push(item);
              break;
            case '2':
              this.medium.push(item)
              break;
            case '3':
              this.high.push(item)
              break;
          }
        });
      }));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex)
    }
  }
}
