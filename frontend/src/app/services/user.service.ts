import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersUrl = 'http://localhost:3000/users/';
  currentUserId!: number;
  currentUser!: Observable<User>;

  relatedUsers: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(userId: number): Observable<User | undefined> {
    return this.http.get<User>(this.usersUrl + userId);
  }

  getRelatedUsers(taskId: number): Observable<User[]> {
    return this.getUsers().pipe(
      map((users: User[]) =>
        users.filter((user) =>
          user.relatedTasksId.find((relatedTaskId) => relatedTaskId === taskId)
        )
      )
    );
  }

  setCurrentUserId(currentUserId: number) {
    this.currentUserId = currentUserId;
  }

  addUser(data: any): Observable<any> {
    return this.http.post(this.usersUrl, data);
  }
}
