import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthControl } from './_helpers/auth.control';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthControl]},
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
