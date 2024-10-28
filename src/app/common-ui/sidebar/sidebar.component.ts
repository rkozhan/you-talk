import { Component } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, NgForOf, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
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
}
