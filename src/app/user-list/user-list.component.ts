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
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    
    // Subscribe to the refresh notifications
    this.subscription.add(
      this.notificationService.refresh$.subscribe(() => {
        this.loadUsers();
      })
    );

    // Subscribe to route changes
    this.subscription.add(
      this.route.url.subscribe(() => {
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
      this.cdr.detectChanges(); 
    });
  }

  onUserCreated(user: User): void {
    this.userService.createUser(user).subscribe(
      newUser => {
        this.allUsers = [...this.allUsers, newUser];
        this.cdr.detectChanges();
      },
      error => console.error('Error creating user', error)
    );
  }

  onView(userId: string): void {
    const user = this.allUsers.find(u => u.id === userId);
    if (user) {
      this.selectedUser = this.selectedUser === user ? null : user;
    }
    this.router.navigate(['/users', userId]);
  }

}
