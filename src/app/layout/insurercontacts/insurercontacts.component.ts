import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { InsurersService} from '../../shared/services/insurers.service';
import { CommonService} from '../../shared/services/common.service';

import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolesService} from '../../shared/services/roles.service';




@Component({
    selector: 'app-insurercontacts',
    templateUrl: './insurercontacts.component.html',
    styleUrls: ['./insurercontacts.component.scss'],
    animations: [routerTransition()]
})


export class InsurerContactsComponent implements OnInit {

  // Our array of insurercontacts
  AgencyId1: number;

  insurercontacts: any[];
  Citylist: any[];
  ContactCitylist: any[];
  ContactList: any[];
  Statelist: any[];
  InsurerTypeList: any[];
  ContactRoleList: any[];
  ContactStatelist: any[];
  dataTable: any;
  closeResult: string;
  reortType: any;
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  isSubmitted_contact: boolean = false;
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
  AddedCityView: boolean = false;

  ShowAgency: boolean = false;

 
  constructor(private frmBuilder: FormBuilder,private router: ActivatedRoute,private InsurersService: InsurersService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private commonService:CommonService,private spinner: NgxSpinnerService, public RolesService: RolesService) {

       if (this.router.snapshot.params["id"]) {  
            this.id = this.router.snapshot.params["id"];  

        }  
        
        //this.getInsurerContacts(); 
        this.UserInfo=JSON.parse(localStorage.getItem('UserDetail'))

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

            this.InsurersService.deleteInsurerContact(id).subscribe((data : any)=>{  
                    console.log(data)
                        if(data.Result){ 
                            this.getInsurer(this.id);
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

  getInsurer(id){
    this.spinner.show()
    this.InsurersService.getInsurerById(id).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){ 


        //var _UserLoginModel = { "Email": data.Result_value.Email, "InsurerName": data.Result_value.InsurerName,"Phone":data.Result_value.Phone,'InsurerId':data.Result_value.InsurerId}
                    //this.register.setValue(_UserLoginModel) 
                   var insurer = data.Result_value;
                   this.AgencyId1=data.Result_value.AgencyId;
                   this.ContactList=insurer.ContactList;
                   this.InsurerTypeList=insurer.InsurerTypeList;
                   this.ContactRoleList=insurer.ContactRoleList;
                   console.log(insurer.ContactList); 

                   delete insurer.Description;
                   delete insurer.City;
                   delete insurer.State;  
                   delete insurer.Country;
                   delete insurer.CountryId;
                   delete insurer.Option;
                   delete insurer.CreatedDate;
                   delete insurer.ModifiedDate;  
                   delete insurer.CreatedBy;
                   delete insurer.ModifiedBy;
                   delete insurer.Fax;
                   delete insurer.Agency;
                   delete insurer.Email;
                   delete insurer.ContactList;
                   delete insurer.InsurerTypeList;
                   delete insurer.ContactRoleList;
                   delete insurer.Policies;
                   delete insurer.InsuredValues;
                   delete insurer.VehicleCount;
                   
                   
                  this.getStates();
                  this.getAgencies();
                  this.getCities(insurer.StateId);
                  this.register.setValue(data.Result_value);
                  this.spinner.hide()        
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



  onInsurersSave(){
      this.isSubmitted = true;
      if(!this.register.valid)
      return;

      this.loading = true;
      this.InsurersService.saveInsurers(this.register.value).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    //this.modalRef.hide()
                    //this.register.reset();  
                    //this.getInsurers();

                    this.alerts = [
                      {
                        type: 'success',
                        msg: `Insurer Updated Successfully.`
                      }
                    ]
                  this.alerts.map((alert: any) => ({
                    type: 'sucess',
                    msg: alert.msg
                  }));  

                    
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


    onInsurerContactSave(){

      this.isSubmitted_contact = true;
      if(!this.contactregister.valid)
      return;


      
     var _contactInfo=this.contactregister.value;
     _contactInfo.Module=4
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
      
     this.InsurersService.saveInsurerContact(_contactInfo).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    this.modalRef.hide()
                    this.contactregister.reset();  
                    this.getInsurer(this.id);
                    //this.getInsurerContacts();

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
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })

    }




    
    get InsurerName() { 
        return this.register.get('InsurerName');
    }
    get Phone() { 
        return this.register.get('Phone');
    }
    get InsurerId() { 
        return this.register.get('InsurerId');
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
    
    this.register = this.frmBuilder.group({ 
           InsurerName:["", [Validators.required]],
           Address1:[""],
           Address2:[""],
           StateId:[""],
           CityId:[""],
           Zip:[""],
           Phone:["", [Validators.pattern('^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$')]],
           InsurerId:[""],
           AgencyId:[""]

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
          this.getInsurer(this.id);

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
     this.contactregister.reset(); 
     this.getContactStates();
     this.isSubmitted_contact = false;
     this.showPassword = false;
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
