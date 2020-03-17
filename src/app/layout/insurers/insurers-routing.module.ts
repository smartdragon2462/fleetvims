import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsurersComponent } from './insurers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: InsurersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class InsurersRoutingModule {
}
