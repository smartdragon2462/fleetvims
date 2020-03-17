import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyTransactionLogsRoutingModule } from './policytransactionlogs-routing.module';
import { PolicyTransactionLogsComponent } from './policytransactionlogs.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {PoliciesService} from './../../shared/services/policies.service';
import {CommonService} from './../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule} from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ClientsService} from '../../shared/services/clients.service';



@NgModule({
    imports: [CommonModule,PolicyTransactionLogsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),AlertModule.forRoot(),PaginationModule.forRoot()],
    providers: [PoliciesService,CommonService,ClientsService],
    declarations: [PolicyTransactionLogsComponent]
})
export class PolicyTransactionLogsModule {}
