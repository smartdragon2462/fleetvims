import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyReportsRoutingModule } from './policyreports-routing.module';
import { PolicyReportsComponent } from './policyreports.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {PoliciesService} from './../../shared/services/policies.service';
import {CommonService} from './../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule} from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
    imports: [CommonModule,PolicyReportsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),AlertModule.forRoot(),PaginationModule.forRoot()],
    providers: [PoliciesService,CommonService],
    declarations: [PolicyReportsComponent]
})
export class PolicyReportsModule {}
