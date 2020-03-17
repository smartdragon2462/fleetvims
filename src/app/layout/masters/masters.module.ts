import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { MastersRoutingModule } from './masters-routing.module';
import { MastersComponent } from './masters.component';
import { CommonService} from '../../shared/services/common.service';
import {VehiclesService} from './../../shared/services/vehicles.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule} from 'ngx-bootstrap/modal';

import { StatModule } from '../../shared';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule} from 'ngx-bootstrap/alert';


@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        AlertModule.forRoot(),
        MastersRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        StatModule
    ],
    declarations: [
        MastersComponent,
    ],
    providers: [CommonService,VehiclesService],
})
export class MastersModule {}
