import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientContactsRoutingModule } from './clientcontacts-routing.module';
import { ClientContactsComponent } from './clientcontacts.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {ClientsService} from './../../shared/services/clients.service';
import {CommonService} from './../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule} from 'ngx-bootstrap/alert';
import {VehiclesService} from './../../shared/services/vehicles.service';



@NgModule({
    imports: [CommonModule,ClientContactsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),AlertModule.forRoot()],
    providers: [VehiclesService,ClientsService,CommonService],
    declarations: [ClientContactsComponent]
})
export class ClientContactsModule {}
