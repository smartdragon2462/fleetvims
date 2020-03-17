import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleTransactionLogsRoutingModule } from './vehicletransactionlogs-routing.module';
import { VehicleTransactionLogsComponent } from './vehicletransactionlogs.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {VehiclesService} from './../../shared/services/vehicles.service';
import {CommonService} from './../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule} from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ClientsService} from '../../shared/services/clients.service';



@NgModule({
    imports: [CommonModule,VehicleTransactionLogsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),AlertModule.forRoot(),PaginationModule.forRoot()],
    providers: [VehiclesService,CommonService,ClientsService],
    declarations: [VehicleTransactionLogsComponent]
})
export class VehicleTransactionLogsModule {}
