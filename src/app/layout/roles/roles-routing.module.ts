import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: RolesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class RolesRoutingModule {
}
