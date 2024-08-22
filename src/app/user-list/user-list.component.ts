import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: User[] = [];
  allUsers: User[] = [];
  selectedUser: User | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
    this.filterUsers();
    });
  }

  filterUsers(): void {
    const path = this.route.snapshot.url.map(segment => segment.toString()).join('/');
    console.log('Current route path:', path); // Log to verify path
    if (path === 'users/verified') {
      this.users = this.allUsers.filter(user => user.verified);
    } else if (path === 'users/unverified') {
      this.users = this.allUsers.filter(user => !user.verified);
    } else {
      this.users = this.allUsers; // Default to all users if no specific path
    }
  }

  onUserCreated(user: User): void {
    this.userService.createUser(user).subscribe(
      newUser => {
        this.allUsers.push(newUser);
        this.filterUsers();
      },
      error => console.error('Error creating user', error)
    );
  }

  onDelete(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.allUsers = this.allUsers.filter(user => user.id !== userId);
        this.filterUsers();
      },
      error => console.error('Error deleting user', error)
    );
  }

  onUpdate(user: User): void {
    this.selectedUser = { ...user }; // Ensure we're editing a copy of the user
  }

  onVerify(userId: string): void {
    this.userService.verifyUser(userId).subscribe(
      () => {
        const user = this.allUsers.find(user => user.id === userId);
        if (user) {
          user.verified = !user.verified;
          this.filterUsers();
        }
      },
      error => console.error('Error verifying user', error)
    );
  }

  onView(user: User): void {
    this.selectedUser = this.selectedUser === user ? null : user;
  }

  isEditing(user: User): boolean {
    return this.selectedUser === user;
  }

  onSubmit(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
        updatedUser => {
          const index = this.allUsers.findIndex(user => user.id === updatedUser.id);
          if (index !== -1) {
            this.allUsers[index] = updatedUser;
            this.filterUsers();
          }
          this.selectedUser = null; // Close the form after submitting
        },
        error => console.error('Error updating user', error)
      );
    }
  }


}
