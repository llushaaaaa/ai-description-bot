import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/users';

  async getUser(id: number): Promise<User> {
    return firstValueFrom(
      this.http.get<User>(`${this.apiUrl}/${id}`)
    );
  }

  async getUsers(): Promise<User[]> {
    return firstValueFrom(
      this.http.get<User[]>(this.apiUrl)
    );
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    return firstValueFrom(
      this.http.post<User>(this.apiUrl, user)
    );
  }

  async updateUser(user: User): Promise<User> {
    return firstValueFrom(
      this.http.put<User>(`${this.apiUrl}/${user.id}`, user)
    );
  }

  async deleteUser(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${id}`)
    );
  }
}
