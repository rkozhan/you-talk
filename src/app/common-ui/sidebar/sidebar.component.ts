import { Component, inject } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { NgForOf, AsyncPipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from "../../data/helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    AsyncPipe,
    JsonPipe,
    RouterLink,
    SubscriberCardComponent,
    ImgUrlPipe
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribersShortList()  

  me = this.profileService.me

  menuItems = [
    {
      label: 'My Page',
      icon: 'home',
      link: ''
    },
    {
      label: 'Chats',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Search',
      icon: 'search',
      link: 'search'
    }
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
