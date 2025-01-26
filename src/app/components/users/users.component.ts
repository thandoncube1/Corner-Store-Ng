import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
    username: string = "";
    password: string = "";
    api_url: string = "api/v1/";

    constructor(private router: Router, private userService: UserService){}

    submit() {
      // Grab the data inputs and pass them to a Url body parser
      this.userService.userLoginService(this.api_url, {username: this.username, password: this.password}).then(data => {
          console.log(data);
          this.router.navigate(['/']);
      }).catch(error => {
          console.log("Error from Component: ", error);
      });
    }
}
