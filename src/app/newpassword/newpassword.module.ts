import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewpasswordRoutingModule } from './newpassword-routing.module';
import { NewpasswordComponent } from './newpassword.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {LoginService} from '../shared/services/login.service';
//import {AlertService} from '../shared/services/alert.service';
import { AlertModule} from 'ngx-bootstrap/alert';
//import {LoginService} from '../shared/services/login.service';

//import {LoginService} from '../shared/services/login.service';

//import { CompareDirective } from '../shared/directives/compare.field';
import {SharedModule} from './../shared/directives/shared.module';


@NgModule({
    imports: [CommonModule, NewpasswordRoutingModule, FormsModule, ReactiveFormsModule,AlertModule.forRoot(),SharedModule],
    providers: [LoginService],
    declarations: [NewpasswordComponent]
})
export class NewpasswordModule {}
