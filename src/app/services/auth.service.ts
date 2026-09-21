import { inject, Service } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  authenticated: boolean;
  passwordChangeRequired: boolean;
  code: string | null;
}

export interface CsrfToken {
  headerName: string;
  parameterName:string;
  token: string;
}

export interface User {
  id?: number;
  username: string;
  name?: string;
  roles: string[];
}

export interface MeResponse {
  authenticated: boolean;
  sub: string;
  name: string;
  roles: string[];
  authorities: any[];
}

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://panaderia.test:8080';

  login(request: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      ['Content-Type']: 'application/json',
    });

    return this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login`, request, {
      headers,
      withCredentials: true,
    });
  }

  me() {
    return this.http.get<MeResponse>(`${this.apiUrl}/bff/me`, {
      withCredentials: true,
    });
  }

  csrf(): Observable<CsrfToken> {
    return this.http.get<CsrfToken>(`${this.apiUrl}/bff/csrf`, {
      withCredentials: true,
    });
  }

  logout(): Observable<any>  {
    // Apuntamos al Gateway. El Gateway se encarga de todo el flujo complejo.
    // Usamos { responseType: 'text' } porque Spring responde con una redirección (302), no con JSON.
    return this.http.post<any>('http://panaderia.test:8080/logout', {}, { responseType: 'text' });
  }
}
