import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CatagoryComponent } from './components/catagory/catagory.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';
import { SettingComponent } from './components/setting/setting.component';
import { HelpComponent } from './components/help/help.component';

// import { AuthGuard } from '../guards/auth.guard';
// import { NotAuthGuard } from '../guards/not-auth.guard';


const adminRoutes: Routes = [
    {
        path: '',
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'catagory',
                component: CatagoryComponent
            },
            {
                path: 'product',
                component: ProductComponent
            },
            {
                path: 'user',
                component: UserComponent
            },
            {
                path: 'setting',
                component: SettingComponent
            },
            {
                path: 'help',
                component: HelpComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        // canActivate: [NotAuthGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [

    ],
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
