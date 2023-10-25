import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from '../models/date-time.model';
import { Observable, map } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class WorkReportService {
  private readonly datesUrl = 'http://localhost:3000/dates/';
  currentDateId!: number;

  alldates$ = this.http.get<DateTime[]>(this.datesUrl);

  dates$ = this.alldates$.pipe(
    map((dates: DateTime[]) =>
      dates.filter((d) => d.userId === this.userService.currentUserId)
    )
  );

  constructor(private http: HttpClient, private userService: UserService) {}

  getAllDates(): Observable<DateTime[]> {
    return this.http.get<DateTime[]>(this.datesUrl);
  }

  getTaskDate(taskId: number): Observable<DateTime | undefined> {
    return this.getAllDates().pipe(
      map((dates: DateTime[]) =>
        dates.find(
          (d) =>
            d.userId === this.userService.currentUserId && d.taskId === taskId,
          console.log(this.userService.currentUserId)
        )
      )
    );
  }

  editTodayTimes(dateId: number, today: number[]): Observable<any> {
    const body = { times: today };
    return this.http.patch(`${this.datesUrl}/${dateId}`, body);
  }

  editTotalTime(dateId: number, totalTime: number): Observable<any> {
    const body = { totalTime: totalTime };
    return this.http.patch(`${this.datesUrl}/${dateId}`, body);
  }
}
