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
  searchTerm: string = '';

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => console.error('Error loading users', error)
    );
  }

  onUserCreated(user: User): void {
    this.userService.createUser(user).subscribe(
      newUser => {
        this.users.push(newUser);
      },
      error => console.error('Error creating user', error)
    );
  }

  get filteredUsers(): User[] {
    if (!this.searchTerm.trim()) {
      return this.users;
    }
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(searchTermLower)
    );
  }
}
