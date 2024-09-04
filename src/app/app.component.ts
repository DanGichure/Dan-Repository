// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'managementsystem';

  ngOnInit(): void {
    this.applyStoredTheme();
  }

  private applyStoredTheme(): void {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
