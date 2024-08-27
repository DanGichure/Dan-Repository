import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { NotificationService } from '../notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  @Input() users: User[] = [];
  allUsers: User[] = [];
  selectedUser: User | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    // Subscribe to the refresh notifications
    this.subscription.add(
      this.notificationService.refresh$.subscribe(() => {
        this.loadUsers();
      })
    );
  }

  ngOnDestroy(): void {
    // Clean up the subscription to avoid memory leaks
    this.subscription.unsubscribe();
  }


  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
      this.filterUsers();
      this.cdr.detectChanges(); // Manually trigger change detection
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
      this.users = [...this.allUsers]; // Create a new array to ensure change detection
    }
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  onUserCreated(user: User): void {
    this.userService.createUser(user).subscribe(
      newUser => {
        this.allUsers = [...this.allUsers, newUser]; // Use a new array to trigger change detection
        this.filterUsers();
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error => console.error('Error creating user', error)
    );
  }

  

  onView(userId: string): void {
    const user = this.allUsers.find(u => u.id === userId);
    if (user) {
      this.selectedUser = this.selectedUser === user ? null : user; // Toggle selection
    }
    this.router.navigate(['/users', userId]);
  }
}
