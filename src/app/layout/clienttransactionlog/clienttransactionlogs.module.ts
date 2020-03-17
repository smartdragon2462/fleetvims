import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientTransactionLogsRoutingModule } from './clienttransactionlogs-routing.module';
import { ClientTransactionLogsComponent } from './clienttransactionlogs.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';


import {CommonService} from './../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule} from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ClientsService} from '../../shared/services/clients.service';



@NgModule({
    imports: [CommonModule,ClientTransactionLogsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),AlertModule.forRoot(),PaginationModule.forRoot()],
    providers: [CommonService,ClientsService],
    declarations: [ClientTransactionLogsComponent]
})
export class ClientTransactionLogsModule {}
