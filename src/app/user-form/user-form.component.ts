import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  isModalOpen = false;
  
  // Temporary variables for input
  skillsInput: string = '';
  interestsInput: string = '';

  user: User = {
    name: '',
    email: '',
    phone: '',
    address: {
      city: '',
      postalCode: '',
      county: '',
      country: ''
    },
    occupation: '',
    age: null,
    company: '',
    skills: [],
    gender: 'Male',
    county: '',
    biography: '',
    interests: [],
    verified: false,
    id: '',
    createdAt: new Date(),
    avatar: ''
  };

  @Output() userCreated = new EventEmitter<User>();

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  onSubmit(): void {
    // Convert comma-separated skills and interests into arrays
    this.user.skills = this.skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    this.user.interests = this.interestsInput.split(',').map(interest => interest.trim()).filter(interest => interest !== '');
    
    // Emit the user object
    this.userCreated.emit(this.user);

    // Reset form
    this.resetForm();
    this.toggleModal(); // Close modal after submission
  }

  private resetForm(): void {
    this.user = {
      name: '',
      email: '',
      phone: '',
      address: {
        city: '',
        postalCode: '',
        county: '',
        country: ''
      },
      occupation: '',
      age: null,
      company: '',
      skills: [],
      gender: 'Male',
      county: '',
      biography: '',
      interests: [],
      verified: false,
      id: '',
      createdAt: new Date(),
      avatar: ''
    };

    // Reset temporary input fields
    this.skillsInput = '';
    this.interestsInput = '';
  }
}
