import { Component } from '@angular/core';
import { GlobalService } from './global.service';
import { Subscription } from 'rxjs';

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
    private globalService: GlobalService) {
  }
  ngOnInit() {
    this.initializeUsersList();
  }
  initializeUsersList() {
    this.subscriptions.add(
      this.globalService.getUserList().subscribe((res)=>{
        this.appUsersList = res['users'];
      }));
  }
}
