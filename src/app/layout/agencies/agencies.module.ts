import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenciesRoutingModule } from './agencies-routing.module';
import { AgenciesComponent } from './agencies.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {AgenciesService} from './../../shared/services/agencies.service';
import { CommonService} from '../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
    imports: [CommonModule,AgenciesRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),AlertModule.forRoot(),TooltipModule.forRoot(),PaginationModule.forRoot()],
    providers: [AgenciesService,CommonService],
    declarations: [AgenciesComponent]
})
export class AgenciesModule {}
