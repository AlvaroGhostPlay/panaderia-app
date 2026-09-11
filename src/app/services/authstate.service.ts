import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './auth.service';

@Service()
export class AuthstateService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private authSubject = new BehaviorSubject<boolean | null>(null);

  user$ = this.userSubject.asObservable();
  auth$ = this.authSubject.asObservable();

  setUser(user: User, authenticated: boolean): void {
    this.userSubject.next(user);
    this.authSubject.next(authenticated);
  }

  clearUser(): void {
    this.userSubject.next(null);
    this.authSubject.next(false);
  }

  get user(): User | null {
    return this.userSubject.value;
  }

  get auth(): boolean | null {
    return this.authSubject.value;
  }

  hasRole(role: string): boolean {
    return this.user?.roles.includes(role) ?? false;
  }
}
