import { TaskService } from 'src/app/services/task.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkReportService } from 'src/app/services/work-report.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tr[app-task]',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input('taskData')
  task!: Task;

  @Input('taskId')
  currentTaskId!: number;

  day = new Date(Date.now());

  dateId!: number;
  inputForm!: FormGroup;

  inputTime: number = 0;
  totalTime!: number;
  todayTime: number = 0;

  timesReturned?: number[];
  times?: number[];

  currentDate!: number;

  sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private workReportService: WorkReportService
  ) {
    this.inputForm = this.fb.group({
      inputNumber: [],
    });
  }

  ngOnInit(): void {
    this.currentDate = this.day.getDate();

    this.sub = this.workReportService
      .getTaskDate(this.currentTaskId)
      .subscribe((d) => {
        (this.timesReturned = d?.times),
          (this.todayTime =
            this.timesReturned == undefined
              ? 0
              : this.timesReturned[this.currentDate - 1]),
          (this.dateId = d?.id == undefined ? 0 : d?.id);
        this.times = this.timesReturned;
        if (d?.totalTime == undefined) this.totalTime = 0;
        else this.totalTime = d.totalTime;
      });
  }

  createDate(): string {
    const today = new Date(Date.now());
    return `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
  }

  onSubmit() {
    this.inputTime = Number(this.inputForm?.value.inputNumber);
    this.totalTime += this.inputTime;
    this.todayTime += this.inputTime;
  }

  onSave() {
    if (this.times == undefined) return;
    else {
      this.times[this.currentDate - 1] = this.todayTime;
    }

    this.workReportService
      .editTodayTimes(this.dateId, this.times)
      .subscribe((edit) => console.log(edit));

    this.workReportService
      .editTotalTime(this.dateId, this.totalTime)
      .subscribe((edit) => console.log(edit));

    alert('Time saved successfully!');
  }

  onClick1() {
    this.router.navigate(['/users-on-task']);
    this.taskService.setCurrentTaskId(this.currentTaskId);
  }

  onClick2() {
    this.router.navigate(['/project-detail']);
    this.taskService.setCurrentTaskId(this.currentTaskId);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
