import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  taskList: any;
  constructor(private http: HttpClient) {
  }

  getTaskList(): Observable<any[]> {
    let header = new HttpHeaders().set(
      "AuthToken",
      "3UQLDSANnFDoIDMGMVjuanthCUcQopeW"
    );
    return this.http.get<any[]>('https://devza.com/tests/tasks/list', {headers:header})
  }
  getUserList(): Observable<any[]> {
    let header = new HttpHeaders().set(
      "AuthToken",
      "3UQLDSANnFDoIDMGMVjuanthCUcQopeW"
    );
    return this.http.get<any[]>('https://devza.com/tests/tasks/listusers', {headers:header})
  }
  createTask(postObject: FormData): Observable<any[]> {
    let header = new HttpHeaders().set(
      "AuthToken",
      "3UQLDSANnFDoIDMGMVjuanthCUcQopeW"
    );
    return this.http.post<any[]>('https://devza.com/tests/tasks/create', postObject, {headers:header})
  }
  updateTask(postObject): Observable<any[]> {
    let header = new HttpHeaders().set(
      "AuthToken",
      "3UQLDSANnFDoIDMGMVjuanthCUcQopeW"
    );
    return this.http.post<any[]>('https://devza.com/tests/tasks/update', postObject, {headers:header})
  }
  deleteTask(postObject): Observable<any[]> {
    let header = new HttpHeaders().set(
      "AuthToken",
      "3UQLDSANnFDoIDMGMVjuanthCUcQopeW"
    );
    return this.http.post<any[]>('https://devza.com/tests/tasks/delete', postObject, {headers:header})
  }
}
