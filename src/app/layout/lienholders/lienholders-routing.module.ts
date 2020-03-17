import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LienholdersComponent } from './lienholders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        path: '', component: LienholdersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),NgbModule.forRoot()],
    exports: [RouterModule]
})
export class LienholdersRoutingModule {
}
