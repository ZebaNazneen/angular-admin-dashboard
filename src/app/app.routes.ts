import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { Dashboard } from './dashboard/dashboard';
import { authGuard, guestGuard } from './auth-guard';

export const routes: Routes = [
    {
        component: LoginPage,
        path:"login",
        canActivate: [guestGuard]
    },
    {
        component: Dashboard,
        path:'dashboard',
        canActivate : [authGuard]
    },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: '**', redirectTo: 'dashboard' }
];
