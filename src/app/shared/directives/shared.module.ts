import { NgModule, Directive,OnInit, EventEmitter, Output, OnDestroy, Input,ElementRef,Renderer } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareDirective } from './compare.field';

@NgModule({
  imports: [
  ],
  declarations: [
  CompareDirective
  ],
  exports: [
    CompareDirective
  ]
})

export class SharedModule { }