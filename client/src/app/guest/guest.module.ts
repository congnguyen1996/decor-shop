import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest.routing.module';
import { ProductsComponent } from './components/products/products.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    ProductsComponent,
    SingleProductComponent,
    AboutComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    GuestRoutingModule
  ],
  providers: []
})
export class GuestModule { }
