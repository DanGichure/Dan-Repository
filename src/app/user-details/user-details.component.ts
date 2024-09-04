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
  originalUser: User | null = null; // To store the original user details
  isEditing: boolean = false;
  showConfirmDialog: boolean = false;

  // Temporary variables for skills and interests
  skillsInput: string = '';
  interestsInput: string = '';

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
        this.originalUser = { ...user }; // Clone the user object to compare later
        // Populate temporary input fields
        if (this.user) {
          this.skillsInput = this.user.skills.join(', ');
          this.interestsInput = this.user.interests.join(', ');
        }
      },
      error => console.error('Error fetching user details', error)
    );
  }

  toggleEditForm(): void {
    this.isEditing = !this.isEditing;
  }

  onUpdate(): void {
    this.toggleEditForm();
  }

  onDelete(): void {
    this.showConfirmDialog = true;
  }

  handleDeleteConfirmation(confirmed: boolean): void {
    this.showConfirmDialog = false;
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

  hasChanges(): boolean {
    if (!this.user || !this.originalUser) {
      return false;
    }

    // Compare each field to detect changes
    return this.user.name !== this.originalUser.name ||
           this.user.email !== this.originalUser.email ||
           this.user.phone !== this.originalUser.phone ||
           this.user.address.city !== this.originalUser.address.city ||
           this.user.address.county !== this.originalUser.address.county ||
           this.user.address.country !== this.originalUser.address.country ||
           this.user.occupation !== this.originalUser.occupation ||
           this.user.age !== this.originalUser.age ||
           this.user.company !== this.originalUser.company ||
           this.user.skills.join(', ') !== this.originalUser.skills.join(', ') ||
           this.user.gender !== this.originalUser.gender ||
           this.user.county !== this.originalUser.county ||
           this.user.biography !== this.originalUser.biography ||
           this.user.interests.join(', ') !== this.originalUser.interests.join(', ');
  }

  onSubmit(): void {
    if (this.user) {
      // Convert comma-separated values back to arrays
      this.user.skills = this.skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
      this.user.interests = this.interestsInput.split(',').map(interest => interest.trim()).filter(interest => interest !== '');

      // Reset the verified status if any field has changed
      if (this.hasChanges()) {
        this.user.verified = false;
      }

      this.userService.updateUser(this.user.id, this.user).subscribe(
        updatedUser => {
          this.user = updatedUser;
          this.isEditing = false;
        },
        error => console.error('Error updating user', error)
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
