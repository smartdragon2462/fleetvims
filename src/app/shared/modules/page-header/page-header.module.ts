import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageHeaderComponent } from './page-header.component';
//import { CompareDirective } from './../../directives/compare.field';


@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent]
})
export class PageHeaderModule {}
