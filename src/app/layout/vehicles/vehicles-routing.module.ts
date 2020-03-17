import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: VehiclesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class VehiclesRoutingModule {
}
