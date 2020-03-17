import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotpasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotpasswordComponent } from './forgotpassword.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {LoginService} from '../shared/services/login.service';
//import {AlertService} from '../shared/services/alert.service';
import { AlertModule} from 'ngx-bootstrap/alert';
//import {LoginService} from '../shared/services/login.service';

@NgModule({
    imports: [CommonModule, ForgotpasswordRoutingModule, FormsModule, ReactiveFormsModule,AlertModule.forRoot()],
    providers: [LoginService],
    declarations: [ForgotpasswordComponent]
})
export class ForgotpasswordModule {}
