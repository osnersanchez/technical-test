import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserData } from '../../declaraciones/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = `${environment.apiUrl}/login`;

  constructor(private readonly http: HttpClient) {}

  getUserByEmail(email: string) {
    return this.http.get<UserData>(`${this.BASE_URL}/${email}`);
  }

  registerUser(user: UserData) {
    return this.http.post<UserData>(this.BASE_URL, user);
  }
}
