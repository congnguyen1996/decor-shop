import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductsComponent } from './components/products/products.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { AboutComponent } from './components/about/about.component';

const guestRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AboutComponent
            },
            {
                path: 'products/:catagory',
                component: ProductsComponent
            },
            {
                path: 'product-detail/:id',
                component: SingleProductComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(guestRoutes)
    ],
    exports: [RouterModule]
})
export class GuestRoutingModule { }
