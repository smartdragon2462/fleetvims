import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientReportsRoutingModule } from './clientreports-routing.module';
import { ClientReportsComponent } from './clientreports.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {ClientsService} from './../../shared/services/clients.service';
import {CommonService} from './../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule} from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
    imports: [CommonModule,ClientReportsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),AlertModule.forRoot(),PaginationModule.forRoot()],
    providers: [ClientsService,CommonService],
    declarations: [ClientReportsComponent]
})
export class ClientReportsModule {}
