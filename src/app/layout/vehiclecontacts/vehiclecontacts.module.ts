import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleContactsRoutingModule } from './vehiclecontacts-routing.module';
import { VehicleContactsComponent } from './vehiclecontacts.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {VehiclesService} from './../../shared/services/vehicles.service';
import {CommonService} from './../../shared/services/common.service';

import { PoliciesService} from '../../shared/services/policies.service';

import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule} from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CurrencyMaskModule } from "ng2-currency-mask";
import {NgxMaskModule} from 'ngx-mask'
import { NgSelectModule } from '@ng-select/ng-select';
 

@NgModule({
    imports: [NgSelectModule,CommonModule,VehicleContactsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),AlertModule.forRoot(),BsDatepickerModule.forRoot(),CurrencyMaskModule,NgxMaskModule.forRoot()],
    providers: [VehiclesService,CommonService,PoliciesService],
    declarations: [VehicleContactsComponent]
})
export class VehicleContactsModule {}
