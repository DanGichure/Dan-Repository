import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  isDropdownOpen = false;
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
    createdAt: new Date,
    avatar: ''
  };

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @Output() userCreated = new EventEmitter<User>();

  onSubmit(): void {
    this.userCreated.emit(this.user);
    this.resetForm();
    this.isDropdownOpen = false;
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
    createdAt: new Date,
    avatar: ''
    };
  }
}
