import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService} from '../../shared/services/users.service';
import { CommonService} from '../../shared/services/common.service';
import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})


export class UsersComponent implements OnInit {

	// Our array of users
  users: any[];
  transureRoles: any[];
  Citylist: any[];
  Statelist: any[];
  dataTable: any;
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
  itemsPerPage: number = 10;
  PageIndex: number = 1;
  showPassword: boolean = false;
  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class:'modal-lg'
  };

  alerts: any = []
 
  constructor(private frmBuilder: FormBuilder,private router: Router,private usersService: UsersService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private sanitizer: DomSanitizer,private commonService: CommonService,private spinner: NgxSpinnerService) {
        
        //this.getUsers(); 

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

  
  pageChanged(event: any): void {
      this.PageIndex=event.page;
     // console.log(this.PageIndex);
      this.getUsers();
  }


  onFilter(value) {

      this.SearchText= value;    
      this.getUsers(); 

  }

  statusFilter(status: any){
        console.log(status)
        this.isDeleted=false;
        if(status=="0"){
            this.isDeleted=true;
        }
        this.getUsers();

  }

  getUsers() { 

    this.spinner.show()
    var _UsersOptions = {"PageIndex": 
    this.PageIndex,"PageSize": this.itemsPerPage,"SortBy": "0","SortOrder":2,"Filter": {"ModuleType": 1,"SearchText": this.SearchText,
    "Deleted": this.isDeleted}}

    this.usersService.getUsers(_UsersOptions).subscribe((data : any)=>{  

            console.log(data);

            if(data.Result){  
                  this.totalItems=data.Result_value.TotalRecords;
                  this.users = data.Result_value.SearchResult; 
                  this.spinner.hide()
                  /*this.chRef.detectChanges();
                  const table: any = $('#users_table');
                  this.dataTable = table.DataTable({
                      "order": [[ 1, "asc" ]]
                  });*/

              }else{
                  //this.loading = false;
                  //this.alertService.error('You have entered the invalid details.');
                  
              }

      },
      (err : HttpErrorResponse)=>{
              console.log("Some Error occured");
              //this.loading = false;
             // this.alertService.error('You have entered the invalid details.');
      })

           

    }



    getTransureRoles() { 

        this.usersService.getTransureRoles().subscribe((data : any)=>{  

                
                if(data.Result){  
                   
                    this.transureRoles=data.Result_value.SearchResult;

                  }else{
                      //this.loading = false;
                      //this.alertService.error('You have entered the invalid details.');
                      
                  }

          },
          (err : HttpErrorResponse)=>{
                  console.log("Some Error occured");
                 
          })   

    }


           

  onDelete(id){

        var ans = confirm("Do you want to delete user with Id: " + id);  
        if (ans) {  

            this.usersService.deleteUser(id).subscribe((data : any)=>{  
                    console.log(data)
                        if(data.Result){ 
                            this.getUsers();
                            this.PageIndex=1;
                            this.alerts = [
                              {
                                type: 'success',
                                msg: `User deleted successfully.`
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
  
  onUsersSave(){
      this.isSubmitted = true;
      if(!this.register.valid)
      return;

      this.loading = true;
      var _contactInfo=this.register.value;
      _contactInfo.Module=1
      _contactInfo.ModuleId=localStorage.getItem('UserId');
      this.usersService.saveUsers(_contactInfo).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    this.modalRef.hide()
                    this.register.reset();  
                    this.getUsers();
                    this.alerts = [
                      {
                        type: 'success',
                        msg: `User saved Successfully.`
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

    
    get ContactFirstName() { 
        return this.register.get('ContactFirstName');
    }
    get ContactLastName() { 
        return this.register.get('ContactLastName');
    }
    get ContactEmail() { 
        return this.register.get('ContactEmail');
    } 
    get RoleId() { 
        return this.register.get('RoleId');
    } 

    get ContactAddress1() { 
        return this.register.get('ContactAddress1');
    }
    get ContactAddress2() { 
        return this.register.get('ContactAddress2');
    }
    
    get Password() { 
        return this.register.get('Password');
    }
    get PortalAccess() { 
        return this.register.get('PortalAccess');
    }
    
    get Phone() { 
        return this.register.get('Phone');
    }
    
    
    get ContactCityId() { 
        return this.register.get('ContactCityId');
    } 
    get ContactStateId() { 
        return this.register.get('ContactStateId');
    }
    get ContactZip() { 
        return this.register.get('ContactZip');
    } 
    get ContactPhone() { 
        return this.register.get('ContactPhone');
    }
    get ContactId() { 
        return this.register.get('ContactId');
    }

    get ReportMonthlySummary() { 
        return this.register.get('ReportMonthlySummary');
    }
     get ReportCertificates() { 
        return this.register.get('ReportCertificates');
    }
    
    

   showPasswordField(){ 

   this.showPassword = !this.showPassword;
   const password = this.register.get('Password');
   if(this.title=="Add New" && this.showPassword){ 
      //alert("ddd"); 
      password.setValidators([Validators.required]);
   }else{
      password.clearValidators();
   }
   password.updateValueAndValidity();

}

 

  ngOnInit() {

    
    this.getUsers();

    this.register = this.frmBuilder.group({ 
           ContactFirstName:["", [Validators.required]],
           ContactLastName:["", [Validators.required]],
           ContactEmail:["", [Validators.required,EmailValidator]],
           ContactAddress1:["", [Validators.required]],
           ContactAddress2:[""],
           PortalAccess:[""], 
           Password:[""], 
           RoleId:["", [Validators.required]],
           ContactStateId:["", [Validators.required]],
           ContactCityId:["", [Validators.required]],
           ContactZip:["", [Validators.required]],
           ContactPhone:["", [Validators.required,Validators.pattern('^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$')]],
           ContactId:[""],
           ReportMonthlySummary:[""],
           ReportCertificates:[""]

      });


      


         
       

  }

  openModal(template: TemplateRef<any>,c_data) {
     this.title = "Add New"; 
     this.getStates();
     this.getTransureRoles();
     this.register.reset(); 
     this.isSubmitted = false;
      if(c_data!=0){
          console.log(c_data); 
          console.log(c_data.RoleList[0].RoleId); 
          this.title = "Edit";
          const password = this.register.get('Password');
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
          this.getCities(c_data.StateId);          
          this.register.setValue(_ContactModel);
          
      }
     this.modalRef = this.modalService.show(template,this.config);
  }

  /*open(content,id) {
        this.title = "Add New"; 
        if(id){
            this.title = "Edit";
            this.getUser(id);
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
