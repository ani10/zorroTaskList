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
  previousItem: any;
  actionItem: any;
  appUsersList = [];

  constructor(private globalService: GlobalService,
    private internalService: InternalService) { }

  tasksList = [];
  high = [];
  medium = [];
  low = [];
  ngOnInit() {
    this.initializeTasksList();
    this.initializeUsersList();
    console.log(this.appUsersList)
    this.internalService.deleteTaskItem.subscribe(res=>{
      this.actionItem = res;
      this.deleteLocally(this.actionItem);
    })
    this.internalService.createTaskItem.subscribe(res=>{
      this.actionItem = res;
      this.createLocally(this.actionItem)
    })
    this.internalService.updateTaskItemPrevious.subscribe(res=>{
      this.previousItem=res;
    })
    this.internalService.updateTaskItem.subscribe(res=>{
      this.actionItem = res;
      this.updateLocally(this.previousItem, this.actionItem)
    })
  }
  initializeUsersList() {
    this.subscriptions.add(
      this.globalService.getUserList().subscribe((res)=>{
        console.log(res)
        this.appUsersList = res['users'];
      }));
  }
  createLocally(item){
    if(item['priority'] === "3"){
      this.high.push(item);
    }
    if(item['priority'] === "2"){
      this.medium.push(item);
    }
    if(item['priority'] === "1"){
      this.low.push(item);
    }
  }
  updateLocally(previousItem, item) {
    switch(item['priority']) {
      case "3":
        if(this.high.includes(previousItem)){
          let index = this.high.indexOf(previousItem);
          this.high[index] = item;
        } else {
          this.deleteLocally(previousItem);
          this.high.push(item);;
        }
        break;
      case "2":
        if(this.medium.includes(previousItem)){
          let index = this.medium.indexOf(previousItem);
          this.medium[index] = item;
        } else {
          this.deleteLocally(previousItem);
          this.medium.push(item);;
        }
        break;
      case '1':
        if(this.low.includes(previousItem)){
          let index = this.low.indexOf(previousItem);
          this.low[index] = item;
        } else {
          this.deleteLocally(previousItem);
          this.low.push(item);;
        }
        break;
    }
  }
  deleteLocally(item){
    switch(item['priority']){
      case '3':
        if(this.high.includes(item)){
          let index = this.high.indexOf(item);
          this.high.splice(index, 1);
        }
        break;
      case '2':
        if(this.medium.includes(item)) {
          let index = this.medium.indexOf(item);
          this.medium.splice(index, 1);
        }
        break;
        case '1':
        if(this.low.includes(item)){
          let index = this.low.indexOf(item);
          this.low.splice(index, 1);
        }
        break;
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
    } else {
      let postObject = new FormData();
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
        postObject.append('message', event.container.data[event.currentIndex]['message'])
        switch(event.container.id) {
          case 'cdk-drop-list-1':
            postObject.append('priority', '3');
            break;
          case 'cdk-drop-list-3':
            postObject.append('priority', '2');
            break;
          case 'cdk-drop-list-5':
            postObject.append('priority', '1');
            break;
        }
        postObject.append('taskid', event.container.data[event.currentIndex]['id'])
        this.globalService.updateTask(postObject).subscribe(res => console.log(res))
    }
  }
}
