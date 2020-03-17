import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurersRoutingModule } from './insurers-routing.module';
import { InsurersComponent } from './insurers.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {InsurersService} from './../../shared/services/insurers.service';
import { CommonService} from '../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
    imports: [CommonModule,InsurersRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),PaginationModule.forRoot(),AlertModule.forRoot()],
    providers: [InsurersService,CommonService],
    declarations: [InsurersComponent]
})
export class InsurersModule {}
