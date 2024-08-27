// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://66bb4f506a4ab5edd637fac2.mockapi.io/api/vi/dan'; // Corrected API URL

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
      .pipe(catchError(this.handleError<User[]>('getUsers', [])));
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`)
      .pipe(catchError(this.handleError<User>(`getUser id=${id}`)));
  }

  createUser(user: Omit<User, 'avatar'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('createUser')),
        // Notify the application that a user has been created
        tap(() => this.notificationService.triggerRefresh())
      );
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('updateUser')),
        // Notify the application that a user has been updated
        tap(() => this.notificationService.triggerRefresh())
      );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<void>('deleteUser')));
  }

  verifyUser(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/users/${id}/verify`, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('verifyUser')),
        // Notify the application that a user has been verified
        tap(() => this.notificationService.triggerRefresh())
      );
  }
}


