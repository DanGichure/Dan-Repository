// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private refreshSubject = new BehaviorSubject<void>(undefined);

  // Observable that components can subscribe to
  refresh$ = this.refreshSubject.asObservable();

  // Trigger a refresh
  triggerRefresh(): void {
    this.refreshSubject.next();
  }

}


