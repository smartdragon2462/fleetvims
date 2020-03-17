import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleTransactionLogsComponent } from './vehicletransactionlogs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: VehicleTransactionLogsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class VehicleTransactionLogsRoutingModule {
}
