import { Component } from '@angular/core';
import { GlobalService } from './global.service';
import { Subscription } from 'rxjs';
import { InternalService } from './internal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  appUsersList = [];
  subscriptions: Subscription = new Subscription();

  constructor(
    private globalService: GlobalService,
    private internalService: InternalService) {
  }
  ngOnInit() {
    this.initializeUsersList();
  }
  initializeUsersList() {
    this.subscriptions.add(
      this.globalService.getUserList().subscribe((res)=>{
        this.appUsersList = res['users'];
        this.internalService.userList.next(this.appUsersList);
      }));
  }
}
