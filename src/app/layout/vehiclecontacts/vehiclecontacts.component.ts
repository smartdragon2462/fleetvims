import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { VehiclesService } from '../../shared/services/vehicles.service';
import { CommonService } from '../../shared/services/common.service';
import { PoliciesService } from '../../shared/services/policies.service';

import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { SerialnoValidator } from '../../shared/validators/serialno.validator';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';





@Component({
  selector: 'app-vehiclecontacts',
  templateUrl: './vehiclecontacts.component.html',
  styleUrls: ['./vehiclecontacts.component.scss'],
  animations: [routerTransition()]
})


export class VehicleContactsComponent implements OnInit {

  // Our array of vehiclecontacts
  CargoTypeMasterList: any[];
  UnitTypeList: any[];
  PowerUnitTypeList: any[];
  NonPowerUnitTypeList: any[];
  DriverTypeList: any[];
  PolicyTypeList: any[];
  MakeList: any[];
  LeinholderList: any[];
  Leinholderkeys: any[];
  ClientList: any[];
  ClientListSame: any[];
  Clientkeys: any[];
  ClientPolicies: any[];
  vehiclecontacts: any[];
  Citylist: any[];
  ContactCitylist: any[];
  ContactList: any[];
  Statelist: any[];
  VehicleTypeList: any[];
  ContactRoleList: any[];
  ContactStatelist: any[];
  dataTable: any;
  UserInfo: any;
  closeResult: string;
  reortType: any;
  isSubmitted: boolean = false;
  isVINvalidation: boolean = true;
  isSubmitted_contact: boolean = false;
  showPassword: boolean = false;
  loading: boolean = false;
  contactregister: FormGroup;
  register: FormGroup;
  title: string = "Add New";
  modalRef: BsModalRef;
  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };
  id: number;
  clientid: number = 0;
  DriverTypeValue: number = 0;
  UnitTypeValue: number = 0;
  alerts: any = []
  years = [];
  PolicyoptionsMap = []
  IsPAPolicy: number = 0;
  IsNTPolicy: number = 0;
  IsOAPolicy: number = 0;
  IsPDPolicy: number = 0;
  IsALPolicy: number = 0;
  policyUnitLimit: number = 0;
  ValuePolicyCheck: number = 0;
  coveragePolicy: Array<any> = [];
  value: string = '';
  minAddedDate: Date;
  showFutureValue: boolean = false;

  constructor(private frmBuilder: FormBuilder, private Router: Router, private router: ActivatedRoute, private VehiclesService: VehiclesService, private http: HttpClient, private chRef: ChangeDetectorRef, private modalService: BsModalService, private commonService: CommonService, private spinner: NgxSpinnerService, private policiesService: PoliciesService) {

    if (this.router.snapshot.params["id"]) {
      this.id = this.router.snapshot.params["id"];

    }

    if (this.router.snapshot.params["id"]) {
      this.clientid = this.router.snapshot.params["clientid"];

    }

    var year = new Date().getFullYear();
    for (var i = year + 1; i >= 1970; i--) {
      this.years.push(i);
    }
    this.UserInfo = JSON.parse(localStorage.getItem('UserDetail'));

    if (this.UserInfo.Module == 3) {
      this.minAddedDate = new Date();
    }

  }

  chageDriverTypePolicy(value) {
    this.DriverTypeValue = value;
  }
  chageUnitTypePolicy(value) {
    if (value == 4 || value == 5 || value == 6 || value == 7 || value == 8 || value == 9 || value == 10) {
      this.UnitTypeValue = 2;
    }
    else if (value == 1 || value == 2 || value == 3 || value == 12 || value == 13 || value == 14 || value == 15) {
      this.UnitTypeValue = 1;
    } else {
      this.UnitTypeValue = 0;
    }

  }


  getPolicies(id) {

    //alert("dsd");
    var _PoliciesOptions = {
      "PageIndex": 1, "PageSize": 200, "SortBy": "0", "SortOrder": 2, "Filter": {
        "SearchText": '',
        "Deleted": false, "ClientId": id
      }
    }


    this.policiesService.getPolicies(_PoliciesOptions).subscribe((data: any) => {

      console.log(data);

      if (data.Result) {

        this.ClientPolicies = data.Result_value.SearchResult;
        this.coveragePolicy = [];



        this.ClientPolicies.forEach((policy) => {

          console.log(policy);

          this.coveragePolicy[policy.CoverageType] = this.coveragePolicy[policy.CoverageType] || [];
          this.coveragePolicy[policy.CoverageType].push({ 'Id': policy.PolicyId, 'Name': policy.Policy, 'Status': policy.Status });
          if (policy.CoverageType == 1 && policy.Status==3) {
            this.showFutureValue = true;
          }

        })
        console.log(this.coveragePolicy);


      } else {
        //this.loading = false;
        //this.alertService.error('You have entered the invalid details.');

      }
      this.spinner.hide()

    },
      (err: HttpErrorResponse) => {
        console.log("Some Error occured");
        //this.loading = false;
        // this.alertService.error('You have entered the invalid details.');
      })

  }
  getStates() {

    this.commonService.getSates([{ 'CountryId': '1' }]).subscribe((data: any) => {
      //console.log(data)
      this.Statelist = data;

    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })



  }

  sameasdriver(event) {

    const Driver = this.register.get('Driver');
    const Owner = this.register.get('Owner');



    if (event.target.checked) {

      Owner.setValue(Driver.value);
    } else {
      Owner.setValue('');

    }

  }

  sameasclient(event) {

    const ClientId = this.register.get('ClientId');
    const Owner = this.register.get('Owner');



    if (event.target.checked) {

      Owner.setValue(this.ClientListSame[ClientId.value]);
    } else {
      Owner.setValue('');

    }

  }

  removevinValidation(event) {
    const SerialNumber = this.register.get('SerialNumber');
    if (event.target.checked) {
      this.isVINvalidation = false;
      SerialNumber.clearValidators();
      SerialNumber.setValidators([Validators.minLength(17), Validators.maxLength(17)]);
      SerialNumber.clearAsyncValidators();

    } else {
      this.isVINvalidation = true;
      SerialNumber.setValidators([Validators.required, Validators.minLength(17), Validators.maxLength(17)]);
      SerialNumber.setAsyncValidators(SerialnoValidator.validSerialno(this.VehiclesService, this.id));
      //SerialNumber.setValue('');
    }
    SerialNumber.updateValueAndValidity();
  }

  getCities(stateId: any) {

    this.commonService.getCities(stateId).subscribe((data: any) => {
      console.log(data)
      this.Citylist = data;

    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

    //this.Citylist= [{ "id": "1",'name':'Inida' },{ "id": "2",'name':'USA' },{ "id": "3",'name':'UK' }]

  }

  getContactStates() {

    this.commonService.getSates([{ 'CountryId': '1' }]).subscribe((data: any) => {
      //console.log(data)
      this.ContactStatelist = data;

    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })



  }

  getContactCities(stateId: any) {

    this.commonService.getCities(stateId).subscribe((data: any) => {
      console.log(data)
      this.ContactCitylist = data;

    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

    //this.Citylist= [{ "id": "1",'name':'Inida' },{ "id": "2",'name':'USA' },{ "id": "3",'name':'UK' }]

  }



  _keyPress(event: any) {
    //alert(event.charCode);
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  onDeleteContact(id) {

    var ans = confirm("Do you want to delete Contact with Id: " + id);
    if (ans) {

      this.VehiclesService.deleteVehicleContact(id).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.getVehicle(this.id);
          this.alerts = [
            {
              type: 'success',
              msg: `Contact deleted successfully.`
            }
          ]
          this.alerts.map((alert: any) => ({
            type: 'sucess',
            msg: alert.msg
          }));
        } else {
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

  getVehicle(id) {
    this.spinner.show();
    this.VehiclesService.getVehicleById(id).subscribe((data: any) => {
      if (data.Result) {

        console.log("GAUUUUUU");
        console.log(data.Result_value);

        var vehicle = data.Result_value;
        this.ContactList = vehicle.ContactList;
        this.VehicleTypeList = vehicle.VehicleTypeList;
        this.ContactRoleList = vehicle.ContactRoleList;
        //console.log(vehicle.ContactList); 
        this.value = vehicle.Value;
        this.getPolicies(vehicle.ClientId);
        this.DriverTypeValue = vehicle.DriverType;

        if (vehicle.UnitType == 1 || vehicle.UnitType == 2 || vehicle.UnitType == 3 || vehicle.UnitType == 12 || vehicle.UnitType == 13 || vehicle.UnitType == 14 || vehicle.UnitType == 15) {
          this.UnitTypeValue = 1;
        } else {
          this.UnitTypeValue = 0;
        }

        //this.UnitTypeValue=vehicle.UnitType;

        var _VehicleModel = {
          "Unit": vehicle.Unit,
          "SerialNumber": vehicle.SerialNumber,
          "isNotReqired": vehicle.isNotReqired,
          "ModelYear": vehicle.ModelYear,
          'Makes': vehicle.Makes,
          "Value": vehicle.Value,
          "Owner": vehicle.Owner,
          "Driver": vehicle.Driver,
          "Driver2": vehicle.Driver2,
          "Addedbound": new Date(vehicle.Addedbound),
          'LienholderId1': vehicle.LienholderId1,
          "LienholderId2": vehicle.LienholderId2,
          'UnitType': vehicle.UnitType,
          'DriverType': vehicle.DriverType,
          'CertificateNotes': vehicle.CertificateNotes,
          'ClientId': vehicle.ClientId,
          'VehicleId': vehicle.VehicleId,
          'PDPolicies': 0,
          'NTPolicies': 0,
          'OAPolicies': 0,
          'PAPolicies': 0,
          'ALPolicies': 0,
          'FutureValue': vehicle.FutureValue,
          'CargoType': vehicle.cargo_type_id

        };


        if (vehicle.isNotReqired) {
          alert("dasd");
          const SerialNumber = this.register.get('SerialNumber');
          this.isVINvalidation = false;
          SerialNumber.clearValidators();
          SerialNumber.setValidators([Validators.minLength(17), Validators.maxLength(17)]);
          SerialNumber.clearAsyncValidators();
          SerialNumber.updateValueAndValidity();
        }


        //data.Result_value.Policies=[21,22];
        console.log(vehicle.Policies);
        var _VehiclesPolicy = [];

        if (vehicle.Policies) {
          vehicle.Policies.forEach(value => {

            if (value.CoverageType == '3') {
              this.IsOAPolicy = value.PolicyId
            } else if (value.CoverageType == '4') {
              this.IsPAPolicy = value.PolicyId
            } else if (value.CoverageType == '2') {
              this.IsNTPolicy = value.PolicyId
            } else if (value.CoverageType == '6') {
              this.IsALPolicy = value.PolicyId
            } else {
              this.IsPDPolicy = value.PolicyId
              this.getPolicy(value.PolicyId);
            }

          });
        } else {
          console.log("GGG");
        }


        if (this.IsPAPolicy) {
          this.PolicyoptionsMap.push(this.IsPAPolicy);

        }
        if (this.IsNTPolicy) {
          this.PolicyoptionsMap.push(this.IsNTPolicy);
        }
        if (this.IsOAPolicy) {
          this.PolicyoptionsMap.push(this.IsOAPolicy);
        }
        if (this.IsALPolicy) {
          this.PolicyoptionsMap.push(this.IsALPolicy);
        }
        if (this.IsPDPolicy) {
          this.PolicyoptionsMap.push(this.IsPDPolicy);
          const Value = this.register.get('Value');
          Value.setValidators([Validators.required]);
          Value.updateValueAndValidity();
        }
        //this.PolicyoptionsMap.push(option); 
        console.log(this.PolicyoptionsMap);
        //_VehicleModel.push({PDPolicies:this.IsPDPolicy,NTPolicies:this.IsNTPolicy,OAPolicies:this.IsOAPolicy,PAPolicies:this.IsPAPolicy})

        _VehicleModel.PDPolicies = this.IsPDPolicy;
        _VehicleModel.NTPolicies = this.IsNTPolicy;
        _VehicleModel.OAPolicies = this.IsOAPolicy;
        _VehicleModel.PAPolicies = this.IsPAPolicy;
        _VehicleModel.ALPolicies = this.IsALPolicy;


        //delete _VehicleModel.Policies;

        //vehicle.Policies=_VehiclesPolicy;

        this.register.setValue(_VehicleModel);
        this.spinner.hide();
        // this.loading = false;

      } else {
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

  sortProperties(obj) {
    // convert object into array
    var sortable = [];
    for (var key in obj)
      if (obj.hasOwnProperty(key))
        sortable.push([key, obj[key]]); // each item is an array in format [key, value]

    // sort items by value
    sortable.sort(function (a, b) {
      var x = a[1].toLowerCase(),
        y = b[1].toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  }

  getVehicleMasterDetails() {

    this.VehiclesService.getVehicleMasterDetails().subscribe((data: any) => {

      if (data.Result) {
        //alert("dd");
        console.log(data);
        this.UnitTypeList = data.Result_value.UnitTypeList;
        this.PowerUnitTypeList = data.Result_value.PowerUnitTypeList;
        this.NonPowerUnitTypeList = data.Result_value.NonPowerUnitTypeList;

        this.DriverTypeList = data.Result_value.DriverTypeList;
        this.PolicyTypeList = data.Result_value.PolicyTypeList;
        this.MakeList = data.Result_value.MakeList;
        this.ClientListSame = data.Result_value.ClientList.Result_value.SearchResult;
        this.ClientList = this.sortProperties(data.Result_value.ClientList.Result_value.SearchResult);
        //this.Clientkeys = Object.keys(this.ClientList).filter(Number)
        this.LeinholderList = data.Result_value.LienholderList.Result_value.SearchResult;
        //this.Leinholderkeys = Object.keys(this.LeinholderList).filter(Number)
        this.CargoTypeMasterList = data.Result_value.CargoTypesList;

        console.log(data.Result_value.MakeList);

      } else {
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


  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onVehiclesSave() {
    this.isSubmitted = true;
    if (!this.register.valid)
      return;

    this.loading = true;
    var _VehiclesModal = this.register.value;
    var _VehiclesPolicy = [];

    this.PolicyoptionsMap.forEach(function (value, key) {
      var innerObj = {};
      innerObj["PolicyId"] = value;
      _VehiclesPolicy.push(innerObj);

    })
    delete _VehiclesModal.Policies;
    _VehiclesModal.Policies = _VehiclesPolicy;

    if (this.UserInfo.Module == 3) {
      _VehiclesModal.ClientId = this.UserInfo.ModuleId

    }


    _VehiclesModal.Addedbound = this.formatDate(_VehiclesModal.Addedbound)






    //date.toISOString();
    //alert(_VehiclesModal.Addedbound);


    this.VehiclesService.saveVehicles(_VehiclesModal).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        //this.modalRef.hide()
        //this.register.reset();  
        //this.getVehicles();

        this.alerts = [
          {
            type: 'success',
            msg: `Vehicle Updated Successfully.`
          }
        ]
        this.alerts.map((alert: any) => ({
          type: 'sucess',
          msg: alert.msg
        }));

        if (this.clientid > 0) {

          this.Router.navigate(['/vehicles/client/' + this.clientid]);
        } else {
          this.Router.navigate(['vehicles'])

        }


      } else {
        this.loading = false;
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
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })


    //console.log(this.register.get('Email').value);



  }


  onVehicleContactSave() {

    this.isSubmitted_contact = true;
    if (!this.contactregister.valid)
      return;



    var _contactInfo = this.contactregister.value;
    _contactInfo.Module = 7
    _contactInfo.ModuleId = this.id;

    if (!_contactInfo.ContactId) {
      _contactInfo.ContactId = 0;
    }
    if (!_contactInfo.Password) {
      _contactInfo.Password = "";
    }
    if (!_contactInfo.PortalAccess) {
      _contactInfo.PortalAccess = false;
    }
    if (!_contactInfo.ReportCertificates) {
      _contactInfo.ReportCertificates = false;
    }
    if (!_contactInfo.ReportMonthlySummary) {
      _contactInfo.ReportMonthlySummary = false;
    }
    console.log(_contactInfo);

    this.VehiclesService.saveVehicleContact(_contactInfo).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.contactregister.reset();
        this.getVehicle(this.id);
        //this.getVehicleContacts();

        this.alerts = [
          {
            type: 'success',
            msg: `Contact Saved successfully.`
          }
        ]
        this.alerts.map((alert: any) => ({
          type: 'sucess',
          msg: alert.msg
        }));



      } else {
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');

      }
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

  }




  get CertificateNotes() {
    return this.register.get('CertificateNotes');
  }
  get PolicyType() {
    return this.register.get('PolicyType');
  }
  get DriverType() {
    return this.register.get('DriverType');
  }
  get UnitType() {
    return this.register.get('UnitType');
  }
  get isNotReqired() {
    return this.register.get('isNotReqired');
  }
  get LienholderId2() {
    return this.register.get('LienholderId2');
  }
  get LienholderId1() {
    return this.register.get('LienholderId1');
  }
  get Driver() {
    return this.register.get('Driver');
  }

  get Driver2() {
    return this.register.get('Driver2');
  }

  get Owner() {
    return this.register.get('Owner');
  }
  get Value() {
    return this.register.get('Value');
  }
  get Makes() {
    return this.register.get('Makes');
  }
  get ModelYear() {
    return this.register.get('ModelYear');
  }
  get SerialNumber() {
    return this.register.get('SerialNumber');
  }
  get Unit() {
    return this.register.get('Unit');
  }
  get VehicleId() {
    return this.register.get('VehicleId');
  }

  get Addedbound() {
    return this.register.get('Addedbound');
  }

  get ClientId() {
    return this.register.get('ClientId');
  }



  get ContactEmail() {
    return this.contactregister.get('ContactEmail');
  }
  get ContactFirstName() {
    return this.contactregister.get('ContactFirstName');
  }
  get ContactLastName() {
    return this.contactregister.get('ContactLastName');
  }
  get ContactId() {
    return this.contactregister.get('ContactId');
  }
  get ContactPhone() {
    return this.contactregister.get('ContactPhone');
  }

  get ContactAddress1() {
    return this.contactregister.get('ContactAddress1');
  }
  get ContactAddress2() {
    return this.contactregister.get('ContactAddress2');
  }
  get ContactCityId() {
    return this.contactregister.get('ContactCityId');
  }
  get ContactStateId() {
    return this.contactregister.get('ContactStateId');
  }
  get ContactZip() {
    return this.contactregister.get('ContactZip');
  }
  get RoleId() {
    return this.contactregister.get('RoleId');
  }
  get PortalAccess() {
    return this.contactregister.get('PortalAccess');
  }



  get ReportCertificates() {
    return this.contactregister.get('ReportCertificates');
  }

  get ReportMonthlySummary() {
    return this.contactregister.get('ReportMonthlySummary');
  }
  get Password() {
    return this.contactregister.get('Password');
  }





  ngOnInit() {
    this.IsPAPolicy = 0;
    this.IsNTPolicy = 0;
    this.IsOAPolicy = 0;
    this.IsPDPolicy = 0
    this.IsALPolicy = 0


    this.register = this.frmBuilder.group({
      Unit: ["", [Validators.required]],
      SerialNumber: ["", [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      isNotReqired: [""],
      ModelYear: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      Makes: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      Value: [""],
      Owner: [""],
      Driver: [""],
      Addedbound: ["", [Validators.required]],
      Driver2: [""],
      LienholderId1: [""],
      LienholderId2: [""],
      UnitType: [""],
      DriverType: [""],
      CertificateNotes: [""],
      ClientId: ["", [Validators.required]],
      VehicleId: [""],
      PDPolicies: [""],
      NTPolicies: [""],
      OAPolicies: [""],
      ALPolicies: [""],
      PAPolicies: [""],
      FutureValue: [""],
      CargoType: [""]
    });
    this.register.controls['SerialNumber'].setAsyncValidators(SerialnoValidator.validSerialno(this.VehiclesService, this.id));
    this.contactregister = this.frmBuilder.group({
      ContactFirstName: ["", [Validators.required]],
      ContactLastName: ["", [Validators.required]],
      ContactEmail: ["", [Validators.required, EmailValidator]],
      ContactAddress1: [""],
      ContactAddress2: [""],
      PortalAccess: [""],
      Password: [""],
      RoleId: ["", [Validators.required]],
      ContactStateId: [""],
      ContactCityId: [""],
      ContactZip: [""],
      ContactPhone: ["", [Validators.pattern('^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$')]],
      ContactId: [""],
      ReportMonthlySummary: [""],
      ReportCertificates: [""]

    });

    if (this.id > 0) {
      if (this.UserInfo.Module == 3) {
        const ClientId = this.register.get('ClientId');
        ClientId.clearValidators();
        //this.getPolicies(this.UserInfo.ModuleId)
      }

      this.getVehicle(this.id);
      this.getVehicleMasterDetails()

    }
  }

  onValueChange(VehicleValue: string) {
    this.ValuePolicyCheck = parseInt(VehicleValue.replace(/[^\d.]/g, ''));
    console.log(this.ValuePolicyCheck)
  }

  getPolicy(id) {

    this.policiesService.getPolicyById(id).subscribe((data: any) => {
      console.log("Gaurav");
      console.log(data)
      if (data.Result) {
        this.policyUnitLimit = data.Result_value.UnitLimit;
      } else {
        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          //this.route.navigate(['/login']);
        }
        //this.loading = false;
        //this.alertService.error('You have entered the invalid details.');

      }
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        //this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })


  }
  updatePolicyOptions(type, event) {

    //alert(type);
    var option = event.target.value;
    console.log(event);

    this.PolicyoptionsMap = [];
    if (type == "PA") {
      // alert(this.PolicyoptionsMap.indexOf(this.IsOAPolicy));
      this.PolicyoptionsMap.splice(this.PolicyoptionsMap.indexOf(this.IsPAPolicy), 1);
      if (event.target.localName == 'select' || event.target.checked) {
        this.IsPAPolicy = option;
      } else {
        this.IsPAPolicy = 0;
      }


    } else if (type == "NT") {
      this.PolicyoptionsMap.splice(this.PolicyoptionsMap.indexOf(this.IsNTPolicy), 1);
      if (event.target.localName == 'select' || event.target.checked) {
        this.IsNTPolicy = option;
      } else {
        this.IsNTPolicy = 0;
      }

    } else if (type == "OA") {
      this.PolicyoptionsMap.splice(this.PolicyoptionsMap.indexOf(this.IsOAPolicy), 1);
      if (event.target.localName == 'select' || event.target.checked) {
        this.IsOAPolicy = option;
      } else {
        this.IsOAPolicy = 0;
      }

    } else if (type == "AL") {
      this.PolicyoptionsMap.splice(this.PolicyoptionsMap.indexOf(this.IsALPolicy), 1);
      if (event.target.localName == 'select' || event.target.checked) {
        this.IsALPolicy = option;
      } else {
        this.IsALPolicy = 0;
      }

    } else {
      this.PolicyoptionsMap.splice(this.PolicyoptionsMap.indexOf(this.IsPDPolicy), 1);
      if (event.target.localName == 'select' || event.target.checked) {
        this.IsPDPolicy = option;
        this.getPolicy(option);
      } else {
        this.IsPDPolicy = 0;
        this.policyUnitLimit = 0;
      }
      const Value = this.register.get('Value');
      //alert(option);
      if (option) {
        Value.setValidators([Validators.required]);
      } else {
        Value.clearValidators();
      }
      Value.updateValueAndValidity();
    }
    if (this.IsPAPolicy) {
      this.PolicyoptionsMap.push(this.IsPAPolicy);
    }
    if (this.IsNTPolicy) {
      this.PolicyoptionsMap.push(this.IsNTPolicy);
    }
    if (this.IsOAPolicy) {
      this.PolicyoptionsMap.push(this.IsOAPolicy);
    }
    if (this.IsALPolicy) {
      this.PolicyoptionsMap.push(this.IsALPolicy);
    }
    if (this.IsPDPolicy) {
      this.PolicyoptionsMap.push(this.IsPDPolicy);
    }
    //this.PolicyoptionsMap.push(option); 
    console.log(this.PolicyoptionsMap);

  }
  showPasswordField() {

    this.showPassword = !this.showPassword;
    const password = this.contactregister.get('Password');
    if (this.title == "Add New" && this.showPassword) {
      //alert("ddd"); 
      password.setValidators([Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]);
    } else {
      password.clearValidators();
    }
    password.updateValueAndValidity();

  }

  openModal(template: TemplateRef<any>, c_data) {
    this.title = "Add New";
    this.showPassword = false;
    this.contactregister.reset();
    this.getContactStates();
    this.isSubmitted_contact = false;
    const password = this.contactregister.get('Password');
    password.clearValidators();
    this.reortType = 1;
    if (c_data != 0) {
      console.log(c_data);
      console.log(c_data.RoleList[0].RoleId);
      this.title = "Edit";

      var _ContactModel = {
        "ContactEmail": c_data.Email,
        "ContactFirstName": c_data.FirstName,
        "ContactLastName": c_data.LastName,
        'ContactAddress1': c_data.Address1,
        "ContactAddress2": c_data.Address2,
        "PortalAccess": c_data.PortalAccess,
        "ContactStateId": c_data.StateId,
        'ContactCityId': c_data.CityId,
        "ContactZip": c_data.Zip,
        'ContactPhone': c_data.Phone,
        'RoleId': c_data.RoleList[0].RoleId,
        'ContactId': c_data.UserId,
        'Password': '',
        'ReportMonthlySummary': c_data.ReportMonthlySummary,
        'ReportCertificates': c_data.ReportCertificates
      };
      this.showPassword = c_data.PortalAccess;
      this.getContactCities(c_data.StateId);
      this.contactregister.setValue(_ContactModel);

    }

    this.modalRef = this.modalService.show(template, this.config);
  }


}
