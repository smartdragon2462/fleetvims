import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { InsurersService} from '../../shared/services/insurers.service';
import { CommonService} from '../../shared/services/common.service';
import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';
import { RolesService} from '../../shared/services/roles.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';





@Component({
    selector: 'app-insurers',
    templateUrl: './insurers.component.html',
    styleUrls: ['./insurers.component.scss'],
    animations: [routerTransition()]
})


export class InsurersComponent implements OnInit {

	// Our array of insurers
  insurers: any[];
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
  SortBy: number = 0;
  SortOrder: number = 2;
  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class:'modal-lg'
  };

  alerts: any = []
 

  UserInfo: any;

  constructor(private frmBuilder: FormBuilder,private router: Router,private insurersService: InsurersService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private sanitizer: DomSanitizer,private commonService: CommonService,private spinner: NgxSpinnerService, public RolesService: RolesService) {
        
        //this.getInsurers(); 


        this.UserInfo=JSON.parse(localStorage.getItem('UserDetail'))


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
      this.getInsurers();
  }

  itemsPerPageChange(itemcount: any): void {
      this.itemsPerPage=itemcount;
      this.getInsurers();
  }
  onFilter(value) {

      this.SearchText= value;    
      this.getInsurers(); 

  }

  statusFilter(status: any){
        console.log(status)
        this.isDeleted=false;
        if(status=="0"){
            this.isDeleted=true;
        }
        this.getInsurers();

  }

  getInsurers() { 

    this.spinner.show()
    var _InsurersOptions = {"PageIndex": 
    this.PageIndex,"PageSize": this.itemsPerPage,"SortBy": this.SortBy,"SortOrder":this.SortOrder,"Filter": {"SearchText": this.SearchText,
    "Deleted": this.isDeleted}}

    this.insurersService.getInsurers(_InsurersOptions).subscribe((data : any)=>{  

            console.log(data);

            if(data.Result){  
                  this.totalItems=data.Result_value.TotalRecords;
                  this.insurers = data.Result_value.SearchResult; 
                  this.spinner.hide()
                  /*this.chRef.detectChanges();
                  const table: any = $('#insurers_table');
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


  Sorting(field){
      this.SortBy=field;
      if(this.SortOrder==1){
        this.SortOrder=2
      }else{
         this.SortOrder=1
      }
      this.getInsurers();
      //SortOrder: number = 2;

   }         

  onDelete(id){

        var ans = confirm("Do you want to delete insurer with Id: " + id);  
        if (ans) {  

            this.insurersService.deleteInsurer(id).subscribe((data : any)=>{  
                    console.log(data)
                        if(data.Result){ 
                            this.getInsurers();
                            this.PageIndex=1;
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
      
  }
  
  onInsurersSave(){
      this.isSubmitted = true;
      if(!this.register.valid)
      return;

      this.loading = true;
      this.insurersService.saveInsurers(this.register.value).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    this.modalRef.hide()
                    this.register.reset();  
                    this.getInsurers();
                    this.alerts = [
                      {
                        type: 'success',
                        msg: `Insurer saved Successfully.`
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


    get Email() { 
        return this.register.get('Email');
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
    get CountryId() { 
        return this.register.get('CountryId');
    }
    
    

    

  ngOnInit() {

    
    this.getInsurers();
    this.register = this.frmBuilder.group({

           InsurerName:["", [Validators.required]],
           Address1:[""],
           Address2:[""],
           StateId:[""],
           CityId:[""],
           Zip:[""],
           Phone:["", [Validators.pattern('^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$')]],
           InsurerId:[""]

        });

      


         
       

  }

  openModal(template: TemplateRef<any>,id) {
     this.title = "Add New"; 
     this.getStates();
     this.register.reset(); 
     this.isSubmitted = false;
     this.modalRef = this.modalService.show(template,this.config);
  }

  /*open(content,id) {
        this.title = "Add New"; 
        if(id){
            this.title = "Edit";
            this.getInsurer(id);
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
