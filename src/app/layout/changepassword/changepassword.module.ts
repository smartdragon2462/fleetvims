import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './changepassword-routing.module';
import { ChangePasswordComponent } from './changepassword.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UsersService} from './../../shared/services/users.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule} from 'ngx-bootstrap/alert';
//import { CompareDirective } from './../../shared/directives/compare.field';
import {SharedModule} from './../../shared/directives/shared.module';

@NgModule({
    imports: [CommonModule,ChangePasswordRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),AlertModule.forRoot(),SharedModule],
    providers: [UsersService],
    declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule {}
