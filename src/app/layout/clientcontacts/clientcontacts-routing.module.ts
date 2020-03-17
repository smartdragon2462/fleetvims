import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientContactsComponent } from './clientcontacts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: ClientContactsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class ClientContactsRoutingModule {
}
