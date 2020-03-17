import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesComponent } from './policies.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {PoliciesService} from './../../shared/services/policies.service';
import { CommonService} from '../../shared/services/common.service';

import { ModalModule} from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ClientsService} from '../../shared/services/clients.service';
import { ExcelService} from '../../shared/services/excel.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { VehiclesService } from '../../shared/services/vehicles.service';

import {NgxMaskModule} from 'ngx-mask'

@NgModule({
    imports: [CommonModule,PoliciesRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),AlertModule.forRoot(),TooltipModule.forRoot(),PaginationModule.forRoot(),BsDatepickerModule.forRoot(),NgxMaskModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot()],
    providers: [VehiclesService,PoliciesService,CommonService,ClientsService,ExcelService],
    declarations: [PoliciesComponent]
})
export class PoliciesModule {}
