import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyContactsComponent } from './agencycontacts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: AgencyContactsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class AgencyContactsRoutingModule {
}
