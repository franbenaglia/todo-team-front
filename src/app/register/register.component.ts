import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  //email: string;
  //password: string;
  //name: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });

  }

  register(): void {

    let mail: string = this.registerForm.get('email').value;
    let password: string = this.registerForm.get('password').value;
    let name: string = this.registerForm.get('name').value;

    this.auth.register(mail, password, name).subscribe(x => { console.log(x) });

  }

  login() {
    window.location.reload();
  }

}

