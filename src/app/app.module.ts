import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {UimaterialModule} from './uimaterial/uimaterial.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DeviceComponent } from './device/device.component';
import { MapsComponent } from './maps/maps.component';
import{ FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenInterceptorService} from './token-interceptor.service'
import { AuthService } from './services/auth.service';
import {DeviceService}from './services/device.service';
import {AuthGuard} from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DeviceComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UimaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,DeviceService,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true  
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
