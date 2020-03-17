import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { ClientsService} from '../../shared/services/clients.service';
import { CommonService} from '../../shared/services/common.service';
import { VehiclesService} from '../../shared/services/vehicles.service';


import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
    selector: 'app-clientcontacts',
    templateUrl: './clientcontacts.component.html',
    styleUrls: ['./clientcontacts.component.scss'],
    animations: [routerTransition()]
})


export class ClientContactsComponent implements OnInit {

	// Our array of clientcontacts
  clientcontacts: any[];
  Citylist: any[];
  ContactCitylist: any[];
  ContactList: any[];
  Statelist: any[];
  Agencylist:any[];
  Agencykeys:any[];

  MailingCitylist: any[];
  MailingStatelist: any[];
  ClientList:any[];



  ClientTypeList: any[];
  ContactRoleList: any[];
  ContactStatelist: any[];
  dataTable: any;
  closeResult: string;
  reortType: any;
  isSubmitted: boolean = false;
  isSubmitted_contact: boolean = false;
  showPassword: boolean = false;
  loading: boolean = false;
  contactregister: FormGroup; 
  register: FormGroup;
  title: string = "Add New";  
  modalRef: BsModalRef;
  Producers: any[];  
  EmailProducers : any[];
  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class:'modal-lg'
  };
  id: number;
  alerts: any = []

  UserInfo: any;

  constructor(private frmBuilder: FormBuilder,private router: ActivatedRoute,private ClientsService: ClientsService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private commonService:CommonService,private spinner: NgxSpinnerService,private vehiclesService: VehiclesService) {

       if (this.router.snapshot.params["id"]) {  
            this.id = this.router.snapshot.params["id"];  

        }  

 
        this.UserInfo=JSON.parse(localStorage.getItem('UserDetail'))
        console.log(this.UserInfo);
         

        
        //this.getClientContacts(); 

   }


  getStates(){

      this.commonService.getSates([{'CountryId':'1'}]).subscribe((data : any)=>{  
          //console.log(data)
          this.Statelist= data;
          this.MailingStatelist=data;
          
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        }) 

       

  }
  getAgencyProducer(id){
      var agencylist: any[] = JSON.parse(localStorage.getItem('Agencylist'));
      this.Producers=[];
      
      this.EmailProducers=[];
      agencylist.forEach(element => {
            if(element.AgencyId==id){
                element.ContactList.forEach(contact => {
                    contact.RoleList.forEach(Role => {
                        if(Role.RoleId==16){
                            var ProducerList=[];
                            ProducerList['UserId']=contact.UserId;
                            ProducerList['Name']=contact.FirstName+" "+contact.LastName
                            this.Producers.push(ProducerList);
                        }

                     }) 

                     if(contact.UserId !=null)
                     {
                      var EmailProducerList=[];
                      EmailProducerList['UserId']=contact.UserId;
                      EmailProducerList['Name']=contact.FirstName+" "+contact.LastName + " - "+contact.Email;
                      this.EmailProducers.push(EmailProducerList);
                     }
                  //console.log(contact);

                })
            }
            return false; 
                
        }) 
        console.log(this.Producers);

  } 
  sortProperties(obj){

  // convert object into array
  var sortable=[];
  for(var key in obj)
    if(obj.hasOwnProperty(key))
      sortable.push([key, obj[key]]); // each item is an array in format [key, value]
  
  // sort items by value
  sortable.sort(function(a, b)
  {
    var x=a[1].toLowerCase(),
      y=b[1].toLowerCase();
    return x<y ? -1 : x>y ? 1 : 0;
  });
  return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]

}
  getVehicleMasterDetails(){

      this.vehiclesService.getVehicleMasterDetails().subscribe((data : any)=>{  
                    
                        if(data.Result){ 
                              //alert("dsad");
                              //console.log(data);
                              this.ClientList= this.sortProperties(data.Result_value.ClientList.Result_value.SearchResult);
                              //console.log(data.Result_value.MakeList);
                                
                        }else{
                            if(data.Error_value.ErrorCode==112){
                                localStorage.removeItem('isLoggedin');            
                                localStorage.removeItem('Token');            
                                localStorage.removeItem('UserDetail');
                                localStorage.removeItem('permissionList');
                                localStorage.removeItem('UserId');
                                //this.router.navigate(['/login']);
                           }
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

  getAgencies(){
    this.commonService.getAgencies().subscribe((data : any)=>{  
          //console.log(data)
          this.Agencylist= data.Result_value.SearchResult;
          this.Agencykeys = Object.keys(this.Agencylist).filter(Number)
          console.log(this.Agencylist);
          
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


   sameasAddress(event){

        const Address1 = this.register.get('Address1');
        const MailingAddress1 = this.register.get('MailingAddress1');

        const StateId = this.register.get('StateId');
        const MailingStateId = this.register.get('MailingStateId');

        const CityId = this.register.get('CityId');
        const MailingCityId = this.register.get('MailingCityId');

        const Zip = this.register.get('Zip');
        const MailingZip = this.register.get('MailingZip');

     if(event.target.checked){
       //console.log(event.target.value)
        
        
        MailingAddress1.setValue(Address1.value);
        MailingStateId.setValue(StateId.value);
        this.getMailingCities(StateId.value);
        MailingCityId.setValue(CityId.value);
        MailingZip.setValue(Zip.value);
  
     }else{

        MailingAddress1.setValue('');
        MailingStateId.setValue('');
        this.getMailingCities(StateId.value);
        MailingCityId.setValue('');
        MailingZip.setValue('');
     }

  }

   getMailingCities(stateId: any){

     this.commonService.getCities(stateId).subscribe((data : any)=>{  
          console.log(data)
          this.MailingCitylist= data;
          
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

            this.ClientsService.deleteClientContact(id).subscribe((data : any)=>{  
                    console.log(data)
                        if(data.Result){ 
                            this.getClient(this.id);
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

  getClient(id){
    this.spinner.show();
    this.getVehicleMasterDetails();

    this.ClientsService.getClientById(id).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){ 

                 this.getAgencies();
        //var _UserLoginModel = { "Email": data.Result_value.Email, "ClientName": data.Result_value.ClientName,"Phone":data.Result_value.Phone,'ClientId':data.Result_value.ClientId}
                    //this.register.setValue(_UserLoginModel) 
                   var client = data.Result_value;
                   this.ContactList=client.ContactList;
                   this.ClientTypeList=client.ClientTypeList;
                   this.ContactRoleList=client.ContactRoleList;
                   console.log(client.ContactList); 
                   this.getAgencyProducer(client.AgencyId); 
                   var  _ClienteModel = { 
                        "ClientName": client.ClientName, 
                        "AgencyId": client.AgencyId,
                        "Address1": client.Address1,
                        "StateId":client.StateId,
                        'CityId':client.CityId,
                        "Zip": client.Zip, 
                        "MailingAddress1": client.MailingAddress1,
                        "MailingStateId":client.MailingStateId,
                        "MailingCityId":client.MailingCityId,
                        'MailingZip':client.MailingZip,
                        "ClientId":client.ClientId,
                        'PolicyPD':client.PolicyPD,
                        'PolicyNT':client.PolicyNT,
                        'PolicyOA':client.PolicyOA,
                        'PolicyPA':client.PolicyPA,
                        'PolicyAL':client.PolicyAL,
                        
                        'CertificatePD':client.CertificatePD,
                        'CertificateNT':client.CertificateNT,
                        'CertificateOA':client.CertificateOA,
                        'CertificatePA':client.CertificatePA,
                        'CertificateAL':client.CertificateAL,
                        
                        "Description": client.Description,
                        "parentClientId": client.parentClientId,
                        'DOT':client.DOT,
                        'ProducerId':client.ProducerId,
                        'user_emailId':client.user_emailId                        
                  };
 

                   

                   
                  
                  this.getStates();
                  this.getCities(client.StateId);
                  this.getMailingCities(client.MailingStateId);
                  

                   this.register.setValue(_ClienteModel);   
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



  onClientsSave(){
      this.isSubmitted = true;
      if(!this.register.valid)
      return;

      this.loading = true;
      this.ClientsService.saveClients(this.register.value).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    //this.modalRef.hide()
                    //this.register.reset();  
                    //this.getClients();

                    this.alerts = [
                      {
                        type: 'success',
                        msg: `Client Updated Successfully.`
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


    onClientContactSave(){

      this.isSubmitted_contact = true;
      if(!this.contactregister.valid)
      return;


      
     var _contactInfo=this.contactregister.value;
     _contactInfo.Module=3
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

      
     this.ClientsService.saveClientContact(_contactInfo).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    this.modalRef.hide()
                    this.contactregister.reset();  
                    this.getClient(this.id);
                    //this.getClientContacts();

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




    get PolicyPD() { 
        return this.register.get('PolicyPD');
    } 
    get PolicyNT() { 
        return this.register.get('PolicyNT');
    } 
    get PolicyOA() { 
        return this.register.get('PolicyOA');
    } 
    get PolicyPA() { 
        return this.register.get('PolicyPA');
    }
    get PolicyAL() { 
        return this.register.get('PolicyAL');
    } 

    get CertificatePD() { 
        return this.register.get('CertificatePD');
    } 
    get CertificateNT() { 
        return this.register.get('CertificateNT');
    } 
    get CertificateOA() { 
        return this.register.get('CertificateOA');
    } 
    get CertificatePA() { 
        return this.register.get('CertificatePA');
    }
    get CertificateAL() { 
        return this.register.get('CertificateAL');
    }
    
    get DOT() { 
        return this.register.get('DOT');
    }
    get ProducerId() { 
        return this.register.get('ProducerId');
    } 
    
    get ClientName() { 
        return this.register.get('ClientName');
    }
    get Phone() { 
        return this.register.get('Phone');
    }
    get ClientId() { 
        return this.register.get('ClientId');
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

    
    //---prashant  --//
    get user_emailId() { 
      return this.register.get('user_emailId');
  } 

    get MailingAddress1() { 
        return this.register.get('MailingAddress1');
    }
    get MailingAddress2() { 
        return this.register.get('MailingAddress2');
    }
    get MailingCityId() { 
        return this.register.get('MailingCityId');
    } 
    get MailingStateId() { 
        return this.register.get('MailingStateId');
    }
    get MailingZip() { 
        return this.register.get('MailingZip');
    }

    get AgencyId() { 
        return this.register.get('AgencyId');
    } 

    

    get Fax() { 
        return this.register.get('Fax');
    }
    get CountryId() { 
        return this.register.get('CountryId');
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

    get parentClientId(){
        return this.contactregister.get('parentClientId');
    }
    

  ngOnInit() {
    
    this.register = this.frmBuilder.group({ 
           ClientName:["", [Validators.required]],
           AgencyId:["", [Validators.required]],
           Address1:[""],
           parentClientId:[""],
           StateId:[""],
           CityId:[""],
           Zip:[""],
           MailingAddress1:[""],
           MailingStateId:[""],
           MailingCityId:[""],
           MailingZip:[""],
           ClientId:[""],
           PolicyPD:[""],
           PolicyNT:[""],
           PolicyOA:[""],
           PolicyPA:[""],
           PolicyAL:[""],
           CertificatePD:[""],
           CertificateNT:[""],
           CertificateOA:[""],
           CertificatePA:[""],
           CertificateAL:[""],
           DOT:["", [Validators.maxLength(7)]],
           ProducerId:["", [Validators.required]],
           Description:[""],
           user_emailId:[""] 
    

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
          this.getClient(this.id);

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
