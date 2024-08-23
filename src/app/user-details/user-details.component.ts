import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service'; // Adjust the path as necessary
import { User } from '../../models/user'; // Adjust the path as necessary

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'] // Fix `styleUrls` typo
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null; // Define the type according to your user model

  constructor(
    private route: ActivatedRoute,
    private userService: UserService // Inject UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUserDetails(this.userId);
    }
  }

  loadUserDetails(userId: string): void {
    this.userService.getUser(userId).subscribe(
      (user: User) => {
        this.user = user;
      },
      error => console.error('Error fetching user details', error)
    );
  }
}

