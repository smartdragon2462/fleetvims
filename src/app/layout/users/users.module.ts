import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {UsersService} from './../../shared/services/users.service';
import { CommonService} from '../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
    imports: [CommonModule,UsersRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),PaginationModule.forRoot(),AlertModule.forRoot()],
    providers: [UsersService,CommonService],
    declarations: [UsersComponent]
})
export class UsersModule {}
