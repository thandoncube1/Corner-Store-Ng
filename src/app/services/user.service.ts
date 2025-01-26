import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../model/interface/user';

type TUserRequest = {
    username: string;
    password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  constructor(){}

  userLoginService(api_url: string, data: TUserRequest): Promise<IUser> {
    return new Promise((resolve, reject) => {
      this.http.post(api_url + 'Login', { username: data.username, password: data.password }).subscribe({
          next: (response: any) => {
            console.log("User Information:", response.data);
            resolve(response.data);
          },
          error: (error: string) => {
            console.error('Error fetching the product list:', error);
            reject(error);
          }
      });
    });
  }
}
