import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router // Inject Router service
  ) { }

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

  // Navigate to user details page
  onView(userId: string): void {
    // Find the user with the given ID
    const user = this.allUsers.find(u => u.id === userId);
    if (user) {
      this.selectedUser = this.selectedUser === user ? null : user; // Toggle selection
    }
    // Navigate to the user details page
    this.router.navigate(['/users', userId]);
  }
  
}
