import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { Task } from '../model/Task';
import { CardService } from '../services/card.service';
import { FormGroup } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticationService } from '../services/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../model/User';

@Component({
  selector: 'app-carousel-min',
  templateUrl: './carousel-min.component.html',
  styleUrl: './carousel-min.component.scss'
})
export class CarouselMinComponent {

  user: String = '';
  users: User[] = [];

  tasks: Task[] = [];

  task: Task;

  initializedTasks: Task[] = [];
  asignedTasks: Task[] = [];
  finishedTasks: Task[] = [];

  draggedTask: Task | undefined | null;

  BasicShow: boolean = false;

  retrievedImage: any;
  retrievedSanitizedImage: any;

  constructor(private auth: AuthenticationService, private cardService: CardService, private primengConfig: PrimeNGConfig, private readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.auth.getUserData().subscribe(user => {
      this.user = user.username;
      this.loadTasks();
      this.loadUsers();
    });

  }

  addTask(form: FormGroup) {
    this.cardService.addOrUpdateTaskWithFile(form).subscribe(task => {
      console.log(task)
      this.loadTasks();
    });
  }

  deleteTask(form: FormGroup) {
    let t: Task = Object.assign(new Task(), form.value);
    this.cardService.deleteTask(t).subscribe(mes => {
      console.log(mes);
      this.loadTasks();
    });
  }

  loadTasks() {

    this.asignedTasks.length = 0;
    this.initializedTasks.length = 0;
    this.finishedTasks.length = 0;

    this.cardService.getTasksByUserAndState(this.user, 'ASSIGNED').subscribe(
      task => {
        this.asignedTasks = task;
        if (this.asignedTasks.length === 0) {
          let task = new Task();
          task.description = 'DROP HERE';
          task.state = 'ASSIGNED';
          this.asignedTasks.push(task);
        };
      });

    this.cardService.getTasksByUserAndState(this.user, 'FINISHED').subscribe(
      task => {
        this.finishedTasks = task;
        if (this.finishedTasks.length === 0) {
          let task = new Task();
          task.description = 'DROP HERE';
          task.state = 'FINISHED';
          this.finishedTasks.push(task);
        };
      });

    this.cardService.getTasksByUserAndState(this.user, 'INITIALIZED').subscribe(
      task => {
        this.initializedTasks = task
        if (this.initializedTasks.length === 0) {
          let task = new Task();
          task.description = 'DROP HERE';
          task.state = 'INITIALIZED';
          this.initializedTasks.push(task);
        };
      });

  };

  loadUsers() {
    this.cardService.getAllUsers().subscribe(users =>
      this.users = users
    );
  }

  showDialog(id: number | null) {
    if (id) {
      this.cardService.getTask(id).subscribe(task => {
        this.task = task;
        this.BasicShow = true;
        this.getImage(id);
      });
    } else {
      this.task = null;
      this.BasicShow = !this.BasicShow;
    }
  }

  getImage(taskId: number) {

    return this.cardService.getTaskImage(taskId).subscribe((src) => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.retrievedImage = reader.result;
        this.retrievedSanitizedImage = this.sanitizer.bypassSecurityTrustUrl(this.retrievedImage);
        console.log(this.retrievedSanitizedImage);
      }, false);

      if (src) {
        reader.readAsDataURL(src);
        //console.log(src);
      }
    });
  }

  closeModal($event: Boolean) {
    this.showDialog(null);
  }

  dragStart(task: Task) {
    this.draggedTask = task;
  }

  dragEnd() {
    this.draggedTask = null;
  }

  drop(state: string) {

    if (this.draggedTask) {

      console.log(this.draggedTask);

      this.draggedTask.state = state;

      console.log('state:' + state);

      if (state === 'ASSIGNED') {
        console.log('ASSIGNED');
        if (this.asignedTasks.length === 1) {
          this.asignedTasks[0].state = 'dropped';
        }
        this.asignedTasks = [this.draggedTask, ...(this.asignedTasks as Task[])];
        console.log('ASSIGNED' + this.asignedTasks);
      }
      if (state === 'FINISHED') {
        console.log('FINISHED');
        if (this.finishedTasks.length === 1) {
          this.finishedTasks[0].state = 'dropped';
        }
        this.finishedTasks = [this.draggedTask, ...(this.finishedTasks as Task[])];
        console.log('ASSIGNED' + this.finishedTasks);
      }
      if (state === 'INITIALIZED') {
        console.log('INITIALIZED');
        if (this.initializedTasks.length === 1) {
          this.initializedTasks[0].state = 'dropped';
        }
        this.initializedTasks = [this.draggedTask, ...(this.initializedTasks as Task[])];
        console.log('ASSIGNED' + this.initializedTasks);
      }

      this.cardService.changeStateTask(this.draggedTask, state).subscribe({
        next: (v) => {
          console.log(v);
          console.log('UPDATED');
        },
        error: (e) => {
          console.error(e);
          this.loadTasks();
          //SHOW MESSAGE
        },
        complete: () => console.log('')
      });

      this.draggedTask = null;

    }
  }

  private findIndex(task: Task) {
    let index = -1;
    for (let i = 0; i < (this.initializedTasks as Task[]).length; i++) {
      if (task.id === (this.initializedTasks as Task[])[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }


}




//this.initializedTasks = this.initializedTasks?.filter(  (val, i) => i != draggedTaskIndex);
//this.initializedTasks = [...(this.initializedTasks as Task[]), this.draggedTask];
//let draggedTaskIndex = this.findIndex(this.draggedTask);
//this.loadTasks();