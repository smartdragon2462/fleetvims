import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService} from '../../shared/services/excel.service';

import {VehiclesService} from './../../shared/services/vehicles.service';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {ClientsService} from './../../shared/services/clients.service';
import { CommonService} from '../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
    imports: [CommonModule,ClientsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),PaginationModule.forRoot(),AlertModule.forRoot()],
    providers: [VehiclesService,ClientsService,CommonService,ExcelService],
    declarations: [ClientsComponent]
})
export class ClientsModule {}
