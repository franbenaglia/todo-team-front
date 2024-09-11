import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../model/Task';
import { FileUploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-card-min',
  templateUrl: './card-min.component.html',
  styleUrl: './card-min.component.scss'
})
export class CardMinComponent implements OnInit {

  @Input() task: Task;

  title: String;

  description: String;

  constructor() {
  }

  ngOnInit(): void {
    if (this.task) {
      this.title = this.task.title;
      this.description = this.task.description;
    }

  }

}
