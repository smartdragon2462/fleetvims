import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LienholderContactsRoutingModule } from './lienholdercontacts-routing.module';
import { LienholderContactsComponent } from './lienholdercontacts.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {LienholdersService} from './../../shared/services/lienholders.service';
import {CommonService} from './../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule} from 'ngx-bootstrap/alert';


@NgModule({
    imports: [CommonModule,LienholderContactsRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),AlertModule.forRoot()],
    providers: [LienholdersService,CommonService],
    declarations: [LienholderContactsComponent]
})
export class LienholderContactsModule {}
