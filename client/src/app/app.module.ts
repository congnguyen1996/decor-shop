import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GuestNavbarComponent } from './guest/components/navbar/navbar.component';
import { GuestFooterComponent } from './guest/components/footer/footer.component';

import { AdminNavbarComponent } from './admin/components/navbar/navbar.component';
import { AdminFooterComponent } from './admin/components/footer/footer.component';
import { AdminMenuComponent } from './admin/components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestNavbarComponent,
    GuestFooterComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    AdminMenuComponent
  ],
  imports: [
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
