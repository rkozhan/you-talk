import { Component, inject, signal } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { ImgUrlPipe } from "../../data/helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, SvgIconComponent, ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribersShortList(5)
  route = inject(ActivatedRoute)

  me$ = toObservable(this.profileService.me)

  isMe = signal<boolean>(false)

  profile$ = this.route.params
    .pipe(
      switchMap( ({id}) => {
        if (id === 'me') {
          this.isMe.set(true)
          return this.me$              
        }
        this.isMe.set(false)
        return this.profileService.getAccount(id)
      })
    )



}
