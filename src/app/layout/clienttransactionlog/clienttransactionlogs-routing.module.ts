import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientTransactionLogsComponent } from './clienttransactionlogs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: ClientTransactionLogsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class ClientTransactionLogsRoutingModule {
}
