import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
           
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'dashboard/type/:page', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'masters', loadChildren: './masters/masters.module#MastersModule' },
            { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangePasswordModule' },
            { path: 'vehicles', loadChildren: './vehicles/vehicles.module#VehiclesModule' },
            { path: 'vehicles/client/:id', loadChildren: './vehicles/vehicles.module#VehiclesModule' },
            { path: 'vehicles/policies/:pid/:pname/:cid', loadChildren: './vehicles/vehicles.module#VehiclesModule' },
            { path: 'vehicle/edit/:id', loadChildren: './vehiclecontacts/vehiclecontacts.module#VehicleContactsModule' },
            { path: 'vehicle/edit/:id/:clientid', loadChildren: './vehiclecontacts/vehiclecontacts.module#VehicleContactsModule' },
            { path: 'vehicle/transactionlog/:id', loadChildren: './vehicletransactionlog/vehicletransactionlogs.module#VehicleTransactionLogsModule' },
            { path: 'vehicle/transactionlog/:id/:clientid', loadChildren: './vehicletransactionlog/vehicletransactionlogs.module#VehicleTransactionLogsModule' },
            { path: 'contracts', loadChildren: './contracts/contracts.module#ContractsModule' },
            { path: 'lienholders', loadChildren: './lienholders/lienholders.module#LienholdersModule' },
            { path: 'lienholder/edit/:id', loadChildren: './lienholdercontacts/lienholdercontacts.module#LienholderContactsModule' },        
            { path: 'roles', loadChildren: './roles/roles.module#RolesModule'},
            { path: 'users', loadChildren: './users/users.module#UsersModule'},
            { path: 'insurers', loadChildren: './insurers/insurers.module#InsurersModule' },
            { path: 'insurer/edit/:id', loadChildren: './insurercontacts/insurercontacts.module#InsurerContactsModule' },   
            { path: 'agencies', loadChildren: './agencies/agencies.module#AgenciesModule' },
            { path: 'agency/edit/:id', loadChildren: './agencycontacts/agencycontacts.module#AgencyContactsModule' },
            { path: 'clients', loadChildren: './clients/clients.module#ClientsModule' },
            { path: 'client/edit/:id', loadChildren: './clientcontacts/clientcontacts.module#ClientContactsModule'},
            { path: 'client/report/:id/:cname', loadChildren: './clientreport/clientreports.module#ClientReportsModule'},
            { path: 'client/transactionlog/:id', loadChildren: './clienttransactionlog/clienttransactionlogs.module#ClientTransactionLogsModule' },
            { path: 'policies', loadChildren: './policies/policies.module#PoliciesModule' },
            { path: 'policy/client/:id/:pid', loadChildren: './policies/policies.module#PoliciesModule' },
            { path: 'policy/transactionlog/:id', loadChildren: './policytransactionlog/policytransactionlogs.module#PolicyTransactionLogsModule' },
            { path: 'policies/client/:id', loadChildren: './policies/policies.module#PoliciesModule' },
            { path: 'policy/report/:id', loadChildren: './policyreport/policyreports.module#PolicyReportsModule'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
