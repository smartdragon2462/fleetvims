import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientReportsComponent } from './clientreports.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: ClientReportsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class ClientReportsRoutingModule {
}
