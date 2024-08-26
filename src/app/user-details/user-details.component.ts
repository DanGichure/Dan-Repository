import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null;
  isEditing: boolean = false; // Flag to show/hide the edit form
  showConfirmDialog: boolean = false; // Flag to show/hide the confirmation dialog

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
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

  toggleEditForm(): void {
    this.isEditing = !this.isEditing; // Toggle the visibility of the edit form
  }

  onUpdate(): void {
    this.toggleEditForm(); // Show the edit form
  }

  onDelete(): void {
    this.showConfirmDialog = true; // Show the confirmation dialog
  }

  handleDeleteConfirmation(confirmed: boolean): void {
    this.showConfirmDialog = false; // Hide the confirmation dialog
    if (confirmed && this.user) {
      this.userService.deleteUser(this.user.id).subscribe(
        () => {
          this.router.navigate(['/users']);
        },
        error => console.error('Error deleting user', error)
      );
    }
  }

  onVerify(): void {
    if (this.user) {
      this.userService.verifyUser(this.user.id).subscribe(
        () => {
          if (this.user) {
            this.user.verified = !this.user.verified;
          }
        },
        error => console.error('Error verifying user', error)
      );
    }
  }

  onSubmit(): void {
    if (this.user) {
      this.userService.updateUser(this.user.id, this.user).subscribe(
        updatedUser => {
          this.user = updatedUser;
          this.isEditing = false; // Hide the edit form after successful update
        },
        error => console.error('Error updating user', error)
      );
    }
  }
}
