import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyTransactionLogsComponent } from './policytransactionlogs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: PolicyTransactionLogsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class PolicyTransactionLogsRoutingModule {
}
