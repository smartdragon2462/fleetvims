import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AgenciesService } from '../../shared/services/agencies.service';
import { CommonService } from '../../shared/services/common.service';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';





@Component({
  selector: 'app-agencycontacts',
  templateUrl: './agencycontacts.component.html',
  styleUrls: ['./agencycontacts.component.scss'],
  animations: [routerTransition()]
})


export class AgencyContactsComponent implements OnInit {

  // Our array of agencycontacts
  agencycontacts: any[];
  Citylist: any[];
  ContactCitylist: any[];
  ContactList: any[];
  Statelist: any[];
  AgencyTypeList: any[];
  ContactRoleList: any[];
  ContactStatelist: any[];
  dataTable: any;
  closeResult: string;
  reortType: any;
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  showSignature: boolean = false;
  isSubmitted_contact: boolean = false;
  loading: boolean = false;
  contactregister: FormGroup;
  register: FormGroup;
  title: string = "Add New";
  contactError: string = "";
  modalRef: BsModalRef;
  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };
  id: number;
  alerts: any = []
  url: string;
  agencylogo: string;

  constructor(private frmBuilder: FormBuilder, private router: ActivatedRoute, private AgenciesService: AgenciesService, private http: HttpClient, private chRef: ChangeDetectorRef, private modalService: BsModalService, private commonService: CommonService, private spinner: NgxSpinnerService) {

    if (this.router.snapshot.params["id"]) {
      this.id = this.router.snapshot.params["id"];

    }

    //this.getAgencyContacts(); 

  }


  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {

      var file = event.target.files[0]
      if (file.type.match('image.*')) {
        //console.log(event.target.files[0]);
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (imagesrc: any) => { // called once readAsDataURL is completed

          //console.log(imagesrc);
          this.url = imagesrc.target.result;
          const Signature = this.contactregister.get('Signature');
          Signature.setValue(imagesrc.target.result);
          //console.log(event);

        }
      } else {
        //this.contactregister.nativeElement.reset()
        alert('invalid format!');
      }
    }
  }

  onSelectlogoFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {

      var file = event.target.files[0]
      if (file.type.match('image.*')) {
        //console.log(event.target.files[0]);
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (imagesrc: any) => { // called once readAsDataURL is completed

          //console.log(imagesrc);
          this.agencylogo = imagesrc.target.result;
          const AgencyLogoPath = this.register.get('AgencyLogoPath');
          AgencyLogoPath.setValue(imagesrc.target.result);

          //
          //const Signature = this.contactregister.get('Signature');
          //Signature.setValue(imagesrc.target.result);
          //console.log(event);

        }
      } else {
        //this.contactregister.nativeElement.reset()
        alert('invalid format!');
      }
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



  getProducerRole(roleid: any) {
    if (roleid == 16) {
      this.showSignature = true;
    } else {
      this.showSignature = false;
    }

  }


  onDeleteContact(id) {

    var ans = confirm("Do you want to delete Contact with Id: " + id);
    if (ans) {

      this.AgenciesService.deleteAgencyContact(id).subscribe((data: any) => {
        console.log(data)
        if (data.Result) {
          this.getAgency(this.id);
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

  getAgency(id) {

    this.spinner.show()

    this.AgenciesService.getAgencyById(id).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {


        //var _UserLoginModel = { "Email": data.Result_value.Email, "AgencyName": data.Result_value.AgencyName,"Phone":data.Result_value.Phone,'AgencyId':data.Result_value.AgencyId}
        //this.register.setValue(_UserLoginModel) 
        var agency = data.Result_value;
        this.ContactList = agency.ContactList;
        this.AgencyTypeList = agency.AgencyTypeList;
        this.ContactRoleList = agency.ContactRoleList;
        console.log(agency.ContactList);


        delete agency.City;
        delete agency.State;
        delete agency.Country;
        delete agency.CountryId;
        delete agency.Option;
        delete agency.CreatedDate;
        delete agency.ModifiedDate;
        delete agency.CreatedBy;
        delete agency.ModifiedBy;
        delete agency.Fax;
       // delete agency.Email;
        delete agency.ContactList;
        delete agency.AgencyTypeList;
        delete agency.ContactRoleList;
        delete agency.FileName;

        this.agencylogo = agency.AgencyLogoPath;

        this.getStates();
        this.getCities(agency.StateId);
        console.log(data.Result_value);
        this.register.setValue(data.Result_value);
        // this.loading = false;
        this.spinner.hide()
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



  onAgenciesSave() {
    this.isSubmitted = true;
    if (!this.register.valid)
      return;

    this.loading = true;
    this.AgenciesService.saveAgencies(this.register.value).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        //this.modalRef.hide()
        //this.register.reset();  
        //this.getAgencies();

        this.alerts = [
          {
            type: 'success',
            msg: `Agency Updated Successfully.`
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


    //console.log(this.register.get('Email').value);



  }


  onAgencyContactSave() {

    this.isSubmitted_contact = true;
    if (!this.contactregister.valid)
      return;



    var _contactInfo = this.contactregister.value;
    _contactInfo.Module = 2
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

    this.AgenciesService.saveAgencyContact(_contactInfo).subscribe((data: any) => {
      console.log(data)
      if (data.Result) {
        this.loading = false;
        this.modalRef.hide()
        this.contactregister.reset();
        this.getAgency(this.id);
        //this.getAgencyContacts();

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

        this.url = '';


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

  }




  get AgencyType() {
    return this.register.get('AgencyType');
  }
  get AgencyName() {
    return this.register.get('AgencyName');
  }
  get Phone() {
    return this.register.get('Phone');
  }
  get AgencyId() {
    return this.register.get('AgencyId');
  }
  get Address1() {
    return this.register.get('Address1');
  }
  get Address2() {
    return this.register.get('Address2');
  }

  get Email() {
    return this.register.get('Email');
  }

  get CityId() {
    return this.register.get('CityId');
  }
  get StateId() {
    return this.register.get('StateId');
  }
  get Zip() {
    return this.register.get('Zip');
  }
  get Fax() {
    return this.register.get('Fax');
  }
  get AgencyLogoPath() {
    return this.register.get('AgencyLogoPath');
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

  get Signature() {
    return this.contactregister.get('Signature');
  }



  ngOnInit() {

    this.register = this.frmBuilder.group({
      AgencyName: ["", [Validators.required]],
      AgencyType: ["", [Validators.required]],
      Address1: ["", [Validators.required]],
      Address2: [""],
      StateId: ["", [Validators.required]],
      CityId: ["", [Validators.required]],
      Zip: ["", [Validators.required]],
      //Phone: ["", [Validators.required, Validators.pattern('^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$')]],
      Phone : [""],
      AgencyId: [""],
      AgencyLogoPath: [""],
      Email: [""]

    });

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
      ReportCertificates: [""],
      Signature: [""]

    });

    if (this.id > 0) {
      this.getAgency(this.id);

    }
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
    this.contactError = '';
    this.contactregister.reset();
    this.getContactStates();
    this.isSubmitted_contact = false;
    this.showPassword = false;
    this.reortType = 1;
    const password = this.contactregister.get('Password');
    password.clearValidators();
    password.updateValueAndValidity();
    if (c_data != 0) {
      console.log(c_data);
      console.log(c_data.RoleList[0].RoleId);
      this.title = "Edit";

      this.getProducerRole(c_data.RoleList[0].RoleId);
      if (c_data.Signature) {
        this.url = c_data.Signature;
      } else {
        this.url = '';
      }

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
        'ReportCertificates': c_data.ReportCertificates,
        'Signature': ''
      };
      this.showPassword = c_data.PortalAccess;
      if (c_data.ReportType == 2) {
        this.reortType = 0;
      }

      //this.register.setValue(_UserLoginModel) 
      this.getContactCities(c_data.StateId);
      this.contactregister.setValue(_ContactModel);
    }
    this.modalRef = this.modalService.show(template, this.config);
  }


}
