import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, ChangeDetectorRef, TemplateRef, ViewChild, ɵConsole } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { PoliciesService } from '../../shared/services/policies.service';
import { CommonService } from '../../shared/services/common.service';
import { ClientsService } from '../../shared/services/clients.service';
import { FormGroup, FormBuilder, Validators, EmailValidator, FormControl, FormArray } from '@angular/forms';
import { RolesService } from '../../shared/services/roles.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../../shared/services/excel.service';
import { VehiclesService } from '../../shared/services/vehicles.service';



@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
  animations: [routerTransition()]
})

export class PoliciesComponent implements OnInit {
  // dropdownList:any;
  selectedItems = [];
  dropdownSettings = {};
  //  CargoValue:number=0;
  //  dropdownList = [
  //    {
  //     CargoValue:0,
  //     CargoTypeMasterList: [],
  //    }];

  CargoTypeMasterList: any[];
  // Our array of policies
  CargoTyp: number = 0;
  policies: any[];
  Citylist: any[];
  Statelist: any[];
  dataTable: any;
  UserInfo: any;
  closeResult: string;
  search_value: string;
  ClientName: string;
  CoverageTypeList: any[];
  BillingCodeList: any[];
  PolicyTypeList: any[];
  BillingTypeList: any[];
  DeductibleTypeList: any[];
  PolicyStatusList: any[];
  StateList: any[];
  InsurerList: any[];
  InsurerListKeys: any[];
  ClientList: any[];
  ClientListKeys: any[];
  ContractList: any[];
  StateTax = {};
  SearchText: string = '';
  isSubmitted: boolean = false;
  isDeleted = false;
  loading: boolean = false;
  requirdeDeductibleType: boolean = true;
  register: FormGroup;
  dropdownListPD: FormGroup;
  title: string = "Add New";
  anularateSign: string = "$";
  modalRef: BsModalRef;
  totalItems: number = 0;
  itemsPerPage: number = 10;
  //itemsPerPage: number = 1000000;
  PageIndex: number = 1;
  SortBy: number = 0;
  SortOrder: number = 1;
  clientid: number = 0;
  isStatus: number = 1;
  isCoveragetype: number = 0;
  coveragetypeId: number = 0;
  billingCodeId: number = 0;
  formtype: number = 0;
  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  alerts: any = [];
  ExpirationMinDate: Date;

  OldPolicyName: string = '';
  OldEffectiveDate: Date;
  OldExpirationDate: Date;
  viewOACheckbox: boolean = false;
  AddOA_MatrixView: boolean = false;
  viewPDCheckbox: boolean = false;
  AddPD_MatrixView: boolean = false;
  IsOA: boolean = false;
  ShowFilter: boolean = false;
  num: number = 0;
  countmasterlistvalue: number = 0;
  countmasterlistvalue1: number = 0;
  ConstantMasterlistvalue: number = 0;


  dropdownList: FormGroup;

  @ViewChild('content') content: any;


  constructor(private frmBuilder: FormBuilder, private router: ActivatedRoute, private policiesService: PoliciesService, private http: HttpClient, private chRef: ChangeDetectorRef, private modalService: BsModalService, private sanitizer: DomSanitizer, private commonService: CommonService, private spinner: NgxSpinnerService, public RolesService: RolesService, private route: Router, private vehiclesService: VehiclesService, private ClientsService: ClientsService, private excelService: ExcelService) {

    if (this.router.snapshot.params["id"]) {
      this.clientid = this.router.snapshot.params["id"];
      this.getClient(this.router.snapshot.params["id"]);
      this.isStatus = 1;

    }


    if (this.router.snapshot.params["pid"]) {
      this.getPolicy(this.router.snapshot.params["pid"])
      //this.clientid = this.router.snapshot.params["id"]; 
      //this.getClient(this.router.snapshot.params["id"]);
      //this.isStatus=1;  

    }

    this.UserInfo = JSON.parse(localStorage.getItem('UserDetail'))

    if (this.UserInfo.Module == 3) {

      this.clientid = this.UserInfo.ModuleId;
      this.ClientName = this.UserInfo.ModuleName
      //this.getClient(this.clientid);  

    }

    //console.log(this.ExpirationMinDate);
  }

  getPolicy(id) {

    this.policiesService.getPolicyById(id).subscribe((data: any) => {

      if (data.Result) {
        //alert("dsad");
        //alert("dsad");
        this.openModal(this.content, data.Result_value);
        //this.config.backdrop=fa
        //this.config.show=true;
        //this.policyName=data.Result_value.Policy;                 
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



  getClient(id) {

    this.ClientsService.getClientById(id).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.ClientName = data.Result_value.ClientName;
      } else {
        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          this.route.navigate(['/login']);
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


  exportPolicy(): void {

    var data = [];
    this.policies.forEach(vehicle => {

      var policydata = [];


      policydata['Client'] = vehicle['ClientName'];
      policydata['Coverage'] = vehicle['CoverageTypeText'];
      policydata['Policy'] = vehicle['Policy'];
      policydata['Unit Coverage Type'] = vehicle['PolicyTypeText'];
      policydata['EFF Date'] = vehicle['EffectiveDate'];
      policydata['EXP Date'] = vehicle['ExpirationDate'];
      policydata['Insurance Company'] = vehicle['InsurerName'];


      if (this.UserInfo.Module == '9' || this.UserInfo.Module == '1') {
        policydata['Contract'] = vehicle['ContractNo'];
      }

      data.push(policydata);

    });
    this.excelService.exportAsExcelFile(data, 'policy');

  }


  coverageTypeChange(coveragetypeId: any) {
    this.coveragetypeId = coveragetypeId
    const PolicyLimitValue = this.register.get('PolicyLimit');
    this.anularateSign = "$";
    if (coveragetypeId == 1) {
      this.anularateSign = "%";
    }

    // if(coveragetypeId==1){
    //     PolicyLimitValue.clearValidators();
    // }else{
    //     PolicyLimitValue.setValidators([Validators.required]);
    // }


  }

  billingCodeChange(billingCodeId: any) {
    this.billingCodeId = billingCodeId
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


  pageChanged(event: any): void {
    this.PageIndex = event.page;
    // console.log(this.PageIndex);
    this.getPolicies();
  }

  itemsPerPageChange(itemcount: any): void {
    this.itemsPerPage = itemcount;
    this.getPolicies();
  }


  onFilter(value) {

    this.SearchText = value;
    this.getPolicies();

  }

  statusFilter(status: any) {
    console.log(status)
    this.isStatus = status;
    this.getPolicies();

  }

  coverageTypeFilter(coveragetype: any) {
    console.log(status)
    this.isCoveragetype = coveragetype;
    this.getPolicies();

  }




  getPolicies() {

    this.spinner.show()
    var _PoliciesOptions = {
      "PageIndex":
        this.PageIndex, "PageSize": this.itemsPerPage, "SortBy": this.SortBy, "SortOrder": this.SortOrder, "Filter": {
          "SearchText": this.SearchText,
          "Deleted": this.isDeleted, "ClientId": this.clientid, "Status": this.isStatus, "CoverageType": this.isCoveragetype
        }
    }

    this.policiesService.getPolicies(_PoliciesOptions).subscribe((data: any) => {

      console.log(data);

      if (data.Result) {
        this.totalItems = data.Result_value.TotalRecords;
        this.policies = data.Result_value.SearchResult;
        /*this.chRef.detectChanges();
        const table: any = $('#policies_table');
        this.dataTable = table.DataTable({
            "order": [[ 1, "asc" ]]
        });*/

      } else {
        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          this.route.navigate(['/login']);
        }
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


  Sorting(field) {
    this.SortBy = field;
    if (this.SortOrder == 1) {
      this.SortOrder = 2
    } else {
      this.SortOrder = 1
    }
    this.getPolicies();
    //SortOrder: number = 2;

  }



  onDelete(id) {

    var ans = confirm("Do you want to delete policy with Id: " + id);
    if (ans) {

      this.policiesService.deletePolicy(id).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.getPolicies();
          this.PageIndex = 1;
          this.alerts = [
            {
              type: 'success',
              msg: `Policy deleted successfully.`
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
            this.route.navigate(['/login']);
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

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  //-----------------------------------//

  checkNew(value) {
    debugger
    var a = 0;
    var b = 0;
    if (value == 3) {
      if (this.register.value.IsOA == true) {
        if (b == 0) {
          this.register.value.IsOA = false;
          this.AddOA_MatrixView = false;
          a = a + 1;
        }
      }
      if (this.register.value.IsOA == null) {
        this.register.value.IsOA = true;
        this.AddOA_MatrixView = true;
      }
      else {
        if (a == 0) {
          this.register.value.IsOA = true;
          this.AddOA_MatrixView = true;
          b = b + 1;
        }
      }
    }
    else if (value = 1) {
      if (this.register.value.IsPD == true) {
        if (b == 0) {
          this.register.value.IsPD = false;
          this.AddPD_MatrixView = false;
          a = a + 1;
        }
      }
      if (this.register.value.IsPD == null) {
        this.register.value.IsPD = true;
        this.AddPD_MatrixView = true;
      }
      else {
        if (a == 0) {
          this.register.value.IsPD = true;
          this.AddPD_MatrixView = true;
          b = b + 1;
        }
      }
    }




  }


  onItemSelect1(item: any) {
    debugger
    var Check = this.CargoTypeMasterList.findIndex(x => x.Id == item.Id && x.Type == item.Type);
    console.log(Check);
    if (Check != -1) {
      this.CargoTypeMasterList.splice(Check, 1);
      this.countmasterlistvalue = this.countmasterlistvalue + 1;
    }
  }

  onSelectAll1(items: any) {
    debugger
    items.forEach((item1, index11) => {
      let Check = this.CargoTypeMasterList.findIndex(x => x.Id == item1.Id && x.Type == item1.Type);
      if (Check != -1) {
        this.CargoTypeMasterList.splice(Check, 1);
        this.countmasterlistvalue = this.countmasterlistvalue + 1;
      }
    });
  }

  onItemDeSelect1(item: any) {
    this.CargoTypeMasterList.push({
      Id: item.Id,
      Type: item.Type
    });
  }






  // var Check11 = this.CargoTypeMasterList.findIndex(x => x.Id == item1.Id);
  //       if (Check11 != -1) {
  //       this.countmasterlistvalue = this.countmasterlistvalue + 1;
  //         this.CargoTypeMasterList.splice(index, item1.Id);
  //         console.log(this.CargoTypeMasterList.length);
  //         console.log(this.countmasterlistvalue);

  //     //    this.countmasterlistvalue=this.countmasterlistvalue
  //       }


  AddCargoRow() {
    console.log("fixed  master length", this.ConstantMasterlistvalue);
    console.log("remain count", this.CargoTypeMasterList.length);
    console.log("fixed  new total master length", this.countmasterlistvalue);
    //    console.log( this.register.value.dropdownList);


    if (this.register.value.dropdownList.length != 0) {
      this.countmasterlistvalue = 0;
      this.register.value.dropdownList.forEach((items, index11) => {

        console.log(items.selectedItems);
        if (items.selectedItems != null) {
          this.countmasterlistvalue = this.countmasterlistvalue + items.selectedItems.length;
        }
      });
    }
    else {
      this.countmasterlistvalue = 0;
      this.register.controls.dropdownList.value.forEach((items, index11) => {

        if (items.selectedItems != null) {
          console.log(items.selectedItems);
          this.countmasterlistvalue = this.countmasterlistvalue + items.selectedItems.length;
          debugger
          items.selectedItems.forEach((items11, index11) => {
            var checkIndexsel = this.register.controls.dropdownList.value.findIndex(x => x.Id == items11.type);
            console.log(checkIndexsel);
          });
        }
      });

      if (this.ConstantMasterlistvalue > this.countmasterlistvalue) {

        //  this.dropdownList = this.frmBuilder.group({
        //     CargoValue: [""],
        //     selectedItems:[]
        //   });
        //   (<FormArray>this.register.get('dropdownList')).push(this.dropdownList);

        // (<FormArray>this.register.get('dropdownListPD')).push(this.dropdownListPD);
        if (this.num == 0) {
          this.pushRowCargoType();
          this.num = 1;
        }
        else {
          let len = this.register.controls.dropdownList.value.length;
          if (len != 0) {
            if (this.register.controls.dropdownList.value[len - 1].selectedItems != null) {
              this.pushRowCargoType();
            }
          }
        }
      }
    }
  }


  pushRowCargoType() {
    const control = new FormGroup({
      'CargoValue': new FormControl(null),
      'selectedItems': new FormControl(null)
    });
    (<FormArray>this.register.get('dropdownList')).push(control);
  }



  // this.dropdownList = this.frmBuilder.group({
  //   CargoValue: ["", [Validators.required, Validators.pattern('^[0-9]*(?:\.[0-9]{0,4})?$')]],
  //   EndValue: ["", [Validators.required, Validators.pattern('^[0-9]*(?:\.[0-9]{0,4})?$')]],
  //   MonthlyValue: ["", [Validators.required, Validators.pattern('^[0-9]*(?:\.[0-9]{0,4})?$')]],
  //   RateAnnualValue: ["", [Validators.required, Validators.pattern('^[0-9]*(?:\.[0-9]{0,4})?$')]],
  // });
  // (<FormArray>this.register.get('dropdownListPD')).push(this.dropdownListPD);



  RemoveCargoRow(index) {
    console.log(this.register.value.dropdownList);
    let dt = this.register.controls.dropdownList.value; // this.register.value.dropdownList;
    this.register.value.dropdownList = this.register.controls.dropdownList.value;


    console.log(this.CargoTypeMasterList);
    dt.forEach((item1, index1) => {
      if (index == index1) {
        var a = item1.selectedItems.length;
        item1.selectedItems.forEach((items, index11) => {
          this.CargoTypeMasterList.push({
            Id: items.Id,
            Type: items.Type
          });
          this.countmasterlistvalue = this.countmasterlistvalue - a;
        });

        //   let dt =  this.register.controls.dropdownList.value.removeAt(index);
        // (<FormArray>this.register.controls.dropdownList.value).removeAt(index);
        (<FormArray>this.register.get('dropdownList')).removeAt(index);
      }
    });
  }

  RemoveRow(index) {
    debugger
    let dt = this.register.value.dropdownListPD;
    dt.forEach((item1, index1) => {

      if (index == index1) {
        (<FormArray>this.register.get('dropdownListPD')).removeAt(index);
      }
    });
  }


  //----  add new matrix row for pd  ----------//

  AddPDMatrixRow() {
    console.log(this.register.value.dropdownListPD);

    if (this.register.value.dropdownListPD.length != 0) {
      let a = Number(this.register.value.dropdownListPD[this.register.value.dropdownListPD.length - 1].EndValue) + 1;

      console.log(a);

      if (Number(this.register.value.dropdownListPD[this.register.value.dropdownListPD.length - 1].EndValue) > Number(this.register.value.dropdownListPD[this.register.value.dropdownListPD.length - 1].StartValue)) {
        this.pushRow();
        const StartValue = this.dropdownListPD.get('StartValue');
        StartValue.setValue(a);
        return true;
      }
      else {
        alert("The value in the second column will be greater than first")
      }



    }
    else {
      if (this.dropdownListPD == null) {
        this.pushRow();
        const StartValue = this.dropdownListPD.get('StartValue');
        StartValue.setValue(0);
      }
      else {

        var a = Number(this.dropdownListPD.value.EndValue) + 1;

        if (this.dropdownListPD.value.RateAnnualValue != null) {
          if (Number(this.dropdownListPD.value.EndValue) > Number(this.dropdownListPD.value.StartValue)) {
            this.pushRow();
            const StartValue = this.dropdownListPD.get('StartValue');
            StartValue.setValue(a);
            return true;
          }
          else {
            alert("The value in the second column will be greater than first");
          }
        }

        else {
          alert("Please fill Annual Rate Value");
        }





      }
    }
  }

  pushRow() {
    this.dropdownListPD = this.frmBuilder.group({
      StartValue: ["", [Validators.required, Validators.pattern('^[0-9]*(?:\.[0-9]{0,4})?$')]],
      EndValue: ["", [Validators.required, Validators.pattern('^[0-9]*(?:\.[0-9]{0,4})?$')]],
      MonthlyValue: ["", [Validators.required, Validators.pattern('^[0-9]*(?:\.[0-9]{0,4})?$')]],
      RateAnnualValue: ["", [Validators.required, Validators.pattern('^[0-9]*(?:\.[0-9]{0,4})?$')]],
    });
    (<FormArray>this.register.get('dropdownListPD')).push(this.dropdownListPD);
  }


  //----- check end date ----




  //---- function to set auto calculated monthly value -----//
  MonthlyRateCalcnew(event, i): boolean {
    console.log(i);
    debugger
    var ret = event.target.value.replace('$', '');

    console.log(this.register.value.dropdownListPD);

    const MonthlyRateValue = this.dropdownListPD.get('MonthlyValue');
    MonthlyRateValue.setValue((Number(parseFloat(ret) / 12)).toFixed(4));
    return true;



  }

  // this.CargoTypeMasterList.forEach((item, index) => {
  //   console.log(item); // 1, 2, 3
  //   console.log(index); // 0, 1, 2
  // });
  //var Check = this.CargoTypeMasterList.findIndex(x => x.Id == item.Id);

  //console.log(this.CargoValue);

  //console.log("CargoTypeList",this.CargoTypeMasterList);

  //   this.register.value.dropdownList.push({
  //     CargoValue: 0,
  //     CargoTypeMasterList :   this.CargoTypeMasterList
  // });

  // const cargoItem = new FormGroup({
  //   'CargoValue':  new FormControl(null),
  //   'selectedItems': new FormControl(null),
  // });



  //formControl
  //formArray

  //(<FormArray>this.register.get('dropdownList')).push(cargoItem);
  // this.dropdownList.push(cargoItem);
  //  }

  // toogleShowFilter() {
  //   this.ShowFilter = !this.ShowFilter;
  //   this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  //   }

  //   onItemSelect(item:any){
  //     console.log(item);
  //     console.log(this.selectedItems);
  // }
  // OnItemDeSelect(item:any){
  //     console.log(item);
  //     console.log(this.selectedItems);
  // }
  // onSelectAll(items: any){
  //     console.log(items);
  // }
  // onDeSelectAll(items: any){
  //     console.log(items);
  // }

  //------------------------------------//







  onPoliciesSave() {
    var _PolicyModal = this.register.value;
    console.log(_PolicyModal);

    if (this.register.value.IsOA == true) {
      this.register.value.dropdownList = this.register.controls.dropdownList.value;
    }
    _PolicyModal.EffectiveDate = this.formatDate(_PolicyModal.EffectiveDate);
    _PolicyModal.ExpirationDate = this.formatDate(_PolicyModal.ExpirationDate);

    if (this.register.value.IsOA == true) {
      if (this.ConstantMasterlistvalue <= this.countmasterlistvalue) {



        var chk_dt1 = 0;
        if (this.register.value.dropdownList.length != 0) {
          this.register.value.dropdownList.forEach((itm, indx) => {
            if (!itm.CargoValue) {
              chk_dt1 = 1;
                }
          });
        }


        if (chk_dt1 == 0) {
        this.loading = true;
        //----- to save  OA coverage service -------//
        this.savePolicy(_PolicyModal);
        }else{
          alert("Please fill Monthly Rate Value");
        }


      }
      else {

        alert("Kindly add Cargo Type in OA Matrix");


        // if (this.countmasterlistvalue != 0) {
        //   alert("please select all");
        // }
        // else{
        //   if(this.register.value.dropdownList.length==0)
        //   {
        //     alert("please select at least one OA Matrix"); 
        //   }
        // }


      }
    }

    else if (this.register.value.IsPD == true) {

      console.log(this.register.value.dropdownListPD);
      var chk_dt = 0;
      if (this.register.value.dropdownListPD.length != 0) {
        this.register.value.dropdownListPD.forEach((itm, indx) => {
          if (!itm.RateAnnualValue) {
            chk_dt = 1;
              }
        });
      }

      if (this.register.value.dropdownListPD.length != 0 && chk_dt == 0) {
        this.loading = true;
        //----- to save PD coverage service -------//
        this.savePolicy(_PolicyModal);
      }
      else {

        if (chk_dt != 0) {
          alert("Please fill Annual Rate Value");
        } else { alert("please select at least one PD Matrix"); }


      }

      //dropdownListPD

    }
    else {

      this.isSubmitted = true;
      if (!this.register.valid)
        return;
      this.loading = true;
      //----- to save other coverage  service -------//
      this.savePolicy(_PolicyModal);

    }
    //console.log(this.register.get('Email').value);
  }


  savePolicy(_PolicyModalNew) {
    this.policiesService.savePolicies(_PolicyModalNew).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.register.reset();
        this.getPolicies();
        this.viewOACheckbox = false;
        this.AddOA_MatrixView = false;
        var msg = "Policy saved Successfully";


        if (_PolicyModalNew.PolicyRenew) {
          var msg = "Policy Renew Successfully";
        }
        this.alerts = [
          {
            type: 'success',
            msg: msg
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
          this.route.navigate(['/login']);
        }


        if (data.Error_value.ErrorCode == 102) {
          this.loading = false;
          this.modalRef.hide()
          this.register.reset();

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
        //this.alertService.error('You have entered the invalid details.');

      }
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })
  }



  get Policy() {
    return this.register.get('Policy');
  }
  get ClientId() {
    return this.register.get('ClientId');
  }
  get CoverageType() {
    return this.register.get('CoverageType');
  }
  get PolicyId() {
    return this.register.get('PolicyId');
  }
  get PolicyType() {
    return this.register.get('PolicyType');
  }
  get EffectiveDate() {
    return this.register.get('EffectiveDate');
  }
  get ExpirationDate() {
    return this.register.get('ExpirationDate');
  }
  get InsurerId() {
    return this.register.get('InsurerId');
  }





  get AnnualRate() {
    return this.register.get('AnnualRate');
  }
  get MonthlyRate() {
    return this.register.get('MonthlyRate');
  }
  get BillingCode() {
    return this.register.get('BillingCode');
  }

  get Installments() {
    return this.register.get('Installments');
  }
  get Status() {
    return this.register.get('Status');
  }

  get ReportDay() {
    return this.register.get('ReportDay');
  }
  get EstimatedPremium() {
    return this.register.get('EstimatedPremium');
  }
  get TaxRate() {
    return this.register.get('TaxRate');
  }
  get StateId() {
    return this.register.get('StateId');
  }
  get Description() {
    return this.register.get('Description');
  }
  get DeductibleType() {
    return this.register.get('DeductibleType');
  }
  get DeductibleAmount() {
    return this.register.get('DeductibleAmount');
  }
  get PolicyLimit() {
    return this.register.get('PolicyLimit');
  }
  get UnitLimit() {
    return this.register.get('UnitLimit');
  }
  get BillingType() {
    return this.register.get('BillingType');
  }
  get PolicyRenew() {
    return this.register.get('PolicyRenew');
  }





  onEffectiveDateChange(value: Date): void {

    if (value) {
      //alert(value);
      var numOfYears = 1;
      var expireDate = new Date(value);

      this.ExpirationMinDate = new Date(value);
      console.log(this.ExpirationMinDate);
      expireDate.setFullYear(expireDate.getFullYear() + numOfYears);
      expireDate.setDate(expireDate.getDate());
      const ExpirationDate = this.register.get('ExpirationDate');
      ExpirationDate.setValue(expireDate);
      var Todaydate = new Date();
      if (Todaydate > expireDate) {
        const Status = this.register.get('Status');
        Status.setValue(2);
      } else if (Todaydate < new Date(value)) {
        const Status = this.register.get('Status');
        Status.setValue(3);
      } else if (Todaydate < expireDate && Todaydate > new Date(value)) {
        const Status = this.register.get('Status');
        Status.setValue(1);
      }


      //this.ExpirationDate1=expireDate;
    }


  }

  onExpirationDateChange(value: Date): void {

    if (value) {

      var expireDate = new Date(value);

      var Todaydate = new Date();

      if (Todaydate > expireDate) {
        const Status = this.register.get('Status');
        Status.setValue(2);
      }


    }


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

  getPolicyMasterDetails(id) {
    this.spinner.show()
    var _PoliciesOptions = {
      "PageIndex": 1, "PageSize": 500, "SortBy": "0", "SortOrder": 1, "Filter": {
        "Deleted": false
      }
    }

    this.policiesService.getPolicyMasterDetails(id, _PoliciesOptions).subscribe((data: any) => {
      console.log(data.Result_value);
      //alert(data.Result);
      if (data.Result) {

        this.CoverageTypeList = data.Result_value.CoverageTypeList;
        this.BillingCodeList = data.Result_value.BillingCodeList;
        this.PolicyTypeList = data.Result_value.PolicyTypeList;
        this.BillingTypeList = data.Result_value.BillingTypeList;
        this.DeductibleTypeList = data.Result_value.DeductibleTypeList;
        this.PolicyStatusList = data.Result_value.PolicyStatusList;
        this.StateList = data.Result_value.StateList;
        this.ContractList = data.Result_value.ContractList.Result_value.SearchResult;
        this.InsurerList = this.sortProperties(data.Result_value.InsurerList.Result_value.SearchResult);
        //this.InsurerListKeys = Object.keys(this.InsurerList).filter(Number)
        this.ClientList = this.sortProperties(data.Result_value.ClientList.Result_value.SearchResult);

        //console.log(this.ClientList);
        //this.ClientListKeys=Object.keys(this.ClientList).filter(Number);

        this.StateList.forEach(tax => {
          this.StateTax[tax.StateId] = tax.Tax;

        });

        this.spinner.hide()



      } else {
        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          this.route.navigate(['/login']);
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

  checkCovrageType(Coverage) {

    this.register.controls['dropdownList'] = this.frmBuilder.array([]);
    if (Coverage._parent.value.CoverageType == 3) {
      console.log("OA");
      this.viewOACheckbox = true;
      this.viewPDCheckbox = false;
      this.AddOA_MatrixView = false;
      this.AddPD_MatrixView = false;
    }
    else if (Coverage._parent.value.CoverageType == 1) {
      console.log("PD");
      this.viewPDCheckbox = true;
      this.viewOACheckbox = false;
      this.AddOA_MatrixView = false;
      this.AddPD_MatrixView = false;
    }
    else {
      this.viewOACheckbox = false;
      this.viewPDCheckbox = false;
      this.AddOA_MatrixView = false;
      this.AddPD_MatrixView = false;
    }

  }

  initializeDropDownSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Type',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true //this.ShowFilter
    };
  }


  ngOnInit() {

    this.initializeDropDownSettings();
    this.getPolicies();
    this.register = this.frmBuilder.group({

      Policy: ["", [Validators.required]],
      ClientId: ["", [Validators.required]],
      CoverageType: [""],
      PolicyType: ["", [Validators.required]],
      EffectiveDate: ["", [Validators.required]],
      ExpirationDate: ["", [Validators.required]],
      InsurerId: ["", [Validators.required]],
      ContractId: [""],
      AnnualRate: ["", [Validators.required, Validators.pattern('^[0-9]*(?:\.[0-9]{0,4})?$')]],
      MonthlyRate: ["", [Validators.required, Validators.pattern('^[0-9]*(?:\.[0-9]{0,4})?$')]],
      BillingCode: [""],
      BillingType: [""],
      UnitLimit: ["", [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      PolicyLimit: ["", [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      DeductibleAmount: ["", [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      DeductibleType: ["", [Validators.required]],
      Description: [""],
      StateId: [""],
      TaxRate: ["", [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      EstimatedPremium: ["", [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      ReportDay: ["", [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      Status: [""],
      Installments: [""],
      PolicyId: [""],
      OtherValue: [""],
      DepositPercentage: [""],
      PolicyRenew: [""],
      IsOA: [""],
      IsPD: [""],
      dropdownList: this.frmBuilder.array([]),
      dropdownListPD: this.frmBuilder.array([]),
    });
  }

  checkDeductibleType(event): boolean {

    const DeductibleType = this.register.get('DeductibleType');
    if (parseFloat(event.target.value) > 0) {
      DeductibleType.setValidators([Validators.required]);
      this.requirdeDeductibleType = true;
    } else {
      DeductibleType.clearValidators();
      this.requirdeDeductibleType = false;
    }
    DeductibleType.updateValueAndValidity();
    return true;

  }

  getTaxRate(event): boolean {
    //let x = event.target.value.split("-");
    //console.log(this.StateTax);
    const TaxRate = this.register.get('TaxRate');
    TaxRate.setValue(this.StateTax[event.target.value]);
    return true;

  }

  MonthlyRateCalc(event): boolean {
    debugger
    console.log(event.target.value)
    const MonthlyRateValue = this.register.get('MonthlyRate');
    MonthlyRateValue.setValue((Number(parseFloat(event.target.value) / 12)).toFixed(4));

    return true;

  }

  AnnualRateCalc(event): boolean {

    console.log(event.target.value)
    const AnnualRateValue = this.register.get('AnnualRate');
    AnnualRateValue.setValue((parseFloat(event.target.value) * 12).toFixed(4));
    return true;

  }




  renewPolicy() {

    this.title = "Renew";
    const Policy = this.register.get('Policy');
    this.OldPolicyName = Policy.value

    Policy.setValue('');

    const EffectiveDate = this.register.get('EffectiveDate');
    this.OldEffectiveDate = EffectiveDate.value


    var newEffectiveDate = new Date(this.OldEffectiveDate);
    newEffectiveDate.setFullYear(newEffectiveDate.getFullYear() + 1);
    newEffectiveDate.setDate(newEffectiveDate.getDate());


    EffectiveDate.setValue(newEffectiveDate);



    const ExpirationDate = this.register.get('ExpirationDate');
    this.OldExpirationDate = ExpirationDate.value;
    //ExpirationDate.setValue('');


    const PolicyRenew = this.register.get('PolicyRenew');
    PolicyRenew.setValue(true);


    this.formtype = 1;


  }
  onDeleteRestore(c_data, status) {

    var msg = "Are you sure you want cancel this policy";
    if (status == 1) {
      msg = "Do you want to restore this policy";
    }
    var ans = confirm(msg);

    if (ans) {

      var _PolicyModal = {
        "Policy": c_data.Policy,
        "ClientId": c_data.ClientId,
        "CoverageType": c_data.CoverageType,
        'PolicyType': c_data.PolicyType,
        "EffectiveDate": new Date(c_data.EffectiveDate),
        "ExpirationDate": new Date(c_data.ExpirationDate),
        "InsurerId": c_data.InsurerId,
        'ContractId': c_data.ContractId,
        "AnnualRate": c_data.AnnualRate,
        'MonthlyRate': c_data.MonthlyRate,
        'BillingCode': c_data.BillingCode,
        'BillingType': c_data.BillingType,
        'UnitLimit': c_data.UnitLimit,
        'PolicyLimit': c_data.PolicyLimit,
        'DeductibleAmount': c_data.DeductibleAmount,
        'DeductibleType': c_data.DeductibleType,
        'Description': c_data.Description,
        'StateId': c_data.StateId,
        'TaxRate': c_data.TaxRate,
        'EstimatedPremium': c_data.EstimatedPremium,
        'ReportDay': c_data.ReportDay,
        'Installments': c_data.Installments,
        'Status': status,
        'PolicyId': c_data.PolicyId,
        'OtherValue': c_data.OtherValue,
        'DepositPercentage': c_data.DepositPercentage,
        'PolicyRenew': false
      }

      this.policiesService.savePolicies(_PolicyModal).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.loading = false;
          //this.modalRef.hide()
          //this.register.reset();  
          this.getPolicies();
          var msg = "Policy Canceled Successfully";



          this.alerts = [
            {
              type: 'success',
              msg: msg
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
            this.route.navigate(['/login']);
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
  }


  //   createCargoItem(cargoItem?:any): FormGroup{
  // return this.frmBuilder.group({
  //        Id:cargoItem.Id,
  //        Type:cargoItem.Type,
  //        IsDisabled:undefined
  //      });
  //   }


  //   createCargoItemA(cargoItem?:any): FormControl{
  //     return this.frmBuilder.control({
  //            Id:cargoItem.Id,
  //            Type:cargoItem.Type,
  //            IsDisabled:undefined
  //          });
  //       }




  createCargoRow(rowItem?: any): FormGroup {
    return this.frmBuilder.group({
      CargoValue: rowItem.CargoValue,
      selectedItems: [rowItem.selectedItems]
      //    selectedItems: this.frmBuilder.array([ this.createCargoItem(rowItem.selectedItems) ])
      //selectedItems: this.frmBuilder.array([ this.createCargoItem(rowItem.selectedItems) ])   
      //selectedItems :this.addCargoItem(rowItem.selectedItems)
      //  (<FormArray>this.register.get('dropdownList')).push(this.createCargoRow(item))
    });
  };

  // addCargoItem(cargoItems?: [])
  // {
  //  cargoItems.forEach((cargoItem) => {
  //    this.createCargoItemA(cargoItem)
  //  }); 
  // }



  createPDRow(rowItem?: any): FormGroup {
    return this.frmBuilder.group({
      StartValue: rowItem.StartValue,
      EndValue: rowItem.EndValue,
      MonthlyValue: (Number(parseFloat(rowItem.RateAnnualValue) / 12)).toFixed(4),//  rowItem.MonthlyValue,
      RateAnnualValue: rowItem.RateAnnualValue,
    });
  };

  openModal(template: TemplateRef<any>, c_data) {


    this.initializeDropDownSettings();
    this.getPolicyMasterDetails(2);
    this.getVehicleMasterDetails();

    this.viewOACheckbox = false;
    this.AddOA_MatrixView = false;
    this.viewPDCheckbox = false;
    this.AddPD_MatrixView = false;

    this.countmasterlistvalue = 0;
    this.title = "Add New";
    this.register.reset();
    //    this.register.value.dropdownList=[];
    //    console.log(this.register);
    this.coveragetypeId = 0;
    this.billingCodeId = 0;
    this.isSubmitted = false;
    this.ExpirationMinDate = new Date();
    // debugger
    if (c_data != 0) {
      this.title = "Edit";
      this.coveragetypeId = c_data.CoverageType;
      this.billingCodeId = c_data.BillingCode;
      this.register.patchValue({
        // var _PolicyModel = {
        "Policy": c_data.Policy,
        "ClientId": c_data.ClientId,
        "CoverageType": c_data.CoverageType,
        'PolicyType': c_data.PolicyType,
        "EffectiveDate": new Date(c_data.EffectiveDate),
        "ExpirationDate": new Date(c_data.ExpirationDate),
        "InsurerId": c_data.InsurerId,
        'ContractId': c_data.ContractId,
        "AnnualRate": c_data.AnnualRate,
        'MonthlyRate': c_data.MonthlyRate,
        'BillingCode': c_data.BillingCode,
        'BillingType': c_data.BillingType,
        'UnitLimit': c_data.UnitLimit,
        'PolicyLimit': c_data.PolicyLimit,
        'DeductibleAmount': c_data.DeductibleAmount,
        'DeductibleType': c_data.DeductibleType,
        'Description': c_data.Description,
        'StateId': c_data.StateId,
        'TaxRate': c_data.TaxRate,
        'EstimatedPremium': c_data.EstimatedPremium,
        'ReportDay': c_data.ReportDay,
        'Installments': c_data.Installments,
        'Status': c_data.Status,
        'PolicyId': c_data.PolicyId,
        'OtherValue': c_data.OtherValue,
        'DepositPercentage': c_data.DepositPercentage,
        'PolicyRenew': false,
        'IsOA': c_data.IsOA,
        'IsPD': c_data.IsPD
      });
      //  debugger
      console.log(this.register.value.dropdownListPD.length);
      if (c_data.CoverageType == 3 && c_data.IsOA == true) {
        this.viewOACheckbox = true;
        this.AddOA_MatrixView = true;
        this.viewPDCheckbox = false;
        this.AddPD_MatrixView = false;

        //----------- remove unneccessary row ---------//
        var lenPd = this.register.value.dropdownList.length;
        if (lenPd > 0) {
          for (var i = lenPd - 1; i >= 0; i--) {
            console.log("count", i);
            (<FormArray>this.register.get('dropdownList')).removeAt(i);
          }
        }

        // this.register.value.dropdownList.forEach((items, index11) => {
        //   (<FormArray>this.register.get('dropdownList')).removeAt(index11);
        // });
        // (<FormArray>this.register.get('dropdownList')).removeAt(0);
      }

      if (c_data.CoverageType == 1 && c_data.IsPD == true) {
        this.viewPDCheckbox = true;
        this.AddPD_MatrixView = true;
        this.viewOACheckbox = false;
        this.AddOA_MatrixView = false;

        var lenPd = this.register.value.dropdownListPD.length;
        if (lenPd > 0) {
          for (var i = lenPd - 1; i >= 0; i--) {
            console.log("count", i);
            (<FormArray>this.register.get('dropdownListPD')).removeAt(i);
          }
        }
        // this.register.value.dropdownListPD.forEach((items, index11) => {
        //   (<FormArray>this.register.get('dropdownListPD')).removeAt(index11);
        // });
        // (<FormArray>this.register.get('dropdownListPD')).removeAt(0);     
      }

      if (this.AddOA_MatrixView == true && this.viewOACheckbox == true) {
        c_data.dropdownList.forEach((item) => {
          (<FormArray>this.register.get('dropdownList')).push(this.createCargoRow(item));
        });
      }

      else if (this.AddPD_MatrixView == true && this.viewPDCheckbox == true) {
        console.log("PD");

        c_data.dropdownListPD.forEach((item) => {
          (<FormArray>this.register.get('dropdownListPD')).push(this.createPDRow(item));

        });
      }
      else {
        this.register.value.dropdownList = null;
        this.register.value.dropdownListPD = null;
      }



      // this.register.setValue(_PolicyModel);
    } else {

      var lenPd = this.register.value.dropdownListPD.length;
      if (lenPd > 0) {
        for (var i = lenPd - 1; i >= 0; i--) {
          console.log("count", i);
          (<FormArray>this.register.get('dropdownListPD')).removeAt(i);
        }
      }
      // this.getVehicleMasterDetails();
      if (this.clientid) {
        const ClientId = this.register.get('ClientId');
        ClientId.setValue(this.clientid);
      }

      const PolicyRenew = this.register.get('PolicyRenew');
      PolicyRenew.setValue(false);
    }

    this.modalRef = this.modalService.show(template, this.config);
  }




  getVehicleMasterDetails() {

    this.vehiclesService.getVehicleMasterDetails().subscribe((data: any) => {

      if (data.Result) {
        this.CargoTypeMasterList = data.Result_value.CargoTypesList;
        this.ConstantMasterlistvalue = this.CargoTypeMasterList.length;
        console.log(this.CargoTypeMasterList);
      } else {
        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          this.route.navigate(['/login']);
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



  /*open(content,id) {
        this.title = "Add New"; 
        if(id){
            this.title = "Edit";
            this.getPolicy(id);
        }

        this.modalService.open(content).result.then((result) => {
            //this.modalService.componentInstance.name = 'World';
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }



  private getDismissReason(reason: any): string {      
        this.isSubmitted = false;
        this.register.reset();   

        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }*/


}
