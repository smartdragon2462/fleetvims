import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyReportsComponent } from './policyreports.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: PolicyReportsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class PolicyReportsRoutingModule {
}
