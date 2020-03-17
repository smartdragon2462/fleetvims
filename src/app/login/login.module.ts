import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {LoginService} from '../shared/services/login.service';
import {AlertService} from '../shared/services/alert.service';
import { AlertComponent } from '../shared/directives/alert.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
 

@NgModule({
    imports: [CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule,DeviceDetectorModule.forRoot()],
    providers: [LoginService,AlertService],
    declarations: [LoginComponent,AlertComponent]
})
export class LoginModule {}
