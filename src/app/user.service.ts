import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://66bb4f506a4ab5edd637fac2.mockapi.io/api/vi/dan/';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private createUrl(endpoint: string, id?: string): string {
    return id ? `${this.apiUrl}/${endpoint}/${id}` : `${this.apiUrl}/${endpoint}`;
  }

  private makeRequest<T>(method: string, endpoint: string, id?: string, body?: any, params?: HttpParams): Observable<T> {
    const url = this.createUrl(endpoint, id);
    return this.http.request<T>(method, url, {
      body,
      headers: this.httpOptions.headers,
      params,
      observe: 'body'
    }).pipe(
      catchError(this.handleError<T>(`${method} ${endpoint}`))
    );
  }

  getUsers(): Observable<User[]> {
    return this.makeRequest<User[]>('GET', 'users');
  }

  getUser(id: string): Observable<User> {
    return this.makeRequest<User>('GET', 'users', id);
  }

  createUser(user: User): Observable<User> {
    return this.makeRequest<User>('POST', 'users', undefined, user);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.makeRequest<User>('PUT', 'users', id, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.makeRequest<void>('DELETE', 'users', id);
  }

  verifyUser(id: string): Observable<void> {
    return this.makeRequest<void>('POST', 'users', id, { verified: true });
  }
}

