import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../model/Task';
import { User } from '../model/User';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() task: Task;

  @Input() image: any;

  renderImage: boolean = false;

  @Input() users: User[] | undefined;

  @Input() isButtonVisible: Boolean;

  @Output() newCardEvent = new EventEmitter<FormGroup>;

  @Output() closeEvent = new EventEmitter<Boolean>;

  @Output() deleteEvent = new EventEmitter<FormGroup>;

  @ViewChild('fileInput') fileInput: ElementRef;

  placeHolder: string;

  user: User = new User();

  title: String;

  url: String = '';

  constructor() {
  }

  ngOnInit(): void { 
    if (this.task) {
      this.clearFile();
      this.loadTask();
      console.log('laimagen: ');
      console.log(this.image);
      this.user = this.task.user;
      this.placeHolder = this.user ? 'Change User' : 'Select user';
      this.title = this.task.title;
    }
  }

  form = new FormGroup({
    "id": new FormControl(),
    "title": new FormControl("", Validators.required),
    "dir": new FormControl("", Validators.required),
    "description": new FormControl("", Validators.required),
    avatar: new FormControl(""),
    "user": new FormControl<User | null>(null),
    //"user": new FormGroup(
    //  {
    //    id: new FormControl(),
    //    "name": new FormControl("name", Validators.required)
    //  })
  });


  onSubmit() {
    this.newCardEvent.emit(this.form);
    this.closeEvent.emit(true);
  }

  delete($event: MouseEvent) {
    this.deleteEvent.emit(this.form);
    this.closeEvent.emit(true);
  }

  closeModal($event: MouseEvent) {
    this.task = null;
    this.closeEvent.emit(true);
  }

  loadTask() {
    this.form.patchValue({
      id: this.task.id,
      title: this.task.title,
      dir: this.task.dir,
      description: this.task.description,
      user: this.task.user,
    });
  }

  keyPress($event: KeyboardEvent) {
    this.isButtonVisible = true;
  }

  onFileChange(event) {
    console.log('laimagen: ');
    console.log(this.image);
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }

  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }


}