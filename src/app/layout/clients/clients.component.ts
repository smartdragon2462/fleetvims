import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { ClientsService} from '../../shared/services/clients.service';
import { CommonService} from '../../shared/services/common.service';
import { VehiclesService} from '../../shared/services/vehicles.service';

import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';
import { RolesService} from '../../shared/services/roles.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {ExcelService} from '../../shared/services/excel.service';
import { forEach } from '@angular/router/src/utils/collection';





@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
    animations: [routerTransition()]
})


export class ClientsComponent implements OnInit {

	// Our array of clients
  clients: any[];
  Citylist: any[];
  Statelist: any[];
  Agencylist:any[];
  Agencykeys:any[];

  MailingCitylist: any[];
  MailingStatelist: any[];

  dataTable: any;
  UserInfo: any;
  closeResult: string;
  search_value: string;
  SearchText: string='';
  isSubmitted: boolean = false;
  isDeleted = false;
  loading: boolean = false;
  register: FormGroup; 
  title: string = "Add New"; 
  modalRef: BsModalRef;
  totalItems: number = 0;
  SortBy: number = 4; //0;
  SortOrder: number = 2;
  ClientList:any[];


  showprnt:boolean=false;

  itemsPerPage: number = 10;
  //itemsPerPage: number = 10000;
  PageIndex: number = 1;
  Producers: any[];
  EmailProducers : any[];
  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class:'modal-lg'
  };


  alerts: any = []
  confirmParent: any;
  confirmProducerId: 0;
  confirmuser_emailId:0;
  confirmAgencyId:0;

  constructor(private frmBuilder: FormBuilder,private router: Router,private clientsService: ClientsService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private sanitizer: DomSanitizer,private commonService: CommonService,private spinner: NgxSpinnerService, public RolesService: RolesService,private excelService: ExcelService,private vehiclesService: VehiclesService) {
    
    this.UserInfo=JSON.parse(localStorage.getItem('UserDetail'))
    console.log(this.UserInfo);
       

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
                                this.router.navigate(['/login']);
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

  getAgencies(){
    this.commonService.getAgencies().subscribe((data : any)=>{  
          //console.log(data)
          this.Agencylist= data.Result_value.SearchResult;
          localStorage.setItem('Agencylist',JSON.stringify(this.Agencylist));
          //this.Agencykeys = Object.keys(this.Agencylist).filter(Number)
          if(this.UserInfo.Module!=1){
              this.getAgencyProducer(this.Agencylist[0].AgencyId);
          }  
          console.log(this.Agencylist);
          
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
                       }
                      ) 
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
        console.log(this.EmailProducers);

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

  
  pageChanged(event: any): void {
      this.PageIndex=event.page;
     // console.log(this.PageIndex);
      this.getClients();
  }


  itemsPerPageChange(itemcount: any): void {
      this.itemsPerPage=itemcount;
      this.getClients();
  }


  onFilter(value) {
      this.SearchText= value;    
      this.getClients(); 

  }

  statusFilter(status: any){
        console.log(status)
        this.isDeleted=false;
        if(status=="0"){
            this.isDeleted=true;
        }
        this.getClients();

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

  exportClient():void {

    var data = [];
    this.clients.forEach(vehicle => {

       var clientdata=[];

       
       clientdata['Name']=vehicle['ClientName']; 
       clientdata['Agency']=vehicle['AgencyName'];
       clientdata['Producer']=vehicle['ProducerName'];
       clientdata['Policies']=vehicle['Policies'];
       clientdata['PD']=vehicle['PDPolicyCount'];
       clientdata['NT']=vehicle['NTPolicyCount'];
       clientdata['OA']=vehicle['OAPolicyCount'];
       clientdata['PA']=vehicle['PAPolicyCount'];
       

       
       data.push(clientdata);

    });
   this.excelService.exportAsExcelFile(data, 'client');

  }

  getClients() { 

    this.spinner.show();
    var _ClientsOptions = {"PageIndex": 
    this.PageIndex,"PageSize": this.itemsPerPage,"SortBy": this.SortBy,"SortOrder":this.SortOrder,"Filter": {"SearchText": this.SearchText,
    "Deleted": this.isDeleted}}

console.log(_ClientsOptions);
debugger
    this.clientsService.getClients(_ClientsOptions).subscribe((data : any)=>{  

            console.log(data);

            if(data.Result){  
                  this.totalItems=data.Result_value.TotalRecords;
                  this.clients = data.Result_value.SearchResult;
                   this.clients.forEach(obj=> {
                    if(obj.parentClientId != null && obj.parentClientId !=0)
                    {
                        this.confirmParent=obj.parentClientId;
                        this.confirmProducerId=obj.ProducerId;
                        this.confirmuser_emailId=obj.user_emailId;
                        this.confirmAgencyId=obj.AgencyId;
                    };
                   });

                   if(this.confirmParent=this.UserInfo.ModuleId){
                      this.showprnt=true;
                      console.log(this.confirmParent);
                   }


                  
                  this.spinner.hide(); 
 
                                        

                  /*this.chRef.detectChanges();
                  const table: any = $('#clients_table');
                  this.dataTable = table.DataTable({
                      "order": [[ 1, "asc" ]]
                  });*/

              }else{
                  if(data.Error_value.ErrorCode==112){
                        localStorage.removeItem('isLoggedin');            
                        localStorage.removeItem('Token');            
                        localStorage.removeItem('UserDetail');
                        localStorage.removeItem('permissionList');
                        localStorage.removeItem('UserId');
                        this.router.navigate(['/login']);
                   }
                  
              }

      },
      (err : HttpErrorResponse)=>{
              console.log("Some Error occured");
              //this.loading = false;
             // this.alertService.error('You have entered the invalid details.');
      })

           

    }

Sorting(field){
  debugger
      this.SortBy=field;
      if(this.SortOrder==1){
        this.SortOrder=2
      }else{
         this.SortOrder=1
      }
      this.getClients();
      //SortOrder: number = 2;

   }
           

  onDelete(id){

        var ans = confirm("Are you sure you want change this client to Not Active?");  
        if (ans) {  

            this.clientsService.deleteClient(id).subscribe((data : any)=>{  
                    console.log(data)
                        if(data.Result){ 
                            this.PageIndex=1;
                            this.getClients();
                           
                            this.alerts = [
                              {
                                type: 'success',
                                msg: `Client deleted successfully.`
                              }
                            ]
                          this.alerts.map((alert: any) => ({
                            type: 'sucess',
                            msg: alert.msg
                          }));  
                        }else{
                            if(data.Error_value.ErrorCode==112){
                                localStorage.removeItem('isLoggedin');            
                                localStorage.removeItem('Token');            
                                localStorage.removeItem('UserDetail');
                                localStorage.removeItem('permissionList');
                                localStorage.removeItem('UserId');
                                this.router.navigate(['/login']);
                           }
                            
                        }
                },
                (err : HttpErrorResponse)=>{
                        console.log(err)
                        this.loading = false;
                        //this.alertService.error('You have entered the invalid details.');
                })  

        }  
      
  }

  onRestore(id){

         var ans = confirm("Do you want to restore this client"); 
        if (ans) {  

            this.clientsService.deleteClient(id).subscribe((data : any)=>{  
                    console.log(data)
                        if(data.Result){ 
                            this.PageIndex=1;
                            this.getClients();
                            
                            this.alerts = [
                              {
                                type: 'success',
                                msg: `Client restored successfully.`
                              }
                            ]
                          this.alerts.map((alert: any) => ({
                            type: 'sucess',
                            msg: alert.msg
                          }));  
                        }else{
                            if(data.Error_value.ErrorCode==112){
                                localStorage.removeItem('isLoggedin');            
                                localStorage.removeItem('Token');            
                                localStorage.removeItem('UserDetail');
                                localStorage.removeItem('permissionList');
                                localStorage.removeItem('UserId');
                                this.router.navigate(['/login']);
                           }
                            
                        }
                },
                (err : HttpErrorResponse)=>{
                        console.log(err)
                        this.loading = false;
                        //this.alertService.error('You have entered the invalid details.');
                })  

        }  
      
  }
  
  onClientsSave(){
    debugger;
      this.isSubmitted = true;

      if(this.showprnt==true)
      {
      if(this.UserInfo.Module==3)
        {
        this.register.value.parentClientId=this.confirmParent;
        this.register.value.ProducerId=this.confirmProducerId
        this.register.value.user_emailId=this.confirmuser_emailId
        this.register.value.AgencyId= this.confirmAgencyId;
  
        console.log(this.register.value);
        }
      }

      if(this.UserInfo.Module!=3)
      {
        if(!this.register.valid)
        return;
        var _agaencyInfo=this.register.value;
       
        if(this.UserInfo.Module!=1)
        {
            _agaencyInfo.AgencyId=this.UserInfo.ModuleId;
        }

      }
      this.loading = true;
      

    

    console.log(this.register.value);


      this.clientsService.saveClients(this.register.value).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    this.modalRef.hide()
                    this.register.reset();  
                    this.getClients();
                    this.alerts = [
                      {
                        type: 'success',
                        msg: `Client saved Successfully.`
                      }
                    ]
                  this.alerts.map((alert: any) => ({
                    type: 'sucess',
                    msg: alert.msg
                  }));  

                    
                }else{
                    this.loading = false;
                    if(data.Error_value.ErrorCode==112){
                                localStorage.removeItem('isLoggedin');            
                                localStorage.removeItem('Token');            
                                localStorage.removeItem('UserDetail');
                                localStorage.removeItem('permissionList');
                                localStorage.removeItem('UserId');
                                this.router.navigate(['/login']);
                           }
                    
                }
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })


      //console.log(this.register.get('Email').value);



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

    //---prashant  --//
    get user_emailId() { 
      return this.register.get('user_emailId');
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
    get parentClientId(){
      return this.register.get('parentClientId');
    }

    
    
    
    

  ngOnInit() {

    this.getAgencies();
    this.getClients();

    this.register = this.frmBuilder.group({

           ClientName:["", [Validators.required]],
           AgencyId:["", [Validators.required]],
           parentClientId:[""],
           user_emailId:[""],
           Address1:[""],
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


        });

      


         
       

  }

  openModal(template: TemplateRef<any>,id) {


    this.getVehicleMasterDetails();

    if(this.UserInfo.Module!=1){
          const AgencyId = this.register.get('AgencyId');
          AgencyId.clearValidators();
         //
         //AgencyId.setValue(this.UserInfo.ModuleId);
    }
   

     this.title = "Add New"; 
     this.getStates();
     this.getAgencies();
     this.register.reset(); 
     this.isSubmitted = false;
     this.modalRef = this.modalService.show(template,this.config);
  }

  /*open(content,id) {
        this.title = "Add New"; 
        if(id){
            this.title = "Edit";
            this.getClient(id);
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
