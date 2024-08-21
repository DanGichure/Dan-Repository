import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}

  onUserCreated(user: User): void {
    this.userService.createUser(user).subscribe(
      newUser => {
        this.users.push(newUser);
      },
      error => console.error('Error creating user', error)
    );
  }
}


