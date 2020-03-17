import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { ContractsService} from '../../shared/services/contracts.service';
import { CommonService} from '../../shared/services/common.service';
import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';
import { RolesService} from '../../shared/services/roles.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';





@Component({
    selector: 'app-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss'],
    animations: [routerTransition()]
})


export class ContractsComponent implements OnInit {

	// Our array of contracts
  contracts: any[];
  Citylist: any[];
  Statelist: any[];
  dataTable: any;
  closeResult: string;
  search_value: string;
  SearchText: string='';
  InsurerList: any[];
  InsurerKeys :any[];
  isSubmitted: boolean = false;
  isDeleted = false;
  loading: boolean = false;
  register: FormGroup; 
  title: string = "Add New"; 
  modalRef: BsModalRef;
  totalItems: number = 0;
  itemsPerPage: number = 10;
  PageIndex: number = 1;
  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class:'modal-lg'
  };

  alerts: any = []
 
  constructor(private frmBuilder: FormBuilder,private router: Router,private contractsService: ContractsService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private sanitizer: DomSanitizer,private commonService: CommonService,private spinner: NgxSpinnerService, private RolesService: RolesService) {
        
        //this.getContracts(); 

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
      this.getContracts();
  }

 itemsPerPageChange(itemcount: any): void {
      this.itemsPerPage=itemcount;
      this.getContracts();
  }
  
  onFilter(value) {

      this.SearchText= value;    
      this.getContracts(); 

  }

  statusFilter(status: any){
        console.log(status)
        this.isDeleted=false;
        if(status=="0"){
            this.isDeleted=true;
        }
        this.getContracts();

  }

  getContracts() { 

    this.spinner.show()
    var _ContractsOptions = {"PageIndex": 
    this.PageIndex,"PageSize": this.itemsPerPage,"SortBy": "0","SortOrder":2,"Filter": {"SearchText": this.SearchText,
    "Deleted": this.isDeleted}}

    this.contractsService.getContracts(_ContractsOptions).subscribe((data : any)=>{  

            console.log(data);

            if(data.Result){  
                  this.totalItems=data.Result_value.TotalRecords;
                  this.contracts = data.Result_value.SearchResult; 
                  this.spinner.hide()
                  /*this.chRef.detectChanges();
                  const table: any = $('#contracts_table');
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



    getInsurers(){
     this.commonService.getInsurers().subscribe((data : any)=>{  
          //console.log(data)
          this.InsurerList= data.Result_value.SearchResult;
          this.InsurerKeys = Object.keys(this.InsurerList).filter(Number)
          
          
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        }) 

  }  


           

  onDelete(id){

        var ans = confirm("Do you want to delete contract with Id: " + id);  
        if (ans) {  

            this.contractsService.deleteContract(id).subscribe((data : any)=>{  
                    console.log(data)
                        if(data.Result){ 
                            this.getContracts();
                            this.PageIndex=1;
                            this.alerts = [
                              {
                                type: 'success',
                                msg: `Contract deleted successfully.`
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

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  
  onContractsSave(){
      this.isSubmitted = true;
      if(!this.register.valid)
      return;

      this.loading = true;
      var _ContractsModal=this.register.value;
      _ContractsModal.EffectiveDate=this.formatDate(_ContractsModal.EffectiveDate);
      _ContractsModal.ExpirationDate=this.formatDate(_ContractsModal.ExpirationDate);

      this.contractsService.saveContracts(_ContractsModal).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    this.modalRef.hide()
                    this.register.reset();  
                    this.getContracts();
                    this.alerts = [
                      {
                        type: 'success',
                        msg: `Contract saved Successfully.`
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


    get ContractNo() { 
        return this.register.get('ContractNo');
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
    get Comments() { 
        return this.register.get('Comments');
    }
    get BinderPeriod() { 
        return this.register.get('BinderPeriod');
    }
    get TPADelegated() { 
        return this.register.get('TPADelegated');
    } 
    get ClassOfBusiness() { 
        return this.register.get('ClassOfBusiness');
    }
    get ContractId() { 
        return this.register.get('ContractId');
    } 
    get SyndicateName() { 
        return this.register.get('SyndicateName');
    } 
    get Commission() { 
        return this.register.get('Commission');
    } 
    get ClaimsAuthority() { 
        return this.register.get('ClaimsAuthority');
    } 

    

  ngOnInit() {

    
    this.getContracts();
    this.register = this.frmBuilder.group({

           ContractNo:["", [Validators.required]],
           EffectiveDate:["", [Validators.required]],
           ExpirationDate:["", [Validators.required]],
           InsurerId:["", [Validators.required]],
           SyndicateName:[""],
           ClaimsAuthority:[""],
           Commission:[""],
           Comments:[""],
           BinderPeriod:[""],
           TPADelegated:[""],
           ClassOfBusiness:[""],
           ContractId:[""]


        });     
       

  }

  openModal(template: TemplateRef<any>,c_data) {
     this.title = "Add New"; 
     this.getInsurers();
     this.register.reset(); 
     this.isSubmitted = false;
     if(c_data!=0){
        this.title = "Edit";
        var  _ContractModel = { 
              "ContractNo": c_data.ContractNo, 
              "EffectiveDate": new Date(c_data.EffectiveDate),
              "ExpirationDate":new Date(c_data.ExpirationDate),
              'InsurerId':c_data.InsurerId,
              "Comments": c_data.Comments, 
              "BinderPeriod": c_data.BinderPeriod,
              "TPADelegated":c_data.TPADelegated,
              'ClassOfBusiness':c_data.ClassOfBusiness,
              "SyndicateName":c_data.SyndicateName,
              "ClaimsAuthority":c_data.ClaimsAuthority,
              "Commission":c_data.Commission,
              'ContractId':c_data.ContractId

            };         
          this.register.setValue(_ContractModel);
     }
     this.modalRef = this.modalService.show(template,this.config);
  }

  /*open(content,id) {
        this.title = "Add New"; 
        if(id){
            this.title = "Edit";
            this.getContract(id);
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
