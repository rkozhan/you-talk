import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile.service';
import { debounceTime, startWith, Subscription, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
//export class ProfileFiltersComponent {
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  })
/*
  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}), //empty params
        debounceTime(300), // Waits for 300ms pause before proceeding, reducing unnecessary server requests
        switchMap(formValue => {
          return this.profileService.filterProfiles(formValue)
        }),
        //takeUntilDestroyed()  //cleaner since Angular17
      ).subscribe()
  }
*/
  //cleaner for angular version < 17 (+ implements OnDestroy)
  searchFormSub!: Subscription

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}), //empty params
        debounceTime(300), // Waits for 300ms pause before proceeding, reducing unnecessary server requests
        switchMap(formValue => {
          return this.profileService.filterProfiles(formValue)
        }),
        //takeUntilDestroyed()  //cleaner since Angular17
      ).subscribe()      
  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe()    
  }
}
