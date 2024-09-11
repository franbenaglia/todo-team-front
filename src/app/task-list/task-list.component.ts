import { Component } from '@angular/core';
import { Task } from '../model/Task';
import { CardService } from '../services/card.service';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { TableLazyLoadEvent, TablePageEvent } from 'primeng/table';
import { TaskResponse } from '../model/TaskResponse';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../model/User';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  tasks: Task[] = [];
  selectedTask: Task;
  basicShow: boolean = false;
  task: Task;
  users: User[] = [];
  totalRecords: number;
  loading: boolean = true;
  retrievedImage: any;
  retrievedSanitizedImage: any;
  rows: number = 10;

  //https://primeng.org/table
  //ver row edit, ver variable size, ver lazy load (paginacion servidor), export , context menu
  // instalar primeflex
  // ver draggable para eliminar o cambiar de estado (ver trello)
  constructor(private cardService: CardService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig, private readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.loadUsers();
  }

  loadUsers() {
    this.cardService.getAllUsers().subscribe(users => {
      this.users = users;
    }
    );
  }

  addTask(form: FormGroup) {
    this.cardService.addOrUpdateTaskWithFile(form).subscribe(task => {
      console.log(task)
      this.show('Success');
      this.loadTasksPaginated(null);
    });
  }

  pageChange($event: TablePageEvent) {

  }

  loadTasksPaginated($event: TableLazyLoadEvent) {

    this.tasks.length = 0;
    let first = $event ? $event.first : 1;
    let rows = $event ? $event.rows : this.rows;
    console.log($event.sortField);
    console.log($event.sortOrder);
    this.cardService.getTasksPaginated(first, rows).subscribe(
      (response: TaskResponse) => {

        this.tasks = response.tasks;
        this.totalRecords = response.totalRecords;
        this.loading = false;

      }
    );

  }

  deleteTask(form: FormGroup) {
    let t: Task = Object.assign(new Task(), form.value);
    this.cardService.deleteTask(t).subscribe(mes => {
      this.loadTasksPaginated(null);
    });
  }

  show(message: string) {
    this.messageService.add({
      severity: 'success', summary: message,
      detail: message
    });
  }

  showDialog(id: number | null) {
    if (id) {
      this.cardService.getTask(id).subscribe(task => {
        console.log(task);
        this.task = task;
        this.basicShow = true;
        this.getImage(id);
      });
    } else {
      this.task = null;
      this.basicShow = !this.basicShow;
    }
  }

  closeModal($event: Boolean) {
    this.showDialog(null);
  }

  getImage(taskId: number) {
    this.retrievedSanitizedImage = null;
    this.retrievedImage = null;
    return this.cardService.getTaskImage(taskId).subscribe((src) => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.retrievedImage = reader.result;
        console.log(this.retrievedImage);
        this.retrievedSanitizedImage = this.sanitizer.bypassSecurityTrustUrl(this.retrievedImage);
      }, false);

      if (src) {
        reader.readAsDataURL(src);
      }
    });
  }

}
