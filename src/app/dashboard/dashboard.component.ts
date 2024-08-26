import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  allUsers: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
      this.setFilter('all'); // Default to showing all users on init
    });
  }

  setFilter(filter: 'all' | 'verified' | 'unverified'): void {
    if (filter === 'all') {
      this.users = [...this.allUsers];
    } else if (filter === 'verified') {
      this.users = this.allUsers.filter(user => user.verified);
    } else if (filter === 'unverified') {
      this.users = this.allUsers.filter(user => !user.verified);
    }
  }

  onView(userId: string): void {
    this.router.navigate(['/users', userId]);
  }
}

