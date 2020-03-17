import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleContactsComponent } from './vehiclecontacts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: VehicleContactsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class VehicleContactsRoutingModule {
}
