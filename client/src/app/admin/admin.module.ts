import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { NgxEditorModule } from 'ngx-editor';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { CatagoryComponent } from './components/catagory/catagory.component';
import { ProductComponent } from './components/product/product.component';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    CatagoryComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxEditorModule
  ],
  providers: [ AuthGuard ]
})
export class AdminModule { }
