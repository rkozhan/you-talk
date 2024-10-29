import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // Inject HttpClient
  http = inject(HttpClient);

  // Initialize a signal for the user's profile
  me = signal<Profile | null>(null); // Set initial value to null
  
  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  //baseApiUrl = 'https://api.escuelajs.co/api/v1/'

  // Fetch the current user's profile
  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(res => this.me.set(res)) // Set the fetched profile into the signal
      )
  }

  // Fetch a list of test accounts
  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  // Fetch a single account by ID
  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
  }

  // Fetch a short list of subscribers
  getSubscribersShortList(amount = 3) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0, amount))
      )
  }

  // Update the profile
  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(
      `${this.baseApiUrl}account/me`,
      profile
    )
  }

  // Upload an avatar image
  uploadAvatar(file: File) {
    const fd = new FormData()
    fd.append('image', file)

    return this.http.post<Profile>(`${this.baseApiUrl}account/me/avatar`, fd) // Make sure to handle the response
    .pipe(
      tap(updatedProfile => this.me.set(updatedProfile)) // Update the signal with the new profile after uploading
    );
  }  
}
