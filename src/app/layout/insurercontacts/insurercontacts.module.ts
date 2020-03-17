import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurerContactsRoutingModule } from './insurercontacts-routing.module';
import { InsurerContactsComponent } from './insurercontacts.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import { AlertModule} from 'ngx-bootstrap/alert';
import {InsurersService} from './../../shared/services/insurers.service';
import {CommonService} from './../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';



@NgModule({
    imports: [CommonModule,InsurerContactsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),AlertModule.forRoot()],
    providers: [InsurersService,CommonService],
    declarations: [InsurerContactsComponent]
})
export class InsurerContactsModule {}
