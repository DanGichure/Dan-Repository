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

  onSubmit(): void {
    if (this.user) {
      // Convert comma-separated values back to arrays
      this.user.skills = this.skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
      this.user.interests = this.interestsInput.split(',').map(interest => interest.trim()).filter(interest => interest !== '');

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
