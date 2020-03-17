import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliciesComponent } from './policies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: PoliciesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class PoliciesRoutingModule {
}
