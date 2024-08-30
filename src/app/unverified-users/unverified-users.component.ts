import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-unverified-users',
  templateUrl: './unverified-users.component.html',
  styleUrls: ['./unverified-users.component.css']
})
export class UnverifiedUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users.filter(user => !user.verified);
    });
  }
}

