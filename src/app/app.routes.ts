import { Routes } from '@angular/router';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: '', component: LayoutComponent, children: [
        {path: 'profile', component: ProfilePageComponent},
        {path: '', component: SearchPageComponent}
    ]},
];

