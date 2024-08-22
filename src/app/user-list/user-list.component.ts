import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input () users: User[] = [];
  selectedUser: User | null = null;

  //Check if we are in edit mode
  isEditingMode: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  onUserCreated(user: User): void {
    this.userService.createUser(user).subscribe(
      newUser => {
        this.users.push(newUser);
      },
      error => console.error('Error creating user', error)
    );
  }

  onDelete(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== userId);
      },
      error => console.error('Error deleting user', error)
    );
  }

  
  onUpdate(user: User): void {
    this.selectedUser = {...user };
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
        updatedUser => {
          const index = this.users.findIndex(user => user.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.selectedUser = null;
          this.isEditingMode = true;
        },
        error => console.error('Error updating user', error)
      );
    }
  }
  

  onVerify(userId: string): void {
    this.userService.verifyUser(userId).subscribe(
      () => {
        const user = this.users.find(user => user.id === userId);
        if (user) {
          user.verified = !user.verified;
        }
      },
      error => console.error('Error verifying user', error)
    );
  }

  onView(user: User): void {
    this.selectedUser = this.selectedUser === user ? null : user;
  }

  isEditing(user: User): boolean {
    return this.isEditingMode && this.selectedUser === user;
  }

  OnSubmit(): void {
    if(this.selectedUser) {
      this.onUpdate(this.selectedUser)
    }
  }
}