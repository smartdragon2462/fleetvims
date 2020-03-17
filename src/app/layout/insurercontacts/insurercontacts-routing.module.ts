import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsurerContactsComponent } from './insurercontacts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: InsurerContactsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class InsurerContactsRoutingModule {
}
