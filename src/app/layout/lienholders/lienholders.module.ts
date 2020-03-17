import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LienholdersRoutingModule } from './lienholders-routing.module';
import { LienholdersComponent } from './lienholders.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { BsModalService } from 'ngx-bootstrap/modal';

import {LienholdersService} from './../../shared/services/lienholders.service';
import { CommonService} from '../../shared/services/common.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
    imports: [CommonModule,LienholdersRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),PaginationModule.forRoot(),AlertModule.forRoot()],
    providers: [LienholdersService,CommonService],
    declarations: [LienholdersComponent]
})
export class LienholdersModule {}
