import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {VehiclesService} from './../../shared/services/vehicles.service';
import { CommonService} from '../../shared/services/common.service';
import { PoliciesService} from '../../shared/services/policies.service';
import { ClientsService} from '../../shared/services/clients.service';
import { ExcelService} from '../../shared/services/excel.service';


import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule} from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CurrencyMaskModule } from "ng2-currency-mask";
import {NgxMaskModule} from 'ngx-mask'
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
    imports: [NgSelectModule,CommonModule,VehiclesRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),PaginationModule.forRoot(),AlertModule.forRoot(),BsDatepickerModule.forRoot(),TabsModule.forRoot(),CurrencyMaskModule,NgxMaskModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot()],
    providers: [VehiclesService,CommonService,PoliciesService,ClientsService,ExcelService],
    declarations: [VehiclesComponent]
})
export class VehiclesModule {}
