import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../../shared/services/common.service';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { RolesService } from '../../shared/services/roles.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public RecentlyAddedVehicles: Array<any> = [];
    public RecentlyAddedVehiclesALL: Array<any> = [];

    public RecentlyDeletedVehicles: Array<any> = [];
    public RecentlyDeletedVehiclesALL: Array<any> = [];


    public RecentTransactions: Array<any> = [];
    public RecentTransactionsALL: Array<any> = [];


    public ExpiringPolicies: Array<any> = [];
    public ExpiringPoliciesALL: Array<any> = [];
    returnedExpiringPoliciesALL: any[];


    public ClientByUnitCount: Array<any> = [];
    public ClientByUnitCountALL: Array<any> = [];
   
    public ClientByValues: Array<any> = [];
    public ClientByValuesALL: Array<any> = [];

    public NonSponsor: Array<any> = [];
    public NonSponsorAll: Array<any> = [];


    totalItems: number = 0;
    itemsPerPage: number = 10;
    PageIndex: number = 1;
    isDeleted = false;
    SearchText: string = '';

    UserInfo: any;
    type: string = '';




    constructor(private commonService: CommonService, private spinner: NgxSpinnerService, private Router: ActivatedRoute, private router: Router) {


        this.UserInfo = JSON.parse(localStorage.getItem('UserDetail'));
        this.type = this.Router.snapshot.params["page"];
        console.log(this.type);
        //console.log(this.UserInfo);
    }

    getDashboardData() {
        this.spinner.show();
        this.commonService.dashboard().subscribe((data: any) => {
            console.log(data.Result_value);
            if (data.Result) {
                this.RecentlyAddedVehicles = data.Result_value.RecentlyAddedVehicles;
                this.RecentlyDeletedVehicles = data.Result_value.RecentlyDeletedVehicles;
                this.RecentTransactions = data.Result_value.RecentTransactions;
                this.ExpiringPolicies = data.Result_value.ExpiringPolicies;
                this.ClientByUnitCount = data.Result_value.ClientByUnitCount;
                this.ClientByValues = data.Result_value.ClientByValues;
                this.NonSponsor = data.Result_value.NonSponsoredList;
            } else {
                if (data.Error_value.ErrorCode == 112) {
                    localStorage.removeItem('isLoggedin');
                    localStorage.removeItem('Token');
                    localStorage.removeItem('UserDetail');
                    localStorage.removeItem('permissionList');
                    localStorage.removeItem('UserId');
                    this.router.navigate(['/login']);
                }
            }
            this.spinner.hide();


        },
            (err: HttpErrorResponse) => {
                console.log(err)
                this.spinner.hide();

                // this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
            })

    }

    // recentaddedvehicelDetail()
    // {
    //     console.log("recentaddedvehicelDetail");
    // }


    pageChanged(event: any): void {
        this.PageIndex = event.page;
        // console.log(this.PageIndex);
     //   this.RecentaddedvehicelDashboard();
        if (this.type == "expirepolicies") {
            this.ExpiringPoliciesDashboard();
        }
        else if (this.type == "recenttransactions") {
            this.RecentTransactionDashboard();
        }
        else if (this.type == "recentaddedvehicel") {
            this.RecentaddedvehicelDashboard();
        }
        else if (this.type == "recentadeleteddvehicel") {
            this.RecentlyDeletedVehiclesDashboard()
        }
        else if (this.type == "topclientbyvalue" || this.type == "topclientbyunit") {
            this.GetClientSummaryDashboardDetailList();
        }
        else if(this.type ==="NonSponsor")
        {
            this.GetNonSponsorDashboardDetailList();
        }
    }

    itemsPerPageChange(itemcount: any): void {
        this.itemsPerPage = itemcount;
      //  this.RecentaddedvehicelDashboard();

        if (this.type == "expirepolicies") {
            this.ExpiringPoliciesDashboard();
        }
        else if (this.type == "recenttransactions") {
            this.RecentTransactionDashboard();
        }
        else if (this.type == "recentaddedvehicel") {
            this.RecentaddedvehicelDashboard();
        }
        else if (this.type == "recentadeleteddvehicel") {
            this.RecentlyDeletedVehiclesDashboard()
        }
        else if (this.type == "topclientbyvalue" || this.type == "topclientbyunit") {
            this.GetClientSummaryDashboardDetailList();
        }
else if(this.type ==="NonSponsor")
{
    this.GetNonSponsorDashboardDetailList();
}



    }


    //-------View all Recent added vehice ---------//

    RecentaddedvehicelDashboard() {
        // debugger
        this.spinner.show();
        var _RecentaddedvehicelOptions = {
            "PageIndex":
                this.PageIndex, "PageSize": this.itemsPerPage, "SortBy": "10", "SortOrder": 0, "Filter": {
                    "SearchText": this.SearchText,
                    "Deleted": this.isDeleted
                }
        }

        this.commonService.RecentaddedvehicelDashboard(_RecentaddedvehicelOptions).subscribe((data: any) => {

            if (data.Result) {
                this.totalItems=data.Result_value.TotalRecords;
                this.RecentlyAddedVehiclesALL = data.Result_value.RecentlyAddedVehicles;
                console.log(data.Result_value);

                this.spinner.hide();

            }
            else {
                if (data.Error_value.ErrorCode == 112) {
                    localStorage.removeItem('isLoggedin');
                    localStorage.removeItem('Token');
                    localStorage.removeItem('UserDetail');
                    localStorage.removeItem('permissionList');
                    localStorage.removeItem('UserId');
                    this.router.navigate(['/login']);
                }
                //this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
            }
            this.spinner.hide();

        },
            (err: HttpErrorResponse) => {
                console.log("Some Error occured");
                //this.loading = false;
                // this.alertService.error('You have entered the invalid details.');
            })
    }


    //-------View all Recent Deleted vehice ---------//
    RecentlyDeletedVehiclesDashboard() {
        // debugger
        this.spinner.show()
        var _RecentlyDeletedVehicleOptions = {
            "PageIndex":
                this.PageIndex, "PageSize": this.itemsPerPage, "SortBy": "11", "SortOrder": 0, "Filter": {
                    "SearchText": this.SearchText,
                    "Deleted": this.isDeleted
                }
        }

        this.commonService.RecentlyDeletedVehiclesDashboard(_RecentlyDeletedVehicleOptions).subscribe((data: any) => {

            if (data.Result) {
                this.totalItems = data.Result_value.TotalRecords;
                this.RecentlyDeletedVehiclesALL = data.Result_value.RecentlyDeletedVehicles;
                console.log(this.RecentlyDeletedVehiclesALL);

                this.spinner.hide();

            } else {
                if (data.Error_value.ErrorCode == 112) {
                    localStorage.removeItem('isLoggedin');
                    localStorage.removeItem('Token');
                    localStorage.removeItem('UserDetail');
                    localStorage.removeItem('permissionList');
                    localStorage.removeItem('UserId');
                    this.router.navigate(['/login']);
                }
                //this.loading = false;
                //this.alertService.error('You have entered the invalid details.');

            }
            this.spinner.hide();

        },
            (err: HttpErrorResponse) => {
                console.log("Some Error occured");
                //this.loading = false;
                // this.alertService.error('You have entered the invalid details.');
            })



    }

    //-------View all Expiring Policies ---------//     
    ExpiringPoliciesDashboard() {
        // debugger
        this.spinner.show()
        var _ExpiringPoliciesOptions = {
            "PageIndex":
                this.PageIndex, "PageSize": this.itemsPerPage, "SortBy": "5", "SortOrder": 0, "Filter": {
                    "SearchText": this.SearchText,
                    "Deleted": this.isDeleted
                }
        }

        this.commonService.ExpiringPoliciesDashboard(_ExpiringPoliciesOptions).subscribe((data: any) => {

            if (data.Result) {
                this.totalItems = data.Result_value.TotalRecords;
                this.ExpiringPoliciesALL = data.Result_value.ExpiringPolicies;

                this.returnedExpiringPoliciesALL = this.ExpiringPoliciesALL.slice(0, 10);
                console.log(this.ExpiringPoliciesALL);

                this.spinner.hide();

            } else {
                if (data.Error_value.ErrorCode == 112) {
                    localStorage.removeItem('isLoggedin');
                    localStorage.removeItem('Token');
                    localStorage.removeItem('UserDetail');
                    localStorage.removeItem('permissionList');
                    localStorage.removeItem('UserId');
                    this.router.navigate(['/login']);
                }
                //this.loading = false;
                //this.alertService.error('You have entered the invalid details.');

            }
            this.spinner.hide();

        },
            (err: HttpErrorResponse) => {
                console.log("Some Error occured");
                //this.loading = false;
                // this.alertService.error('You have entered the invalid details.');
            })



    }

    //-------View all Recent Transaction ALL ---------//     
    RecentTransactionDashboard() {
        // debugger
        this.spinner.show()
        var _RecentTransactionOptions = {
            "PageIndex":
                this.PageIndex, "PageSize": this.itemsPerPage, "SortBy": "11", "SortOrder": 0, "Filter": {
                    "SearchText": this.SearchText,
                    "Deleted": this.isDeleted
                }
        }

        this.commonService.RecentTransactionDashboard(_RecentTransactionOptions).subscribe((data: any) => {

            if (data.Result) {
                this.totalItems = data.Result_value.TotalRecords;
                this.RecentTransactionsALL = data.Result_value.RecentTransactions;
                console.log(this.RecentTransactionsALL);

                this.spinner.hide();

            } else {
                if (data.Error_value.ErrorCode == 112) {
                    localStorage.removeItem('isLoggedin');
                    localStorage.removeItem('Token');
                    localStorage.removeItem('UserDetail');
                    localStorage.removeItem('permissionList');
                    localStorage.removeItem('UserId');
                    this.router.navigate(['/login']);
                }
                //this.loading = false;
                //this.alertService.error('You have entered the invalid details.');

            }
            this.spinner.hide();

        },
            (err: HttpErrorResponse) => {
                console.log("Some Error occured");
                //this.loading = false;
                // this.alertService.error('You have entered the invalid details.');
            })



    }


    //-------View all Recent Transaction ALL ---------//     
    GetClientSummaryDashboardDetailList() {
        // debugger
        this.spinner.show()
        var _RecentTransactionOptions = {
            "PageIndex":
                this.PageIndex, "PageSize": 100000, "SortBy": "11", "SortOrder": 0, "Filter": {
                    "SearchText": this.SearchText,
                    "Deleted": this.isDeleted
                }
        }

        this.commonService.GetClientSummaryDashboardDetailList(_RecentTransactionOptions).subscribe((data: any) => {

            if (data.Result) {
                this.totalItems = data.Result_value.TotalRecords;
                this.ClientByUnitCountALL = data.Result_value.ClientByUnitCount;
                this.ClientByValuesALL = data.Result_value.ClientByValues;
                console.log(this.ClientByValuesALL, this.ClientByValuesALL);

                this.spinner.hide();

            } else {
                if (data.Error_value.ErrorCode == 112) {
                    localStorage.removeItem('isLoggedin');
                    localStorage.removeItem('Token');
                    localStorage.removeItem('UserDetail');
                    localStorage.removeItem('permissionList');
                    localStorage.removeItem('UserId');
                    this.router.navigate(['/login']);
                }
                //this.loading = false;
                //this.alertService.error('You have entered the invalid details.');

            }
            this.spinner.hide();

        },
            (err: HttpErrorResponse) => {
                console.log("Some Error occured");
                //this.loading = false;
                // this.alertService.error('You have entered the invalid details.');
            })



    }
    

    
    //-------View all Recent Transaction ALL ---------//     
    GetNonSponsorDashboardDetailList() {
        // debugger
        this.spinner.show()
        var _NonSponsorOptions = {
            "PageIndex":
                this.PageIndex, "PageSize": this.itemsPerPage, "SortBy": "1", "SortOrder": 0, "Filter": {
                    "SearchText": this.SearchText,
                    "Deleted": this.isDeleted
                }
        }

        this.commonService.GetNonSponsorDashboardDetailList(_NonSponsorOptions).subscribe((data: any) => {

            if (data.Result) {
                this.totalItems = data.Result_value.TotalRecords;
                this.NonSponsorAll = data.Result_value.NonSponsoredList;
               console.log(this.NonSponsorAll);

                this.spinner.hide();

            } else {
                if (data.Error_value.ErrorCode == 112) {
                    localStorage.removeItem('isLoggedin');
                    localStorage.removeItem('Token');
                    localStorage.removeItem('UserDetail');
                    localStorage.removeItem('permissionList');
                    localStorage.removeItem('UserId');
                    this.router.navigate(['/login']);
                }
                //this.loading = false;
                //this.alertService.error('You have entered the invalid details.');

            }
            this.spinner.hide();

        },
            (err: HttpErrorResponse) => {
                console.log("Some Error occured");
                //this.loading = false;
                // this.alertService.error('You have entered the invalid details.');
            })



    }



    // pageChanged(event, master): void {
    //     console.log(event);
    //     if (master == 1) {
    //       const startItem = (event.page - 1) * event.itemsPerPage;  
    //       const endItem = event.page * event.itemsPerPage;
    //       this.returnedExpiringPoliciesALL = this.ExpiringPoliciesALL.slice(startItem, endItem);
    //     } else if (master == 2) {
    //       const startItem = (event.page - 1) * event.itemsPerPage;
    //       const endItem = event.page * event.itemsPerPage;
    //       //this.returnedUnitTypeList = this.UnitTypeList.slice(startItem, endItem);
    //     }
    //     console.log(event);
    //   }



    ngOnInit() {

        if (!this.type) {
            this.getDashboardData();
        }
        else {

            if (this.type == "expirepolicies") {
                this.ExpiringPoliciesDashboard();
            }
            else if (this.type == "recenttransactions") {
                this.RecentTransactionDashboard();
            }
            else if (this.type == "recentaddedvehicel") {
                this.RecentaddedvehicelDashboard();
            }
            else if (this.type == "recentadeleteddvehicel") {
                this.RecentlyDeletedVehiclesDashboard()
            }
            else if (this.type == "topclientbyvalue" || this.type == "topclientbyunit") {
                this.GetClientSummaryDashboardDetailList();
            }

            else if(this.type ==="NonSponsor")
            {
                this.GetNonSponsorDashboardDetailList();
            }


        }
        //console.log(this.type,"console.log(this.type);");
    }


}
