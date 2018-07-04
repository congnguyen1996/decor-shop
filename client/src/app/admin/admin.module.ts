import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { NgxEditorModule } from 'ngx-editor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { CatagoryComponent } from './components/catagory/catagory.component';
import { ProductComponent } from './components/product/product.component';
import { SettingComponent } from './components/setting/setting.component';
import { HelpComponent } from './components/help/help.component';

import { UserService } from './services/user.service';
import { AuthGuard } from '../guards/auth.guard';
import { NotAuthGuard } from '../guards/not-auth.guard';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    UserComponent,
    CatagoryComponent,
    ProductComponent,
    SettingComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxEditorModule
  ],
  providers: [ UserService, AuthGuard, NotAuthGuard ]
})
export class AdminModule { }
