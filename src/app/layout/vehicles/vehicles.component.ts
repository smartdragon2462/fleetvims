import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, ChangeDetectorRef, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { VehiclesService } from '../../shared/services/vehicles.service';
import { CommonService } from '../../shared/services/common.service';
import { PoliciesService } from '../../shared/services/policies.service';
import { ClientsService } from '../../shared/services/clients.service';
import { RolesService } from '../../shared/services/roles.service';
import { FormGroup, FormBuilder, Validators, EmailValidator, FormControl } from '@angular/forms';
import { SerialnoValidator } from '../../shared/validators/serialno.validator';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { saveAs as importedSaveAs } from "file-saver";
import { ExcelService } from '../../shared/services/excel.service';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
// import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import *  as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

// const numberMask = createNumberMask({
//   prefix: '',
//   suffix: ' $' // This will put the dollar sign at the end, with a space.
// })


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
   styleUrls: ['./vehicles.component.scss'],
  animations: [routerTransition()]
})






export class VehiclesComponent implements OnInit {

  // Our array of vehicles    
  CargoTypeMasterList:any[];

  @ViewChild('form') form: any;
  vehicles: any[];
  Citylist: any[];
  Statelist: any[];
  ClientPolicies: any[];
  exportMessage: any[];
  exportErrorRecord: any[];
  exportErrorRecordOld: any[];
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
  ClientName: string;
  PolicyName: string;
  dataTable: any;
  UserInfo: any;
  closeResult: string;
  search_value: string;
  SearchText: string = '';
  isSubmitted: boolean = false;
  isVINvalidation: boolean = true;
  checkAll: boolean = false;
  checkAllMain: boolean = false;
  fileUrl;
  isDeleted = false;
  loading: boolean = false;
  bulkupladResult: boolean = false;

  PolicyAL: boolean = true;
  PolicyNT: boolean = true;
  PolicyOA: boolean = true;
  PolicyPA: boolean = true;
  PolicyPD: boolean = true;
  coveragePolicyAllUnit = [];

  register: FormGroup;
  batcheditform: FormGroup;
  updatecoverage: FormGroup;
  batchemailform: FormGroup;
  bulupload: FormGroup;
  title: string = "Add New";
  modalRef: BsModalRef;
  totalItems: number = 0;

  ExportErrorTotalRecord: number = 0;
  ExportSuccessTotalRecord: number = 0;
  ExportSuccessRecords: any[];

  itemsPerPage: number = 100;
  PageIndex: number = 1;
  SortBy: number = 1;
  VehicleUnitType: number = -1;
  Type: number = 0;
  SortOrder: number = 1;
  policyUnitLimit: number = 0;
  clientid: string = '';
  UpdateCoveragePopupTitle: string = '';
  policyid: number = 0;
  DriverTypeValue: number = 0;
  UnitTypeValue: number = 0;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };
  optionsMap = [];
  years = [];
  optionsChecked = [];
  PolicyoptionsMap = []
  IsPAPolicy: number = 0;
  IsNTPolicy: number = 0;
  IsOAPolicy: number = 0;
  IsPDPolicy: number = 0;
  IsALPolicy: number = 0;
  CoverageType: number = 0;
  policyType: number = 0;
  coveragePolicy: Array<any> = [];


  ClientPDTrucksValue: number = 0;
  ClientPDTrucksUnit: number = 0;
  ClientPDTrailersValue: number = 0;
  ClientPDTrailersUnit: number = 0;
  ClientPDOthersValue: number = 0;
  ClientPDOthersUnit: number = 0;
  ClientPDTotalUnit: number = 0;
  ClientPDTotalValue: number = 0;
  ClientNonTrucking: number = 0;
  ClientPDUnit: number = 0;
  ClientALUnit: number = 0;
  ClientNTUnit: number = 0;
  ClientOAUnit: number = 0;
  ClientPAUnit: number = 0;
  clientid1: number = 0;
  ValuePolicyCheck: number = 0;
  fileToUpload: File = null;
  fileevent = [];
  minAddedDate: Date;
  check: number = 0;
  ShoWFuture: boolean = false;
  ShowChildView : boolean=false;


  Cargotypeview: boolean = false;

  

  BatchEdit = { 'CoverageType': false, 'Year': false, 'UnitType': false, 'Make': false, 'Value': false, 'DriverType': false, 'Lienholder': false, 'Lienholder2': false, 'Policies': false, 'EffectiveDate': false, 'ExpirationDate': false, 'Owner': false, 'IsRemove': false };

  CoverageTypeEnum = { '0': { 'image': 'No-Verified-Coverage.png' }, '1': { 'image': 'No-Verified-Coverage.png' }, '2': { 'image': 'Declined-Coverage.png' }, '3': { 'image': 'yellow.png' }, '4': { 'image': 'green.png' }, '5': { 'image': 'check-mark-PD-nonsponsored.png' }, '6': { 'image': 'check-mark-PD-nonsponsored.png' } };

  name = 'Angular 6';

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  downloadImage() {
    debugger
    this.spinner.show();
    html2canvas(this.screen.nativeElement).then(canvas => {

      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'Screenshot.png';
      this.downloadLink.nativeElement.click();
      /*        pdf download 
        var img = canvas.toDataURL("image/png");
        var doc = new jsPDF();
        doc.addImage(img,'JPEG',2,2,204,290);
        doc.save('testCanvas.pdf');
     */
    });
    this.spinner.hide();
  }


  alerts: any = []


  constructor(private frmBuilder: FormBuilder, private router: ActivatedRoute, private vehiclesService: VehiclesService, private http: HttpClient, private chRef: ChangeDetectorRef, private modalService: BsModalService, private sanitizer: DomSanitizer, private commonService: CommonService, private spinner: NgxSpinnerService, private policiesService: PoliciesService, private ClientsService: ClientsService, private PoliciesService: PoliciesService, public RolesService: RolesService, private route: Router, private excelService: ExcelService) {

    var year = new Date().getFullYear();
    for (var i = year + 1; i >= 1970; i--) {
      this.years.push(i);
    }

    //console.log(JSON.parse(localStorage.getItem('permissionList')));

    if (this.router.snapshot.params["id"]) {
      this.clientid = this.router.snapshot.params["id"];
      this.clientid1 = 1;
      this.getClient(this.router.snapshot.params["id"]);
      this.check = 1;
      this.getVehicleCounter(this.router.snapshot.params["id"], this.check);

    }
    if (this.router.snapshot.params["pid"]) {
      this.policyid = this.router.snapshot.params["pid"];
      this.clientid = this.router.snapshot.params["cid"];
      this.getClient(this.router.snapshot.params["cid"]);
      //this.ClientName=this.router.snapshot.params["clientname"]
      //this.getPolicy(this.router.snapshot.params["pid"]) 
      this.PolicyName = this.router.snapshot.params["pname"]

    }


    console.log(this.clientid);

    this.getVehicleMasterDetails();
    this.UserInfo = JSON.parse(localStorage.getItem('UserDetail'))

    console.log(this.UserInfo.Module)


    if (this.UserInfo.Module == 3) {
      console.log(this.UserInfo);

      if (this.router.snapshot.params["id"]) {
        console.log("ok");
      }
      else {
        this.getVehicleCounter(this.UserInfo.ModuleId, 0);
      }


      // this.clientid=this.UserInfo.ModuleId;
      this.ClientName = this.UserInfo.ModuleName
      //this.getClient(this.clientid);
      this.clientid1 = 1;
      //this.ClientName=data.Result_value.ClientName;  
      this.minAddedDate = new Date();
      this.itemsPerPage = 25;

    } else if (this.UserInfo.Module == 2) {
      this.itemsPerPage = 100
    }

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



  onSelectFile(files: FileList, event) { // called each time file input changes
    this.fileToUpload = files.item(0);
    //console.log(this.fileToUpload)

    // ----- comments prashant (check formates)-----------------//

    // if (this.fileToUpload.type.match('vnd.openxmlformats')) {
    //     //event.srcElement.value = null;
    //     //this.vehicleImport()
    // }
    // else
    // {
    //     this.fileToUpload=null;
    //     alert("Please upload  xlsx format file.")
    //     event.srcElement.value = null;
    // } 
    //this.fileevent.srcElement.value = null;
    //this.form.nativeElement.reset()

  }

  editErrrorExportVehicle(record) {
    record.editMode = true;
  }
  cancelErrrorExportVehicle(record, index) {
    console.log(record);
    console.log(this.exportErrorRecord);
    console.log(this.exportErrorRecordOld);
    //var data=this.exportErrorRecord;
    //this.exportErrorRecord=[];
    //this.exportErrorRecord=this.exportErrorRecordOld;
    record.Unit_ = this.exportErrorRecordOld[index]['ErrorUnit'];
    record.Driver = this.exportErrorRecordOld[index]['ErrorDriver'];
    record.Make = this.exportErrorRecordOld[index]['ErrorMake'];
    record.Owner = this.exportErrorRecordOld[index]['ErrorOwner'];
    record.Unit_Type = this.exportErrorRecordOld[index]['ErrorUnit_Type'];
    record.VIN = this.exportErrorRecordOld[index]['ErrorVIN'];
    record.Value = this.exportErrorRecordOld[index]['ErrorValue'];
    record.Value_Type = this.exportErrorRecordOld[index]['ErrorYear'];

    record.editMode = false;
  }


  saveErrrorExportVehicle(record, index) {
    console.log(record)
    console.log(index);
    this.vehiclesService.vehicleErrorRecordSave(record, this.clientid).subscribe((data: any) => {
      //console.log(data)
      if (data.Result) {
        this.ExportSuccessTotalRecord = this.ExportSuccessTotalRecord + 1;
        this.ExportErrorTotalRecord = this.ExportErrorTotalRecord - 1;
        this.ExportSuccessRecords.push(record);
        alert("Record saved successfully.");
        record.editRowMode = true;
      } else {

        //delete this.exportErrorRecord[index];

        if (data.Error_value.ErrorCode == 112) {
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('Token');
          localStorage.removeItem('UserDetail');
          localStorage.removeItem('permissionList');
          localStorage.removeItem('UserId');
          this.route.navigate(['/login']);
        } else {
          alert(data.Error_value.ErrorText);
        }



      }

    },
      (err: HttpErrorResponse) => {

        //this.alertService.error('You have entered the invalid details.');
      })


    //record.editMode = false;
  }




  openModalImport(template: TemplateRef<any>) {
    this.bulkupladResult = false;
    this.config.class = 'modal-lg bulkimport';
    this.modalRef = this.modalService.show(template, this.config);
  }

  openFAQModal(template: TemplateRef<any>) {

    this.config.class = 'modal-lg';
    this.modalRef = this.modalService.show(template, this.config);

  }

  vehicleImport() {

    if (this.fileToUpload) {
      console.log(this.fileToUpload);
      this.bulkupladResult = false;
      this.spinner.show()
      //this.loading = true;
      //this.modalRef = this.modalService.show(template,this.config);
      this.vehiclesService.vehicleImport(this.fileToUpload, this.clientid).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.fileToUpload = null;
          this.getVehicles();
          this.spinner.hide()
          this.ExportErrorTotalRecord = 0;
          this.ExportSuccessTotalRecord = 0;
          this.ExportErrorTotalRecord = data.Result_value._ErrorCount;
          this.ExportSuccessTotalRecord = data.Result_value._SuccessCount;
          this.ExportSuccessRecords = data.Result_value._Success

          this.exportMessage = data.Result_value;
          this.exportErrorRecord = data.Result_value._Error;
          var erroordata = [];
          this.exportErrorRecord.forEach(vehicle => {
            var vehicledata = [];
            vehicledata['ErrorUnit'] = vehicle['Unit_'];
            vehicledata['ErrorVIN'] = vehicle['VIN'];
            vehicledata['ErrorYear'] = vehicle['Year'];
            vehicledata['ErrorMake'] = vehicle['Make'];
            vehicledata['ErrorValue'] = vehicle['Value'];
            vehicledata['ErrorDriver'] = vehicle['Driver'];
            vehicledata['ErrorOwner'] = vehicle['Owner'];
            vehicledata['ErrorUnit_Type'] = vehicle['Unit_Type'];
            erroordata.push(vehicledata);

          });

          this.exportErrorRecordOld = erroordata;

          this.bulkupladResult = true;
          this.bulupload.reset();
          //this.form.nativeElement.reset()
          //document.contact_form.reset();
          // this.myInputVariable.nativeElement.value = "";
          //this.myInputVariable.nativeElement.value = '';
          //var fileElement = angular.element('#fileInput');
          // angular.element(fileElement).val(null);
          //this.openBulkupladresponceModal(bulkupload)
          //document.getElementById("fileInput").val(null); 
          //this.ClientName=data.Result_value.ClientName;                 
        } else {

          this.bulkupladResult = false;
          this.spinner.hide()
          alert("Invalid file format. Please check file.")
          this.bulupload.reset();
          if (data.Error_value.ErrorCode == 112) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('Token');
            localStorage.removeItem('UserDetail');
            localStorage.removeItem('permissionList');
            localStorage.removeItem('UserId');
            this.route.navigate(['/login']);
          }

          //this.loading = false;
          //
          //this.alertService.error('You have entered the invalid details.');

        }
      },
        (err: HttpErrorResponse) => {
          console.log(err)
          this.spinner.hide()
          this.loading = false;
          //this.alertService.error('You have entered the invalid details.');
        })
    } else {
      alert("Please upload file");
    }

  }

  exportErrorVehicles(errorRecord): void {

    var data = [];
    errorRecord.forEach(vehicle => {

      var vehicledata = [];
      vehicledata['Unit #'] = vehicle['Unit_'];
      vehicledata['VIN'] = vehicle['VIN'];
      vehicledata['Year'] = vehicle['Year'];
      vehicledata['Make'] = vehicle['Make'];
      vehicledata['Value'] = vehicle['Value'];
      vehicledata['Driver'] = vehicle['Driver'];
      vehicledata['Owner'] = vehicle['Owner'];
      vehicledata['Unit_Type'] = vehicle['Unit_Type'];
      data.push(vehicledata);


    });
    this.excelService.exportAsExcelFile(data, 'error_export_vehicle');

  }

  exportVehicle(): void {

    var data = [];
    this.vehicles.forEach(vehicle => {

      var vehicledata = [];


      vehicledata['Unit'] = vehicle['Unit'];
      vehicledata['SerialNumber'] = vehicle['SerialNumber'];
      vehicledata['ModelYear'] = vehicle['ModelYear'];
      vehicledata['MakeCompanyName'] = vehicle['MakeCompanyName'];
      vehicledata['Value'] = vehicle['Value'];
      vehicledata['ClientName'] = vehicle['ClientName'];
      vehicledata['Lienholder1Name'] = vehicle['Lienholder1Name'];
      vehicledata['UnitTypeName'] = vehicle['UnitTypeName'];
      vehicledata['DriverTypeName'] = vehicle['DriverTypeName'];
      vehicledata['Driver'] = vehicle['Driver'];
      vehicledata['Owner'] = vehicle['Owner'];

      data.push(vehicledata);

      // vehicledata['Option']=vehicle['Option'];
      // vehicledata['PolicyTypeName']=vehicle['PolicyTypeName'];
      // vehicledata['ExpirationDate']=vehicle['ExpirationDate'];
      // vehicledata['Lienholder3Name']=vehicle['Lienholder3Name'];
      // vehicledata['Lienholder2Name']=vehicle['Lienholder2Name'];
      // vehicledata['Master']=vehicle['Master'];
      // vehicledata['DriverType']=vehicle['DriverType'];
      // vehicledata['Driver2']=vehicle['Driver2'];
      // vehicledata['CertificateNotes']=vehicle['CertificateNotes'];
      // vehicledata['EffectiveDate']=vehicle['EffectiveDate'];




      // delete vehicle['CreatedDate'];
      // delete vehicle['ModifiedDate'];
      // delete vehicle['CreatedBy'];
      // delete vehicle['ModifiedBy'];
      // delete vehicle['PDCoverageType'];
      // delete vehicle['NTCoverageType'];
      // delete vehicle['OACoverageType'];
      // delete vehicle['PACoverageType'];
      // delete vehicle['Lienholder3'];
      // delete vehicle['NTPolicyId'];
      // delete vehicle['PDPolicyId'];
      // delete vehicle['OAPolicyId'];
      // delete vehicle['PAPolicyId'];
      // delete vehicle['ClientId'];
      // delete vehicle['ClientId'];
      // delete vehicle['Addedbound'];
      // delete vehicle['Policies'];
      // delete vehicle['LienholderId1'];
      // delete vehicle['LienholderId2'];
      // delete vehicle['UnitType'];
      // delete vehicle['VehicleId'];
      // delete vehicle['Makes'];





      data.push(vehicledata);

    });
    this.excelService.exportAsExcelFile(data, 'vehicle');

  }


  // exportVehicle(){

  //   this.excelService.exportAsExcelFile(this.edata, 'sample');

  // }

  // openBulkupladresponceModal(template: TemplateRef<any>) {
  //    alert(template)
  //    this.modalRef = this.modalService.show(template,this.config);
  // }

  getClient(id) {

    this.ClientsService.getClientById(id).subscribe((data: any) => {
      console.log("K");
      console.log(data)
      if (data.Result) {
        this.ClientName = data.Result_value.ClientName;
        this.PolicyAL = !data.Result_value.PolicyAL;
        this.PolicyNT = !data.Result_value.PolicyNT;
        this.PolicyOA = !data.Result_value.PolicyOA;
        this.PolicyPA = !data.Result_value.PolicyPA;
        this.PolicyPD = !data.Result_value.PolicyPD;


      //  var CheckChild = this.ClientName.findIndex(x => x.parentClientId != 0 && x.parentClientId != null);
        if (data.Result_value.parentClientId !=0  && data.Result_value.parentClientId != null ) {
          this.ShowChildView = true;
        }


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
      SerialNumber.setAsyncValidators(SerialnoValidator.validSerialno(this.vehiclesService, 0));
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


  pageChanged(event: any): void {
    this.PageIndex = event.page;
    // console.log(this.PageIndex);
    this.getVehicles();
  }

  itemsPerPageChange(itemcount: any): void {
    this.itemsPerPage = itemcount;
    this.getVehicles();
  }

  onFilter(value) {

    this.SearchText = value;
    this.getVehicles();

  }

  unitTypeFilter(value: any) {
    this.VehicleUnitType = value
    this.getVehicles();

  }

  statusFilter(status: any) {
    console.log(status)
    this.isDeleted = false;
    if (status == "0") {
      this.isDeleted = true;
    }
    this.getVehicles();

  }

  vehicleType(type: any) {

    this.Type = type;
    this.getVehicles();

  }

  print() {

    let printContents, popupWin;
    printContents = "Testing";
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
          <head>
            <title>Print tab</title>
            <style>
            //........Customized style.......
            </style>
          </head>
          <body onload="window.print();window.close()">${printContents}</body>
        </html>`
    );
    popupWin.document.close();

  }

  showEditField(field) {

    this.BatchEdit[field] = !this.BatchEdit[field];

  }

  getVehicles() {
    //alert(this.clientid)
    this.spinner.show()
    var _VehiclesOptions = {
      "PageIndex":
        this.PageIndex, "PageSize": this.itemsPerPage, "SortBy": this.SortBy, "SortOrder": this.SortOrder, "Filter": {
          "SearchText": this.SearchText,
          "Deleted": this.isDeleted, "ClientId": this.clientid, "Type": this.Type, "PolicyId": this.policyid, "unitTypeId": this.VehicleUnitType
        }
    }

    this.vehiclesService.getVehicles(_VehiclesOptions).subscribe((data: any) => {
      console.log("dsadas");
      console.log(data);

      if (data.Result) {
        this.totalItems = data.Result_value.TotalRecords;
        this.vehicles = data.Result_value.SearchResult;
        this.spinner.hide()
        this.checkAllMain = false;
        this.optionsMap = [];


        var Check = this.vehicles.findIndex(x => x.FutureValue > 0);
        if (Check != -1) {
          this.ShoWFuture = true;
        }


        // if(this.checkAll){
        //     this.vehicles.forEach(vehicle => {
        //         this.optionsMap[vehicle.VehicleId] = true;

        //     });
        // }    

        /*this.chRef.detectChanges();
        const table: any = $('#vehicles_table');
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

    },
      (err: HttpErrorResponse) => {
        console.log("Some Error occured");
        //this.loading = false;
        // this.alertService.error('You have entered the invalid details.');
      })



  }

  Sorting(field) {
    debugger
    this.SortBy = field;
    if (this.SortOrder == 1) {
      this.SortOrder = 2
    } else {
      this.SortOrder = 1
    }
    this.getVehicles();
    //SortOrder: number = 2;

  }

  getLeinholders() {
    this.commonService.getLeinholders().subscribe((data: any) => {
      console.log(data)

      this.LeinholderList = data.Result_value.SearchResult;
      this.Leinholderkeys = Object.keys(this.LeinholderList).filter(Number)

    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

  }

  getInsurers() {
    this.commonService.getInsurers().subscribe((data: any) => {
      console.log(data)

      this.LeinholderList = this.sortProperties(data.Result_value.SearchResult);
      //this.Leinholderkeys = Object.keys(this.LeinholderList).filter(Number)

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

    this.vehiclesService.getVehicleMasterDetails().subscribe((data: any) => {

      if (data.Result) {
        //alert("dsad");
        console.log(data);
        this.UnitTypeList = data.Result_value.UnitTypeList;
        this.PowerUnitTypeList = data.Result_value.PowerUnitTypeList;
        this.NonPowerUnitTypeList = data.Result_value.NonPowerUnitTypeList;
        this.DriverTypeList = data.Result_value.DriverTypeList;
        this.PolicyTypeList = data.Result_value.PolicyTypeList;
        this.MakeList = data.Result_value.MakeList;
        this.CargoTypeMasterList = data.Result_value.CargoTypesList;
        this.ClientListSame = data.Result_value.ClientList.Result_value.SearchResult;
        this.ClientList = this.sortProperties(data.Result_value.ClientList.Result_value.SearchResult);
        //this.Clientkeys = Object.keys(this.ClientList).filter(Number)
        this.LeinholderList = data.Result_value.LienholderList.Result_value.SearchResult;
         //this.Leinholderkeys = Object.keys(this.LeinholderList).filter(Number)

        console.log(data.Result_value);

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

  getVehicleCertificate(vehicle) {
    //alert(id);
    this.spinner.show()

    this.vehiclesService.vehicleCertificate(vehicle.VehicleId).subscribe((data: any) => {
      var mediaType = 'application/pdf';
      var blob = new Blob([data], { type: mediaType });
      var filename = "Certificate_Unit#" + vehicle.Unit + "_" + vehicle.ClientName + ".pdf";
      this.spinner.hide()
      importedSaveAs(blob, filename);
    },
      (err: HttpErrorResponse) => {
        this.spinner.hide()
        //alert("dsadas");
        console.log(err)
        //this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })



  }


  formatDateToString(date) {
    // 01, 02, 03, ... 29, 30, 31
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    // 01, 02, 03, ... 10, 11, 12
    var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    // 1970, 1971, ... 2015, 2016, ...
    var yyyy = date.getFullYear();

    // create the format you want
    return (MM + "." + dd + "." + yyyy);
  }

  getPrintCovrageReport(id) {
    //alert(id);

    this.spinner.show();
    this.vehiclesService.printCovrageReport(id, this.clientid).subscribe((data: any) => {

      var filename = "";
      var date = new Date();
      var todaysDate = this.formatDateToString(date);
      if (id == 1) {
        filename = "PD_Report_" + todaysDate + "_" + this.ClientName.replace(" ", "-") + ".pdf";
      } else if (id == 2) {
        filename = "NT_Report_" + todaysDate + "_" + this.ClientName.replace(" ", "-") + ".pdf";
      } else if (id == 3) {
        filename = "OA_Report_" + todaysDate + "_" + this.ClientName.replace(" ", "-") + ".pdf";
      } else if (id == 4) {
        filename = "PA_Report_" + todaysDate + "_" + this.ClientName.replace(" ", "-") + ".pdf";
      } else if (id == 6) {
        filename = "AL_Report_" + todaysDate + "_" + this.ClientName.replace(" ", "-") + ".pdf";
      }
      var mediaType = 'application/pdf';
      var blob = new Blob([data], { type: mediaType });
      //var filename = 'Vehicle_Coverage_Report.pdf';
      this.spinner.hide()
      importedSaveAs(blob, filename);
    },
      (err: HttpErrorResponse) => {
        //alert("dsadas");
        this.spinner.hide();
        this.loading = false;
        this.alerts = [
          {
            type: 'danger',
            msg: "No Vehicle present for the selected coverage type."
          }
        ]
        this.alerts.map((alert: any) => ({
          type: 'danger',
          msg: alert.msg
        }));
        //console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })



  }


  getVehicleCounter(id, check) {

    this.vehiclesService.vehicleCounter(id, check).subscribe((data: any) => {
      console.log("gaurv");
      console.log(data);
      //if(data.Result){
      if (data.Result_value) {
        data.Result_value.VehicleCounters.forEach((policy) => {
          if (policy.coverage_type == "AL") {
            this.ClientALUnit = policy.totalunit;
          } else if (policy.coverage_type == "NT") {
            this.ClientNTUnit = policy.totalunit;
          } else if (policy.coverage_type == "OA") {
            this.ClientOAUnit = policy.totalunit;
          } else if (policy.coverage_type == "PA") {
            this.ClientPAUnit = policy.totalunit;
          } else if (policy.coverage_type == "PD" && policy.unit_type == "Truck") {
            this.ClientPDTrucksUnit = policy.totalunit;
            this.ClientPDTrucksValue = policy.totalValue;

            this.ClientPDTotalUnit = this.ClientPDTotalUnit + policy.totalunit;
            this.ClientPDTotalValue = this.ClientPDTotalValue + policy.totalValue;

          } else if (policy.coverage_type == "PD" && policy.unit_type == "Trailer") {
            this.ClientPDTrailersUnit = policy.totalunit;
            this.ClientPDTrailersValue = policy.totalValue;

            this.ClientPDTotalUnit = this.ClientPDTotalUnit + policy.totalunit;
            this.ClientPDTotalValue = this.ClientPDTotalValue + policy.totalValue;

          } else {
            this.ClientPDOthersUnit = policy.totalunit;
            this.ClientPDOthersValue = policy.totalValue;

            this.ClientPDTotalUnit = this.ClientPDTotalUnit + policy.totalunit;
            this.ClientPDTotalValue = this.ClientPDTotalValue + policy.totalValue;
          }


          //console.log(policy)    
        })
        this.ClientPDUnit = data.Result_value.PD_VehicleCounters[0].totalunit;
      }


      //                       ClientPDTrucksValue=: number = 0;
      // ClientPDTrucksUnit=: number = 0;
      // ClientPDTrailersValue=: number = 0;
      // ClientPDTrailersUnit=: number = 0;
      // ClientPDOthersValue=: number = 0;
      // ClientPDOthersUnit=: number = 0;
      // ClientPDTotalUnit=: number = 0;
      // ClientPDTotalValue=: number = 0;
      // ClientNonTrucking=: number = 0;
      // ClientNTUnit=: number = 0;
      // ClientOAUnit=: number = 0;
      // ClientPAUnit=: number = 0;



      // if(data.Result){ 
      //     this.getVehicles();
      //     this.PageIndex=1;
      //     this.alerts = [
      //       {
      //         type: 'success',
      //         msg: `Vehicle deleted successfully.`
      //       }
      //     ]
      //   this.alerts.map((alert: any) => ({
      //     type: 'sucess',
      //     msg: alert.msg
      //   }));  
      // }else{
      //     if(data.Error_value.ErrorCode==112){
      //         localStorage.removeItem('isLoggedin');            
      //         localStorage.removeItem('Token');            
      //         localStorage.removeItem('UserDetail');
      //         localStorage.removeItem('permissionList');
      //         localStorage.removeItem('UserId');
      //         this.route.navigate(['/login']);
      //    }
      //     //this.loading = false;
      //     //this.alertService.error('You have entered the invalid details.');

      // }
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })

  }


  onRestore(id) {

    var ans = confirm("Do you want to restore this vehicle");
    if (ans) {

      this.vehiclesService.deleteVehicle(id).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.getVehicles();
          this.PageIndex = 1;
          this.alerts = [
            {
              type: 'success',
              msg: `Vehicle Restored successfully.`
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



  onDelete(id) {

    var ans = confirm("Are you sure you want to remove UNIT from all policies? If yes, click OK.  If you want to remove from a specific policy only, please go to Edit.");
    if (ans) {

      this.vehiclesService.deleteVehicle(id).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.getVehicles();
          this.PageIndex = 1;
          this.alerts = [
            {
              type: 'success',
              msg: `Vehicle deleted successfully.`
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

    this.spinner.show()
    var _PoliciesOptions = {
      "PageIndex": 1, "PageSize": 200, "SortBy": "0", "SortOrder": 2, "Filter": {
        "SearchText": '',
        "Deleted": false, "ClientId": id
      }
    }

    this.PolicyoptionsMap = [];
    const PoliciesField = this.register.get('Policies');
    PoliciesField.reset();

    this.IsPDPolicy = 0;
    this.IsPAPolicy = 0;
    this.IsNTPolicy = 0;
    this.IsOAPolicy = 0;
    this.IsALPolicy = 0;
    this.policyUnitLimit = 0;

    this.policiesService.getPolicies(_PoliciesOptions).subscribe((data: any) => {

      console.log(data);

      if (data.Result) {

        this.ClientPolicies = data.Result_value.SearchResult;
        this.coveragePolicy = [];
        this.coveragePolicyAllUnit[1] = false;
        this.coveragePolicyAllUnit[2] = false;
        this.coveragePolicyAllUnit[3] = false;
        this.coveragePolicyAllUnit[4] = false;
        this.coveragePolicyAllUnit[6] = false;


        this.ClientPolicies.forEach((policy) => {
          //console.log(policy);
          if (policy.PolicyType == 2) {
            this.coveragePolicyAllUnit[policy.CoverageType] = true;
          }

          this.coveragePolicy[policy.CoverageType] = this.coveragePolicy[policy.CoverageType] || [];
          this.coveragePolicy[policy.CoverageType].push({ 'Id': policy.PolicyId, 'Name': policy.Policy });
        })
        console.log(this.coveragePolicy);

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

console.log("this.clientid");
debugger
    this.loading = true;
    var _VehiclesModal = this.register.value;
    var _VehiclesPolicy = [];
    console.log(_VehiclesModal);
    this.PolicyoptionsMap.forEach(function (value, key) {
      var innerObj = {};
      innerObj["PolicyId"] = value;
      _VehiclesPolicy.push(innerObj);

    })
    delete _VehiclesModal.Policies;
    _VehiclesModal.Policies = _VehiclesPolicy;
    if (this.UserInfo.Module == 3) {
      _VehiclesModal.ClientId =  this.clientid; // this.UserInfo.ModuleId

    }

    _VehiclesModal.Addedbound = this.formatDate(_VehiclesModal.Addedbound)



    this.vehiclesService.saveVehicles(_VehiclesModal).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.register.reset();
        this.getVehicles();
        this.alerts = [
          {
            type: 'success',
            msg: `Vehicle saved Successfully.`
          }
        ]
        this.alerts.map((alert: any) => ({
          type: 'sucess',
          msg: alert.msg
        }));


      } else {
        //this.loading = false;
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
        //this.alertService.error('You have entered the invalid details.');

      }
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
        //this.alertService.error('You have entered the invalid details.');
      })


    //console.log(this.register.get('Email').value);



  }


  get CertificateNotes() {
    return this.register.get('CertificateNotes');
  }
  get isNotReqired() {
    return this.register.get('isNotReqired');
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
  get Policies() {
    return this.register.get('Policies');
  }
  get Addedbound() {
    return this.register.get('Addedbound');
  }



  get ClientId() {
    return this.register.get('ClientId');
  }

  get VehicleIds() {
    return this.batcheditform.get('VehicleIds');
  }
  get Year() {
    return this.batcheditform.get('Year');
  }

  get RecepientEmails() {
    return this.batchemailform.get('RecepientEmails');
  }

  get FromEmail() {
    return this.batchemailform.get('FromEmail');
  }

  get Subject() {
    return this.batchemailform.get('Subject');
  }

  get Message() {
    return this.batchemailform.get('Message');
  }
  get aLPolicy() {
    return this.batchemailform.get('aLPolicy');
  }
  get pAPolicy() {
    return this.batchemailform.get('pAPolicy');
  }
  get oAPolicy() {
    return this.batchemailform.get('oAPolicy');
  }
  get nTPolicy() {
    return this.batchemailform.get('nTPolicy');
  }
  get pDPolicy() {
    return this.batchemailform.get('pDPolicy');
  }

  get fileupload() {
    return this.bulupload.get('fileupload');
  }



  

  ngOnInit() {

    this.getVehicles();
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
      Policies: [""],
      FutureValue: [""],
      CargoType:[""]
    });



    this.register.controls['SerialNumber'].setAsyncValidators(SerialnoValidator.validSerialno(this.vehiclesService, 0));

    this.batcheditform = this.frmBuilder.group({
      VehicleIds: [""],
      IsYear: [""],
      Year: [""],
      IsOwner: [""],
      Owner: [""],
      IsCoverageType: [""],
      pDPolicy: [""],
      nTPolicy: [""],
      oAPolicy: [""],
      pAPolicy: [""],
      aLPolicy: [""],
      IsUnitType: [""],
      UnitType: [""],
      IsMakes: [""],
      Makes: [""],
      IsValue: [""],
      Value: [""],
      IsDriverType: [""],
      DriverType: [""],
      IsLienholderId1: [""],
      LienholderId1: [""],
      IsLienholderId2: [""],
      LienholderId2: [""],
      IsEffectiveDate: [""],
      EffectiveDate: [""],
      IsExpirationDate: [""],
      ExpirationDate: [""],
      IsPolicies: [""],
      Policies: [""],
      IsRemove: [""]

    });


    this.updatecoverage = this.frmBuilder.group({
      EffectiveDate: [""],
      ExpirationDate: [""],
      PolicyType: [""],
      LienholderId: [""],
      CoverageType: [""],
      PolicyId: [""],
      VehicleId: [""]

    });


    this.bulupload = this.frmBuilder.group({
      fileupload: [""],
    });

    this.batchemailform = this.frmBuilder.group({
      RecepientEmails: ["", [Validators.required, EmailValidator]],
      FromEmail: ["", [Validators.required, EmailValidator]],
      Subject: ["", [Validators.required]],
      VehicleId: ["", [Validators.required]],
      Message: ["", [Validators.required]]

    });

  }

  openModal(template: TemplateRef<any>, id) {

    if (this.UserInfo.Module == 3) {
      const ClientId = this.register.get('ClientId');
      ClientId.clearValidators();
      this.getPolicies(this.UserInfo.ModuleId)

    }



    this.getVehicleMasterDetails();
    this.title = "Add New";
    this.ClientPolicies = [];
    this.coveragePolicy = [];


    //this.getLeinholders();
    this.register.reset();

    if (this.clientid && this.UserInfo.Module != 3) {
      const ClientId = this.register.get('ClientId');
      ClientId.setValue(this.clientid);
      this.getPolicies(this.clientid)
    }

    const Addedbound = this.register.get('Addedbound');
    Addedbound.setValue(new Date());
    this.config.class = 'modal-lg'
    this.isSubmitted = false;
    this.modalRef = this.modalService.show(template, this.config);
  }

  checkAllVehicle(event) {

    //this.checkAll=event.target.checked;
    if (event.target.checked) {
      this.vehicles.forEach(vehicle => {
        this.optionsMap[vehicle.VehicleId] = event.target.checked;
        vehicle.selected = event.target.checked;

      });
      //console.log(this.optionsMap);
    } else {
      this.vehicles.forEach(vehicle => {
        this.optionsMap[vehicle.VehicleId] = event.target.checked;
        vehicle.selected = false;

      });
      this.optionsMap = [];
    }
    //alert(event.target.checked);
  }

  updateCheckedOptions(option, event) {


    this.optionsMap[option] = event.target.checked;
    //console.log(this.optionsMap.length)
    if (Object.keys(this.optionsMap).length == this.vehicles.length) {

      this.checkAllMain = this.optionsMap.every(function (item: any) {
        return item == true;
      })



      //   this.optionsMap.forEach(vehicle => {

      //       if(!vehicle){
      //           // console.log(vehicle);
      //           this.checkAllMain=false;
      //           return true;
      //       }else{
      //           this.checkAllMain=true;
      //       }

      //   }
      // )
    }

    console.log(this.optionsMap);
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

  onValueChange(VehicleValue: string) {
    this.ValuePolicyCheck = parseInt(VehicleValue.replace(/[^\d.]/g, ''));
    console.log(this.ValuePolicyCheck)
  }

  getPolicy(id) {

    this.PoliciesService.getPolicyById(id).subscribe((data: any) => {
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


        if (this.IsOAPolicy) {
          console.log(this.IsOAPolicy, "IsOAPolicy");
           this.Cargotypeview=true;
        }

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
    if (this.IsPDPolicy) {
      this.PolicyoptionsMap.push(this.IsPDPolicy);
    }
    if (this.IsALPolicy) {
      this.PolicyoptionsMap.push(this.IsALPolicy);
    }
    //this.PolicyoptionsMap.push(option); 
    console.log(this.PolicyoptionsMap);

  }


  changeCoverage(coverage) {
    //alert(coverage);
    const PolicyId = this.updatecoverage.get('PolicyId');
    this.CoverageType = coverage;
    if (coverage == 4) {
      PolicyId.setValidators([Validators.required]);
    } else {
      PolicyId.clearValidators();
    }
    //alert(this.coveragePolicy[this.policyType].length);
    if (this.coveragePolicy[this.policyType].length == 1) {
      //alert(this.coveragePolicy[coverage][0].Id);
      PolicyId.setValue(this.coveragePolicy[this.policyType][0].Id)
    }
    PolicyId.updateValueAndValidity();

  }

  openModalPolicyUpdate(template: TemplateRef<any>, policytype, id, coveragtype, effectivedate, expirationdate, lienholderid, clientid, policy) {
    //alert(policy);
    //this.spinner.show()

    var EffectiveDate
    if (effectivedate) {
      EffectiveDate = new Date(effectivedate)
    } else {
      EffectiveDate = new Date();
    }

    var ExpirationDate;

    if (expirationdate) {

      ExpirationDate = new Date(expirationdate);

    } else {

      ExpirationDate = new Date();
      ExpirationDate.setFullYear(ExpirationDate.getFullYear() + 1);
      ExpirationDate.setDate(ExpirationDate.getDate());

    }



    //alert(this.UpdateCoveragePopupTitle);
    this.updatecoverage.reset();
    this.getPolicies(clientid);
    this.getInsurers()
    var _PolicyModel = { "VehicleId": id, 'EffectiveDate': EffectiveDate, 'ExpirationDate': ExpirationDate, 'PolicyType': policytype, 'LienholderId': lienholderid, 'CoverageType': coveragtype, 'PolicyId': policy };
    this.CoverageType = coveragtype;
    this.policyType = policytype;
    this.updatecoverage.setValue(_PolicyModel);

    if (coveragtype == 4) {
      //alert("Tets");
      const PolicyId = this.updatecoverage.get('PolicyId');
      PolicyId.setValidators([Validators.required]);
      if (this.coveragePolicy[policytype] && this.coveragePolicy[policytype].length == 1) {
        PolicyId.setValue(this.coveragePolicy[policytype][0].Id);
      }

      PolicyId.updateValueAndValidity();
    }
    //this.spinner.hide()
    this.config.class = 'modal-small'
    console.log(this.coveragePolicy);

    this.UpdateCoveragePopupTitle = "Update PD Coverage Type";
    if (policytype == 1) {
      this.UpdateCoveragePopupTitle = "Update PD Coverage Type";
    } else if (policytype == 2) {
      this.UpdateCoveragePopupTitle = "Update NT Coverage Type";
    } else if (policytype == 3) {
      this.UpdateCoveragePopupTitle = "Update OA Coverage Type";
    } else if (policytype == 4) {
      this.UpdateCoveragePopupTitle = "Update PA Coverage Type";
    } else if (policytype == 6) {
      this.UpdateCoveragePopupTitle = "Update AL Coverage Type";
    }
    console.log(this.UpdateCoveragePopupTitle);
    this.modalRef = this.modalService.show(template, this.config);


  }




  PrintBatchCertificate() {

    var IsoneCheckboxcheked = false;
    this.optionsChecked = [];
    for (var x in this.optionsMap) {
      if (this.optionsMap[x]) {
        //alert(this.optionsMap[x]);
        IsoneCheckboxcheked = true;
        this.optionsChecked.push(x);
      }
    }
    if (IsoneCheckboxcheked) {
      this.spinner.show();

      this.vehiclesService.printBatchCertificate(this.optionsChecked.join()).subscribe((data: any) => {
        var mediaType = 'application/pdf';
        this.spinner.hide();
        var blob = new Blob([data], { type: mediaType });
        var filename = 'Vehicle_Certificates.pdf';
        importedSaveAs(blob, filename);
      },
        (err: HttpErrorResponse) => {
          //alert("dsadas");
          console.log(err)
          this.loading = false;
          //this.alertService.error('You have entered the invalid details.');
        })

    } else {
      alert('Atleast one vehicle cheked');

    }


  }

  openModalBatchEmail(template: TemplateRef<any>, id, unit) {


    this.isSubmitted = false
    this.batchemailform.reset();
    var IsoneCheckboxcheked = false;
    this.optionsChecked = [];
    if (id) {
      IsoneCheckboxcheked = true;
      this.optionsChecked.push(id);
    }


    for (var x in this.optionsMap) {
      if (this.optionsMap[x]) {
        IsoneCheckboxcheked = true;
        this.optionsChecked.push(x);
      }
    }

    console.log(this.optionsMap);
    console.log("this.optionsChecked", this.optionsChecked);


    if (IsoneCheckboxcheked) {
      var unit;
      var Count = 0;
      var a;
      for (var x in this.optionsMap) {


        if (this.optionsMap[x]) {
          a = parseInt(x);
          console.log("a", a);
          Count = 1 + Count;
          unit = this.vehicles.find(x => x.VehicleId == a);
        }
      }

      console.log("vehicle check list", this.vehicles);
      console.log(this.optionsMap);



      //var dt= this.vehicles.find

      // this.batcheditform.reset(); 
      // this.BatchEdit.Year=false;
      // this.BatchEdit.VehicleType=false;
      // this.BatchEdit.Make=false;
      // this.BatchEdit.DriverType=false;
      // this.BatchEdit.Lienholder=false;
      // this.BatchEdit.Lienholder2=false;
      // this.BatchEdit.Policies=false;
      // this.BatchEdit.EffectiveDate=false;
      // this.BatchEdit.ExpirationDate=false;
      // this.BatchEdit.Value=false;
      var Subject = "";

      if (unit) {

        // if (count < 0)
        // {

        // }

        Subject = "Certificate for Unit #" + unit.Unit + "_" + unit.ClientName;
      }

      var user_info = JSON.parse(localStorage.UserDetail);
      //console.log(user_info)
      // alert(this.optionsChecked.join())
      var _BatchModel = {

        'VehicleId': this.optionsChecked.join(),
        'RecepientEmails': '',
        'FromEmail': 'no-reply@fleetvims.com',          //user_info.Email  (user specific email ),
        'Subject': Subject,
        'Message': ''

      }
      this.batchemailform.setValue(_BatchModel);
      this.config.class = 'modal-lg'
      this.modalRef = this.modalService.show(template, this.config);
    } else {
      alert('Atleast one vehicle cheked');

    }
  }

  openModalBatchEdit(template: TemplateRef<any>) {




    var IsoneCheckboxcheked = false;
    this.optionsChecked = [];
    for (var x in this.optionsMap) {
      if (this.optionsMap[x]) {
        IsoneCheckboxcheked = true;
        this.optionsChecked.push(x);
      }
    }
    //alert(this.clientid);
    this.getPolicies(this.clientid)

    if (IsoneCheckboxcheked) {
      this.getVehicleMasterDetails();
      //this.getLeinholders();
      //alert(this.optionsChecked.join());
      this.batcheditform.reset();

      this.BatchEdit.Year = false;
      this.BatchEdit.UnitType = false;
      this.BatchEdit.Make = false;
      this.BatchEdit.CoverageType = false;
      this.BatchEdit.DriverType = false;
      this.BatchEdit.Lienholder = false;
      this.BatchEdit.Lienholder2 = false;
      this.BatchEdit.Policies = false;
      this.BatchEdit.EffectiveDate = false;
      this.BatchEdit.ExpirationDate = false;
      this.BatchEdit.Value = false;
      this.BatchEdit.Owner = false

      // alert("sd");
      var _BatchModel = {

        'VehicleIds': this.optionsChecked.join(),
        'IsYear': '',
        'Year': '',
        'IsOwner': '',
        'Owner': '',
        'IsCoverageType': '',
        'pDPolicy': '',
        'nTPolicy': '',
        'oAPolicy': '',
        'pAPolicy': '',
        'aLPolicy': '',
        'IsUnitType': '',
        'UnitType': '',
        'IsMakes': '',
        'Makes': '',
        'IsValue': '',
        'Value': '',
        'IsDriverType': '',
        'DriverType': '',
        'IsLienholderId1': '',
        'LienholderId1': '',
        'IsLienholderId2': '',
        'LienholderId2': '',
        'IsEffectiveDate': '',
        'EffectiveDate': '',
        'IsExpirationDate': '',
        'ExpirationDate': '',
        'IsPolicies': '',
        'Policies': '',
        'IsRemove': ''

      }
      this.batcheditform.setValue(_BatchModel);
      this.config.class = 'modal-lg'
      this.modalRef = this.modalService.show(template, this.config);
    } else {
      alert('Atleast one vehicle cheked');

    }


  }


  onUpdatecoverage() {

    this.isSubmitted = true;
    if (!this.updatecoverage.valid)
      return;

    console.log(this.check);
    console.log(this.clientid);
    debugger
    this.loading = true;
    this.vehiclesService.updateCoverageType(this.updatecoverage.value).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.updatecoverage.reset();
        this.getVehicles();
        this.getVehicleCounter(this.clientid, this.check);

        this.alerts = [
          {
            type: 'success',
            msg: `Coverage Type updated Successfully.`
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


      })
  }

  onBatchEmail() {
    this.isSubmitted = true;
    if (!this.batchemailform.valid)
      return;

    this.loading = true;
    var _BatchEmailModel = this.batchemailform.value;
    _BatchEmailModel.RecepientEmails = _BatchEmailModel.RecepientEmails.split(",");
    _BatchEmailModel.VehicleId = _BatchEmailModel.VehicleId.split(",");
    this.vehiclesService.sendEmail(_BatchEmailModel).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.alerts = [
          {
            type: 'success',
            msg: `Email sent Successfully.`
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

  onVehiclesBatchSave() {
    this.isSubmitted = true;
    if (!this.batcheditform.valid)
      return;

    this.loading = true;
    this.vehiclesService.batchUpdateVehicles(this.batcheditform.value).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.checkAll = false;
        this.checkAllMain = false;
        this.optionsMap = [];
        this.modalRef.hide()
        this.batcheditform.reset();
        this.getVehicles();
        this.alerts = [
          {
            type: 'success',
            msg: `Vehicle saved Successfully.`
          }
        ]
        this.alerts.map((alert: any) => ({
          type: 'sucess',
          msg: alert.msg
        }));


      } else {
        this.loading = false;
        this.checkAll = false;
        this.checkAllMain = false;
        this.optionsMap = [];
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

  /*open(content,id) {
        this.title = "Add New"; 
        if(id){
            this.title = "Edit";
            this.getVehicle(id);
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
