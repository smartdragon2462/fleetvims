import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyContactsRoutingModule } from './agencycontacts-routing.module';
import { AgencyContactsComponent } from './agencycontacts.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {AgenciesService} from './../../shared/services/agencies.service';
import {CommonService} from './../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';



@NgModule({
    imports: [CommonModule,AgencyContactsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),AlertModule.forRoot(),TooltipModule.forRoot()],
    providers: [AgenciesService,CommonService],
    declarations: [AgencyContactsComponent]
})
export class AgencyContactsModule {}
