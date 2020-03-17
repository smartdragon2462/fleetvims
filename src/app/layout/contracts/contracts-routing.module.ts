import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractsComponent } from './contracts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: ContractsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class ContractsRoutingModule {
}
