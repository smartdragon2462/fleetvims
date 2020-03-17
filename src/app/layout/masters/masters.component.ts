import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../../shared/services/common.service';
import { VehiclesService } from '../../shared/services/vehicles.service';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
//import { RolesService} from '../../shared/services/roles.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss'],
  animations: [routerTransition()]
})
export class MastersComponent implements OnInit {
  public RecentlyAddedVehicles: Array<any> = [];
  public RecentlyDeletedVehicles: Array<any> = [];
  public RecentTransactions: Array<any> = [];
  public ExpiringPolicies: Array<any> = [];
  public ClientByUnitCount: Array<any> = [];
  public ClientByValues: Array<any> = [];
  UserInfo: any;
  modalRef: BsModalRef;

  UnitTypeList: Array<any> = [];
  DriverTypeList: any[];
  PolicyTypeList: any[];
  MakeList: Array<any> = [];
  StateList: Array<any> = [];

  UnitTypeCategoryMasterList: Array<any> = [];
  CargoTypeMasterList: Array<any> = [];

  returnedMakeList: any[];
  returnedUnitTypeList: any[];
  returnedPolicyTypeList: any[];
  returnedDriverTypeList: any[];
  returnedCargoTypeList: any[];
  returnedStateList: any[];


  makeregister: FormGroup;
  policyregister: FormGroup;
  driverregister: FormGroup;
  unittyperegister: FormGroup;
  cargotyperegister: FormGroup;
  statetaxregister:FormGroup;

  title: string = "Add New";
  isSubmitted: boolean = false;
  loading: boolean = false;
  alerts: any = []

  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  constructor(private frmBuilder: FormBuilder, private commonService: CommonService, private spinner: NgxSpinnerService, private router: Router, private vehiclesService: VehiclesService, private modalService: BsModalService) {

    this.UserInfo = JSON.parse(localStorage.getItem('UserDetail'))
    //console.log(this.UserInfo);
  }

  getMastersData() {
    // alert("dasd");
    this.spinner.show();
    this.vehiclesService.getVehicleMasterDetails().subscribe((data: any) => {
      console.log(data.Result_value);
      if (data.Result) {
        this.spinner.hide();
        //this.PowerUnitTypeList=data.Result_value.PowerUnitTypeList;
        //this.NonPowerUnitTypeList=data.Result_value.NonPowerUnitTypeList;
        this.DriverTypeList = data.Result_value.DriverTypeList;
        this.PolicyTypeList = data.Result_value.PolicyTypeList;

        this.MakeList = data.Result_value.MakeList;
        this.UnitTypeList = data.Result_value.UnitTypeList;

        this.UnitTypeCategoryMasterList = data.Result_value.UnitTypeCategoryMasterList;
        this.CargoTypeMasterList = data.Result_value.CargoTypesList;


        //          this.UnitTypeCategoryKeys = Object.keys(this.UnitTypeCategoryMasterList).filter(Number)
        // console.log(this.UnitTypeCategoryKeys,this.UnitTypeCategoryMasterList);


        this.returnedMakeList = this.MakeList.slice(0, 10);
        this.returnedUnitTypeList = this.UnitTypeList.slice(0, 10);

        this.returnedPolicyTypeList = this.PolicyTypeList.slice(0, 10);
        this.returnedDriverTypeList = this.DriverTypeList.slice(0, 10);
        this.returnedCargoTypeList = this.CargoTypeMasterList.slice(0, 10);
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



    },
      (err: HttpErrorResponse) => {
        console.log(err)
        //this.spinner.hide();

        // this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

  }


  getStates() {

    this.commonService.getSates([{ 'CountryId': '1' }]).subscribe((data: any) => {
      //console.log(data)
      this.StateList = data;
      this.returnedStateList = this.StateList.slice(0, 10);

    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })



  }


  //---  make pop -up ---//
  openModal(template: TemplateRef<any>, id, make) {
    if (id != 0) {
      this.makeregister.value.company_name = make.CompanyName;// this.frmBuilder.group({

      var _MakeModel = {
        "company_name": make.CompanyName,
        "Id": make.Id
      };

      this.makeregister.setValue(_MakeModel);
      this.title = "Update";
    }
    else {
      this.title = "Add New";
      this.makeregister.reset();
    }
    //alert("dsad");
    //      this.makeregister.reset(); 
    this.isSubmitted = false;
    this.modalRef = this.modalService.show(template, this.config);
  }

  //--- make delete --------
  onDelete(id) {

    var ans = confirm("Do you want to delete insurer with Id: " + id);
    if (ans) {

      this.commonService.deleteMake(id).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.getMastersData();
          this.alerts = [
            {
              type: 'success',
              msg: `Insurer deleted successfully.`
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'sucess',
            msg: alert.msg
          }));
        } else {

          if (data.Error_value.ErrorCode == 112) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('Token');
            localStorage.removeItem('UserDetail');
            localStorage.removeItem('permissionList');
            localStorage.removeItem('UserId');
            this.router.navigate(['/login']);
          }

          if (data.Error_value.ErrorCode == 138) {
            this.alerts = [
              {
                type: 'success',
                msg: data.Error_value.ErrorText
              }
            ]
            this.alerts.map((alert: any) => ({
              type: 'sucess',
              msg: alert.msg
            }));
          }
          //this.loading = false;
          //this.alertService.error('You have entered the invalid details.');

        }
      },
        (err: HttpErrorResponse) => {
          console.log(err)
          this.loading = false;
          //this.alertService.error('You have entered the invalid details.');
        })

    }

  }

  //----- save make -------//
  onMakeSave() {

    this.isSubmitted = true;
    if (!this.makeregister.valid)
      return;

    this.loading = true;

    this.commonService.saveMake(this.makeregister.value).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.makeregister.reset();
        this.isSubmitted = false;
        this.getMastersData();
        this.alerts = [
          {
            type: 'success',
            msg: `Make saved Successfully.`
          }
        ]
        this.alerts.map((alert: any) => ({
          type: 'sucess',
          msg: alert.msg
        }));


      } else {
        this.loading = false;
        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          this.router.navigate(['/login']);
        } else {

          this.alerts = [
            {
              type: 'danger',
              msg: data.Error_value.ErrorText
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'danger',
            msg: alert.msg
          }));


        }
        //this.alertService.error('You have entered the invalid details.');

      }
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

  }


  //---  Policy Type  pop -up-------- //

  openModalPolicy(template: TemplateRef<any>, id, policy) {
    if (id != 0) {
      var _PolicyModel = {
        "Type": policy.Type,
        "Id": policy.Id
      };

      this.policyregister.setValue(_PolicyModel);
      this.title = "Update";
    }
    else {
      this.title = "Add New";
      this.policyregister.reset();
    }
    //alert("dsad");
    //      this.makeregister.reset(); 
    this.isSubmitted = false;
    this.modalRef = this.modalService.show(template, this.config);
  }
  //---  Delete Policy Type -------- //
  onDeletePolicyType(id) {

    var ans = confirm("Do you want to delete Policy Type with Id: " + id);
    if (ans) {

      this.commonService.DeletePolicyType(id).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.getMastersData();
          this.alerts = [
            {
              type: 'success',
              msg: `Policy Type deleted successfully.`
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'sucess',
            msg: alert.msg
          }));
        } else {

          if (data.Error_value.ErrorCode == 112) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('Token');
            localStorage.removeItem('UserDetail');
            localStorage.removeItem('permissionList');
            localStorage.removeItem('UserId');
            this.router.navigate(['/login']);
          }

          if (data.Error_value.ErrorCode == 138) {
            this.alerts = [
              {
                type: 'success',
                msg: data.Error_value.ErrorText
              }
            ]
            this.alerts.map((alert: any) => ({
              type: 'sucess',
              msg: alert.msg
            }));
          }
          //this.loading = false;
          //this.alertService.error('You have entered the invalid details.');

        }
      },
        (err: HttpErrorResponse) => {
          console.log(err)
          this.loading = false;
          //this.alertService.error('You have entered the invalid details.');
        })

    }

  }

  //----- save Policy Type -------//
  onPolicyTypeSave() {

    this.isSubmitted = true;
    if (!this.policyregister.valid)
      return;

    this.loading = true;

    this.commonService.savePolicyType(this.policyregister.value).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.policyregister.reset();
        this.isSubmitted = false;
        this.getMastersData();
        this.alerts = [
          {
            type: 'success',
            msg: `policy Type saved Successfully.`
          }
        ]
        this.alerts.map((alert: any) => ({
          type: 'sucess',
          msg: alert.msg
        }));


      } else {
        this.loading = false;
        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          this.router.navigate(['/login']);
        } else {

          this.alerts = [
            {
              type: 'danger',
              msg: data.Error_value.ErrorText
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'danger',
            msg: alert.msg
          }));


        }
        //this.alertService.error('You have entered the invalid details.');

      }
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

  }

  //---  Driver Type  pop -up-------- //
  openModalDriver(template: TemplateRef<any>, id, driver) {
    debugger;
    console.log(id, driver);
    if (id != 0) {
      var _DriverModel = {
        "Driver_Type": driver.Type,
        "Id": driver.Id
      };

      this.driverregister.setValue(_DriverModel);
      this.title = "Update";
    }
    else {
      this.title = "Add New";
      this.driverregister.reset();
    }
    //alert("dsad");
    //      this.makeregister.reset(); 
    this.isSubmitted = false;
    this.modalRef = this.modalService.show(template, this.config);
  }

  //---  Delete Driver Type -------- //
  onDeleteDriverType(id) {

    var ans = confirm("Do you want to delete Driver Type with Id: " + id);
    if (ans) {

      this.commonService.DeleteDriverType(id).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.getMastersData();
          this.alerts = [
            {
              type: 'success',
              msg: `Driver Type deleted successfully.`
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'sucess',
            msg: alert.msg
          }));
        } else {

          if (data.Error_value.ErrorCode == 112) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('Token');
            localStorage.removeItem('UserDetail');
            localStorage.removeItem('permissionList');
            localStorage.removeItem('UserId');
            this.router.navigate(['/login']);
          }

          if (data.Error_value.ErrorCode == 138) {
            this.alerts = [
              {
                type: 'success',
                msg: data.Error_value.ErrorText
              }
            ]
            this.alerts.map((alert: any) => ({
              type: 'sucess',
              msg: alert.msg
            }));
          }
          //this.loading = false;
          //this.alertService.error('You have entered the invalid details.');

        }
      },
        (err: HttpErrorResponse) => {
          console.log(err)
          this.loading = false;
          //this.alertService.error('You have entered the invalid details.');
        })

    }

  }

  //----- save Driver  Type-------//
  onDriverTypeSave() {

    this.isSubmitted = true;
    if (!this.driverregister.valid)
      return;

    this.loading = true;

    this.commonService.saveDriverType(this.driverregister.value).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.driverregister.reset();
        this.isSubmitted = false;
        this.getMastersData();
        this.alerts = [
          {
            type: 'success',
            msg: `driver Type saved Successfully.`
          }
        ]
        this.alerts.map((alert: any) => ({
          type: 'sucess',
          msg: alert.msg
        }));


      } else {
        this.loading = false;
        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          this.router.navigate(['/login']);
        } else {

          this.alerts = [
            {
              type: 'danger',
              msg: data.Error_value.ErrorText
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'danger',
            msg: alert.msg
          }));


        }
        //this.alertService.error('You have entered the invalid details.');

      }
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

  }


  //---  Unit type pop -up ---//
  openModalUnitType(template: TemplateRef<any>, id, UnitType) {
    ///this.getMastersData();
    debugger;
    console.log(this.UnitTypeCategoryMasterList);
    if (id != 0) {
      this.unittyperegister.value.Unit_Type = UnitType.CompanyName;// this.frmBuilder.group({

      var _UnitTypeModel = {
        "Unit_Type": UnitType.Type,
        "Id": UnitType.Id,
        "UnitTypeId": UnitType.CategoryId,
      };


      this.unittyperegister.setValue(_UnitTypeModel);
      this.title = "Update";
    }
    else {
      this.title = "Add New";
      this.unittyperegister.reset();
    }
    //alert("dsad");
    //      this.makeregister.reset(); 
    this.isSubmitted = false;
    this.modalRef = this.modalService.show(template, this.config);
  }

  //----- save Unit Type -------//
  onUnitTypeSave() {

    this.isSubmitted = true;
    if (!this.unittyperegister.valid)
      return;

    this.loading = true;

    this.commonService.saveUnitType(this.unittyperegister.value).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.unittyperegister.reset();
        this.isSubmitted = false;
        this.getMastersData();
        this.alerts = [
          {
            type: 'success',
            msg: `Unit Type saved Successfully.`
          }
        ]
        this.alerts.map((alert: any) => ({
          type: 'sucess',
          msg: alert.msg
        }));


      } else {
        this.loading = false;
        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          this.router.navigate(['/login']);
        } else {

          this.alerts = [
            {
              type: 'danger',
              msg: data.Error_value.ErrorText
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'danger',
            msg: alert.msg
          }));


        }
        //this.alertService.error('You have entered the invalid details.');

      }
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

  }



//---  Cargo type pop -up ---//
openModalCargo(template: TemplateRef<any>, id, cargo) {
debugger
  if (id != 0) {
    this.cargotyperegister.value.company_name = cargo.CompanyName;// this.frmBuilder.group({

    var _CargoModel = {
      "Cargo_Type": cargo.Type,
      "Id": cargo.Id
    };

    this.cargotyperegister.setValue(_CargoModel);
    this.title = "Update";
  }
  else {
    this.title = "Add New";
    this.cargotyperegister.reset();
  }
  //alert("dsad");
  //      this.makeregister.reset(); 
  this.isSubmitted = false;
  this.modalRef = this.modalService.show(template, this.config);
}




  //----- save Cargo Type -------//
  onCargoTypeSave() {

    console.log(this.cargotyperegister);
    this.isSubmitted = true;
    if (!this.cargotyperegister.valid)
      return;

    this.loading = true;

    this.commonService.saveCargoType(this.cargotyperegister.value).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.cargotyperegister.reset();
        this.isSubmitted = false;
        this.getMastersData();
        this.alerts = [
          {
            type: 'success',
            msg: `Cargo Type saved Successfully.`
          }
        ]
        this.alerts.map((alert: any) => ({
          type: 'sucess',
          msg: alert.msg
        }));


      } else {
        this.loading = false;
        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          this.router.navigate(['/login']);
        } else {

          this.alerts = [
            {
              type: 'danger',
              msg: data.Error_value.ErrorText
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'danger',
            msg: alert.msg
          }));


        }
        //this.alertService.error('You have entered the invalid details.');

      }
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

  }

  
  //---  Delete Driver Type -------- //
  onDeleteCargoType(id) {

    var ans = confirm("Do you want to delete  Cargo Type with Id: " + id);
    if (ans) {

      this.commonService.onDeleteCargoType(id).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.getMastersData();
          this.alerts = [
            {
              type: 'success',
              msg: `Cargo Type deleted successfully.`
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'sucess',
            msg: alert.msg
          }));
        } else {

          if (data.Error_value.ErrorCode == 112) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('Token');
            localStorage.removeItem('UserDetail');
            localStorage.removeItem('permissionList');
            localStorage.removeItem('UserId');
            this.router.navigate(['/login']);
          }

          if (data.Error_value.ErrorCode == 138) {
            this.alerts = [
              {
                type: 'success',
                msg: data.Error_value.ErrorText
              }
            ]
            this.alerts.map((alert: any) => ({
              type: 'sucess',
              msg: alert.msg
            }));
          }
          //this.loading = false;
          //this.alertService.error('You have entered the invalid details.');

        }
      },
        (err: HttpErrorResponse) => {
          console.log(err)
          this.loading = false;
          //this.alertService.error('You have entered the invalid details.');
        })

    }

  }


  //---  make pop -up ---//
  openModalStateTax(template: TemplateRef<any>, id, statetax) {
    if (id != 0) {
   //   this.statetaxregister.value.State = statetax.State;// this.frmBuilder.group({
  //      this.statetaxregister.value.StateCode = statetax.StateCode;
  //      this.statetaxregister.value.Tax = statetax.Tax;

      var _StateTaxModel = {
        "State": statetax.State,
        "StateCode": statetax.StateCode,
        "Tax": statetax.Tax,
        "StateId": statetax.StateId
      };

      this.statetaxregister.setValue(_StateTaxModel);
      this.title = "Update";
    }
    else {
      this.title = "Add New";
      this.statetaxregister.reset();
    }
    //alert("dsad");
    //      this.makeregister.reset(); 
    this.isSubmitted = false;
    this.modalRef = this.modalService.show(template, this.config);
  }

//  onStateTaxSave

  //----- save Cargo Type -------//
  onStateTaxSave() {

    console.log(this.statetaxregister);
    this.isSubmitted = true;
    if (!this.statetaxregister.valid)
      return;

    this.loading = true;

    this.commonService.onStateTaxSave(this.cargotyperegister.value).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.statetaxregister.reset();
        this.isSubmitted = false;
        this.getMastersData();
        this.alerts = [
          {
            type: 'success',
            msg: `State Tax saved Successfully.`
          }
        ]
        this.alerts.map((alert: any) => ({
          type: 'sucess',
          msg: alert.msg
        }));


      } else {
        this.loading = false;
        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          this.router.navigate(['/login']);
        } else {

          this.alerts = [
            {
              type: 'danger',
              msg: data.Error_value.ErrorText
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'danger',
            msg: alert.msg
          }));


        }
        //this.alertService.error('You have entered the invalid details.');

      }
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

  }

  
  //---  Delete Driver Type -------- //
  onDeleteStateTax(id) {

    var ans = confirm("Do you want to delete  State Tax with Id: " + id);
    if (ans) {

      this.commonService.onDeleteStateTax(id).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.getMastersData();
          this.alerts = [
            {
              type: 'success',
              msg: `State  deleted successfully.`
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'sucess',
            msg: alert.msg
          }));
        } else {

          if (data.Error_value.ErrorCode == 112) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('Token');
            localStorage.removeItem('UserDetail');
            localStorage.removeItem('permissionList');
            localStorage.removeItem('UserId');
            this.router.navigate(['/login']);
          }

          if (data.Error_value.ErrorCode == 138) {
            this.alerts = [
              {
                type: 'success',
                msg: data.Error_value.ErrorText
              }
            ]
            this.alerts.map((alert: any) => ({
              type: 'sucess',
              msg: alert.msg
            }));
          }
          //this.loading = false;
          //this.alertService.error('You have entered the invalid details.');

        }
      },
        (err: HttpErrorResponse) => {
          console.log(err)
          this.loading = false;
          //this.alertService.error('You have entered the invalid details.');
        })

    }

  }




  pageChanged(event, master): void {
    console.log(event);
    if (master == 1) {
      const startItem = (event.page - 1) * event.itemsPerPage;
      const endItem = event.page * event.itemsPerPage;
      this.returnedMakeList = this.MakeList.slice(startItem, endItem);
    } else if (master == 2) {
      const startItem = (event.page - 1) * event.itemsPerPage;
      const endItem = event.page * event.itemsPerPage;
      this.returnedUnitTypeList = this.UnitTypeList.slice(startItem, endItem);
    }
   else if (master == 5) {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedCargoTypeList = this.CargoTypeMasterList.slice(startItem, endItem);
  }
  else if (master == 6) {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedStateList = this.StateList.slice(startItem, endItem);
  }

    console.log(event);
  }

  get company_name() {
    return this.makeregister.get('company_name');
  }

  get Type() {
    return this.policyregister.get('Type');
  }
  get Driver_Type() {
    return this.driverregister.get('Driver_Type');
  }


  get Unit_Type() {
    return this.driverregister.get('Unit_Type');
  }

  get Cargo_Type() {
    return this.cargotyperegister.get('Cargo_Type');
  }

  get State() {
    return this.statetaxregister.get('State');
  }

  get StateCode() {
    return this.statetaxregister.get('StateCode');
  }

  get Tax() {
    return this.statetaxregister.get('Tax');
  }



  ngOnInit() {
    this.getMastersData();
    this.getStates();
    this.makeregister = this.frmBuilder.group({
      Id: 0,
      company_name: ["", [Validators.required]],
    });
    this.policyregister = this.frmBuilder.group({
      Id: 0,
      Type: ["", [Validators.required]],
    });
    this.driverregister = this.frmBuilder.group({
      Id: 0,
      Driver_Type: ["", [Validators.required]],
    });
    this.unittyperegister = this.frmBuilder.group({
      Id: 0,
      Unit_Type: ["", [Validators.required,Validators.maxLength(30)]],
      UnitTypeId: 0
    });
    this.cargotyperegister = this.frmBuilder.group({
      Id: 0,
      Cargo_Type: ["", [Validators.required,Validators.maxLength(30)]],

    });
    this.statetaxregister = this.frmBuilder.group({
      StateId: 0,
      State: ["", [Validators.required,Validators.maxLength(30)]],
      StateCode: ["", [Validators.required]],
      Tax: ["", [Validators.required]],
    });

  }


}
