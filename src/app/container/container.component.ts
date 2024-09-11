import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

  menuVisible :boolean = false;
  
  constructor(private auth : AuthenticationService) { }

  ngOnInit() {
      this.menuVisible = this.auth.isLogged();
  }

}
