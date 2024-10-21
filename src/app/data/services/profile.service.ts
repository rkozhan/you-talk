import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)
  
  baseApiUrl = 'https://icherniakov.ru/yt-course/account/'
  //baseApiUrl = 'https://api.escuelajs.co/api/v1/'

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}test_accounts`)
  }
}
