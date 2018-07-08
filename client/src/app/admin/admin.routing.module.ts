import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { CatagoryComponent } from './components/catagory/catagory.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';

import { AuthGuard } from './guards/auth.guard';

const adminRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'user',
                pathMatch: 'full'
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
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: 'admin/dashboard',
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
