import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { LienholdersService} from '../../shared/services/lienholders.service';
import { CommonService} from '../../shared/services/common.service';

import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolesService} from '../../shared/services/roles.service';





@Component({
    selector: 'app-lienholdercontacts',
    templateUrl: './lienholdercontacts.component.html',
    styleUrls: ['./lienholdercontacts.component.scss'],
    animations: [routerTransition()]
})


export class LienholderContactsComponent implements OnInit {

	// Our array of lienholdercontacts
  lienholdercontacts: any[];
  Citylist: any[];
  ContactCitylist: any[];
  

  AgencyId1: number;
  ContactList: any[];
  Statelist: any[];
  LienholderTypeList: any[];
  ContactRoleList: any[];
  ContactStatelist: any[];
  dataTable: any;
  closeResult: string;
  CityName: number;
  reortType: any;
  isSubmitted: boolean = false;
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
    class:'modal-lg'
  };
  id: number;
  alerts: any = []
  
  Agencylist: any;
  UserInfo: any;
  ShowAgency: boolean = false;
  AddedCityView: boolean = false;
  constructor(private frmBuilder: FormBuilder,private Router: Router,private router: ActivatedRoute,private LienholdersService: LienholdersService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private commonService:CommonService,private spinner: NgxSpinnerService, public RolesService: RolesService) {

       if (this.router.snapshot.params["id"]) {  
            this.id = this.router.snapshot.params["id"];  

        }  
        
        //this.getLienholderContacts(); 
        this.UserInfo=JSON.parse(localStorage.getItem('UserDetail'));
        if (this.UserInfo.ModuleId == 1) {
          this.ShowAgency = true;  
      }
   }





   getAgencies(){
    this.commonService.getAgencies().subscribe((data : any)=>{  
          //console.log(data)
          this.Agencylist= data.Result_value.SearchResult;
          localStorage.setItem('Agencylist',JSON.stringify(this.Agencylist));
          //this.Agencykeys = Object.keys(this.Agencylist).filter(Number)
                            console.log(this.Agencylist);
          
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        }) 

  }



  getStates(){

      this.commonService.getSates([{'CountryId':'1'}]).subscribe((data : any)=>{  
          //console.log(data)
          this.Statelist= data;
          
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        }) 

       

  } 
  getCities(stateId: any){

     this.commonService.getCities(stateId).subscribe((data : any)=>{  
          console.log(data)
          this.Citylist= data;
          
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })  

      //this.Citylist= [{ "id": "1",'name':'Inida' },{ "id": "2",'name':'USA' },{ "id": "3",'name':'UK' }]

  } 

  getContactStates(){

      this.commonService.getSates([{'CountryId':'1'}]).subscribe((data : any)=>{  
          //console.log(data)
          this.ContactStatelist= data;
          
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        }) 

       

  } 

  getContactCities(stateId: any){

     this.commonService.getCities(stateId).subscribe((data : any)=>{  
          console.log(data)
          this.ContactCitylist= data;
          
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })  

      //this.Citylist= [{ "id": "1",'name':'Inida' },{ "id": "2",'name':'USA' },{ "id": "3",'name':'UK' }]

  } 

  
  

  onDeleteContact(id){

        var ans = confirm("Do you want to delete Contact with Id: " + id);  
        if (ans) {  

            this.LienholdersService.deleteLienholderContact(id).subscribe((data : any)=>{  
                    console.log(data)
                        if(data.Result){ 
                            this.getLienholder(this.id);
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
                        }else{
                            //this.loading = false;
                            //this.alertService.error('You have entered the invalid details.');
                            
                        }
                },
                (err : HttpErrorResponse)=>{
                        console.log(err)
                        this.loading = false;
                        //this.alertService.error('You have entered the invalid details.');
                })  

        }       
  }

  getLienholder(id){
    this.spinner.show();
    this.LienholdersService.getLienholderById(id).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){ 


        //var _UserLoginModel = { "Email": data.Result_value.Email, "LienholderName": data.Result_value.LienholderName,"Phone":data.Result_value.Phone,'LienholderId':data.Result_value.LienholderId}
                    //this.register.setValue(_UserLoginModel) 
                    console.log(data.Result_value);
                   var lienholder = data.Result_value;
                    lienholder.IsAddedCity=false ;

                   this.AgencyId1 = data.Result_value.AgencyId;
console.log( this.AgencyId1);

                  // this.lienholder1= data.Result_value;
                   this.ContactList=lienholder.ContactList;
                   this.LienholderTypeList=lienholder.LienholderTypeList;
                   this.ContactRoleList=lienholder.ContactRoleList;
                   console.log(lienholder.ContactList); 

                   delete lienholder.Description;
                   delete lienholder.City;
                   delete lienholder.State;  
                   delete lienholder.Country;
                   delete lienholder.CountryId;
                   delete lienholder.Option;
                   delete lienholder.CreatedDate;
                   delete lienholder.ModifiedDate;  
                   delete lienholder.CreatedBy;
                   delete lienholder.ModifiedBy;
                   delete lienholder.Fax;
                   delete lienholder.Agency;
                   delete lienholder.Email;
                   delete lienholder.ContactList;
                   delete lienholder.LienholderTypeList;
                   delete lienholder.ContactRoleList;
                   delete lienholder.StateCode;
                 //  delete this.register.value.IsAddedCity;
                    

                   //delete lienholder.otherCity;
                   
                   
                   
                  this.getStates();                  
                  this.getAgencies();
                  this.getCities(lienholder.StateId);

                   this.register.setValue(data.Result_value);      
                  
                   this.spinner.hide();  
                   // this.loading = false;
                  
                }else{
                    //this.loading = false;
                    //this.alertService.error('You have entered the invalid details.');
                    
                }
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })
        
  
  }           



  onLienholdersSave(){
      this.isSubmitted = true;
      if(!this.register.valid)
      return;

      if (this.register.value.IsAddedCity = true) {
        this.register.value.CityId = -1;
      }
  

      this.loading = true;
      this.LienholdersService.saveLienholders(this.register.value).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    //this.modalRef.hide()
                    //this.register.reset();  
                    //this.getLienholders();

                    this.alerts = [
                      {
                        type: 'success',
                        msg: `Lienholder Updated Successfully.`
                      }
                    ]
                  this.alerts.map((alert: any) => ({
                    type: 'sucess',
                    msg: alert.msg
                  }));  

                   this.Router.navigate(['lienholders']) 

                }else{
                    this.loading = false;
                    //this.alertService.error('You have entered the invalid details.');
                    
                }
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })


      //console.log(this.register.get('Email').value);



    }


    onLienholderContactSave(){

      this.isSubmitted_contact = true;
      if(!this.contactregister.valid)
      return;


      
     var _contactInfo=this.contactregister.value;
     _contactInfo.Module=5
    _contactInfo.ModuleId=this.id;

     if(!_contactInfo.ContactId){
        _contactInfo.ContactId=0;
     }
     if(!_contactInfo.Password){
        _contactInfo.Password="";
     }
     if(!_contactInfo.PortalAccess){
        _contactInfo.PortalAccess=false;
     }
     if(!_contactInfo.ReportCertificates){
        _contactInfo.ReportCertificates=false;
     }
     if(!_contactInfo.ReportMonthlySummary){
        _contactInfo.ReportMonthlySummary=false;
     }
     console.log(_contactInfo);
      
     this.LienholdersService.saveLienholderContact(_contactInfo).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    this.modalRef.hide()
                    this.contactregister.reset();  
                    this.getLienholder(this.id);
                    //this.getLienholderContacts();

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

                    
                    
                }else{
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
        (err : HttpErrorResponse)=>{
            
               

                //this.alertService.error('You have entered the invalid details.');
        })

    }




    get Description() { 
        return this.register.get('Description');
    } 
    get LeinholderName() { 
        return this.register.get('LeinholderName');
    }
    get Phone() { 
        return this.register.get('Phone');
    }
    get LeinholderId() { 
        return this.register.get('LeinholderId');
    }
    get Address1() { 
        return this.register.get('Address1');
    }
    get Address2() { 
        return this.register.get('Address2');
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

    get AgencyId() { 
      return this.register.get('AgencyId');
    }

    get otherCity() { 
        return this.register.get('otherCity');
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


    checkNew() {
      //debugger
      var a = 0;
      var b = 0;
  
      // console.log(AddedCity,"hahaha1");
      if (this.register.value.IsAddedCity == true) {
        if (b == 0) {
          this.register.value.IsAddedCity = false;
          this.AddedCityView = false;
          a = a + 1;
        }
      }
      if (this.register.value.IsAddedCity == null) {
        this.register.value.IsAddedCity = true;
        this.AddedCityView = true;
      }
      else {
        if (a == 0) {
          this.register.value.IsAddedCity = true;
          this.AddedCityView = true;
          b = b + 1;
        }
  
      }
  }

  ngOnInit() {
    
    this.register = this.frmBuilder.group({ 
           LeinholderName:["", [Validators.required]],
           Address1:[""],
           Address2:[""],
           StateId:[""],
           CityId:[""],
           otherCity:[""],
           Zip:[""],
           Phone:[""],
           LeinholderId:[""],           
           AgencyId:[""],
           IsAddedCity: [""]

      });

       this.contactregister = this.frmBuilder.group({ 
           ContactFirstName:["", [Validators.required]],
           ContactLastName:["", [Validators.required]],
           ContactEmail:["", [Validators.required,EmailValidator]],
           ContactAddress1:[""],
           ContactAddress2:[""],
           PortalAccess:[""], 
           Password:[""], 
           RoleId:["", [Validators.required]],
           ContactStateId:[""],
           ContactCityId:[""],
           ContactZip:[""],
           ContactPhone:["", [Validators.pattern('^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$')]],
           ContactId:[""],
           ReportMonthlySummary:[""],
           ReportCertificates:[""]

      });

      if (this.id > 0) {  
          this.getLienholder(this.id);

      }
  }

showPasswordField(){ 

   this.showPassword = !this.showPassword;
   const password = this.contactregister.get('Password');
   if(this.title=="Add New" && this.showPassword){ 
      //alert("ddd"); 
      password.setValidators([Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]);
   }else{
      password.clearValidators();
   }
   password.updateValueAndValidity();

}

openModal(template: TemplateRef<any>,c_data) {
     this.title = "Add New"; 
      this.showPassword = false;
     this.contactregister.reset(); 
     this.getContactStates();
     this.isSubmitted_contact = false;
     this.reortType=1;
      if(c_data!=0){
          console.log(c_data); 
          console.log(c_data.RoleList[0].RoleId); 
          this.title = "Edit";
          const password = this.contactregister.get('Password');
          password.clearValidators();
          var  _ContactModel = { 
              "ContactEmail": c_data.Email, 
              "ContactFirstName": c_data.FirstName,
              "ContactLastName":c_data.LastName,
              'ContactAddress1':c_data.Address1,
              "ContactAddress2": c_data.Address2, 
              "PortalAccess": c_data.PortalAccess,
              "ContactStateId":c_data.StateId,
              'ContactCityId':c_data.CityId,
              "ContactZip":c_data.Zip,
              'ContactPhone':c_data.Phone,
              'RoleId':c_data.RoleList[0].RoleId,
              'ContactId':c_data.UserId,
              'Password':'',
              'ReportMonthlySummary':c_data.ReportMonthlySummary,
              'ReportCertificates':c_data.ReportCertificates
            };
          this.showPassword=c_data.PortalAccess;
          this.getContactCities(c_data.StateId);          
          this.contactregister.setValue(_ContactModel);
          
      }
   
    this.modalRef = this.modalService.show(template,this.config);
  }


}
