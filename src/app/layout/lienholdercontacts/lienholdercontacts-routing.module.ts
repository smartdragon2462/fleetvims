import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LienholderContactsComponent } from './lienholdercontacts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: LienholderContactsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class LienholderContactsRoutingModule {
}
