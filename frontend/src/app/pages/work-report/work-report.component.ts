import { WorkReportService } from '../../services/work-report.service';
import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Subscription, combineLatest, map } from 'rxjs';
import { DateTime } from 'src/app/models/date-time.model';

@Component({
  selector: 'app-work-report',
  templateUrl: './work-report.component.html',
  styleUrls: ['./work-report.component.css'],
})
export class WorkReportComponent implements OnInit {
  today = new Date(Date.now());
  month = this.today.getMonth() + 1;
  numOfDays: number = 31;
  days: number[] = [];
  reportTasks: Task[] = [];
  userDates: DateTime[] = [];
  sub1!: Subscription;
  sub2!: Subscription;
  subs!: Subscription[];

  tasksWithDates$ = combineLatest([
    this.taskService.relatedTasks$,
    this.workReportService.dates$,
  ]).pipe(
    map(([tasks, dates]) => {
      return tasks.map(
        (task) =>
          ({
            ...task,
            times: dates.find((d) => task.id === d.taskId)?.times,
            totalTime: dates.find((d) => task.id === d.taskId)?.totalTime,
          } as Task)
      );
    })
  );

  constructor(
    private taskService: TaskService,
    private workReportService: WorkReportService
  ) {}

  ngOnInit(): void {
    if (this.month == 2) this.numOfDays = 28;
    else if (
      this.month == 2 ||
      this.month == 4 ||
      this.month == 6 ||
      this.month == 9
    )
      this.numOfDays = 30;
    else this.month = 31;

    for (let i = 1; i <= this.numOfDays; i++) this.days?.push(i);
    console.log(this.month);
    console.log(this.numOfDays);
    console.log(this.days);
  }
}
