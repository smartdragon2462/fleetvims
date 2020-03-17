import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsComponent } from './contracts.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {ContractsService} from './../../shared/services/contracts.service';
import { CommonService} from '../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule} from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
    imports: [CommonModule,ContractsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),PaginationModule.forRoot(),AlertModule.forRoot(),BsDatepickerModule.forRoot()],
    providers: [ContractsService,CommonService],
    declarations: [ContractsComponent]
})
export class ContractsModule {}
