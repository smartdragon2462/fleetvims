import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { ClientsService} from '../../shared/services/clients.service';
import { CommonService} from '../../shared/services/common.service';
import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {saveAs as importedSaveAs} from "file-saver";



@Component({
    selector: 'app-clienttransactionlogs',
    templateUrl: './clienttransactionlogs.component.html',
    styleUrls: ['./clienttransactionlogs.component.scss'],
    animations: [routerTransition()]
})


export class ClientTransactionLogsComponent implements OnInit {

	// Our array of clienttransactionlogs
  totalItems: number = 0;
  itemsPerPage: number = 10;
  PageIndex: number = 1;
  id: number;
  alerts: any = []
  reports: any[];
  client: any[];
  isDeleted = false;
  changePolicy = false;
  SearchText: string='';
  clientUnit: string='';
  UserInfo: any;
  search_value: string;
  ClientName: string;
  transactions: any[];
  OldClientTransaction={}
  ChnageClientTransaction={}
  modalRef: BsModalRef;
  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class:'modal-lg'
  };
  clientid: number=0;
  oldcoveragePolicy:Array<any>=[] ;
  changecoveragePolicy:Array<any>=[] ;


  constructor(private frmBuilder: FormBuilder,private router: ActivatedRoute,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private commonService:CommonService,private spinner: NgxSpinnerService,private ClientsService: ClientsService) {

       if (this.router.snapshot.params["id"]) {  
            this.id = this.router.snapshot.params["id"];
            this.getClient(this.router.snapshot.params["id"])

        }
        this.UserInfo=JSON.parse(localStorage.getItem('UserDetail'))

   }

  //  getClient(id){

  //    this.ClientsService.getClientById(id).subscribe((data : any)=>{   
  //             console.log("Gaurav");
  //             console.log(data)
  //             if(data.Result){ 
  //                 this.ClientName=data.Result_value.ClientName;                       
  //               }else{
  //                   if(data.Error_value.ErrorCode==112){
  //                               localStorage.removeItem('isLoggedin');            
  //                               localStorage.removeItem('Token');            
  //                               localStorage.removeItem('UserDetail');
  //                               localStorage.removeItem('permissionList');
  //                               localStorage.removeItem('UserId');
  //                               //this.route.navigate(['/login']);
  //                          }
  //                   //this.loading = false;
  //                   //this.alertService.error('You have entered the invalid details.');
                    
  //               }
  //       },
  //       (err : HttpErrorResponse)=>{
  //               console.log(err)
  //               //this.loading = false;
  //               //this.alertService.error('You have entered the invalid details.');
  //       })
        
  
  // } 

   getClient(id){

    this.ClientsService.getClientById(id).subscribe((data : any)=>{  
              
              if(data.Result){ 
                  this.ClientName=data.Result_value.ClientName;                 
                }else{
                    if(data.Error_value.ErrorCode==112){
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
        (err : HttpErrorResponse)=>{
                console.log(err)
                //this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })
        
  
  } 

   getClientInfo(){
    this.ClientsService.getClientById(this.id).subscribe((data : any)=>{  
            
              if(data.Result){ 

                    this.client=data.Result_value;
                    console.log(this.client);
                  
                }else{
                    
                    
                }
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                //this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })
        
  
  } 

  onFilter(value) {

      this.SearchText= value;    
      this.getClientTransactionLog(this.id); 

  }

  openModalClientTransaction(template: TemplateRef<any>,id) {
        this.spinner.show();
        this.ClientsService.clientTransactionCompare(id).subscribe((data : any)=>{  
            
              if(data.Result){ 
                    this.spinner.hide();
                    if(data.Result_value.length>1){
                      this.OldClientTransaction=data.Result_value[0];
                      this.ChnageClientTransaction=data.Result_value[1];
                      
                    }else{
                        this.OldClientTransaction=data.Result_value[0];
                        this.ChnageClientTransaction={};
                       
                         
                    }

                    if(JSON.stringify(this.oldcoveragePolicy[1])!=JSON.stringify(this.changecoveragePolicy[1])){
                            this.changePolicy=true;
                    }else if(JSON.stringify(this.oldcoveragePolicy[2])!=JSON.stringify(this.changecoveragePolicy[2])){
                            this.changePolicy=true;
                     }else if(JSON.stringify(this.oldcoveragePolicy[3])!=JSON.stringify(this.changecoveragePolicy[3])){
                            this.changePolicy=true;
                     }else if(JSON.stringify(this.oldcoveragePolicy[4])!=JSON.stringify(this.changecoveragePolicy[4])){
                            this.changePolicy=true;
                     }
                    
                    this.modalRef = this.modalService.show(template,this.config);
                   // this.client=data.Result_value;
                    console.log(data.Result_value);
                  
                }else{
                    
                    
                }
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.modalRef = this.modalService.show(template,this.config);
                this.spinner.hide()
                //this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })

        
   } 


  getClientTransactionCertificate(id){
       

         
      
  }

  getClientTransactionLog(id){

      var _Transactions = {"PageIndex": 1,"PageSize":8000,"SortBy": "3","SortOrder":2,"Filter": {"SearchText":this.SearchText,
    "Deleted": true,"ClientId": id}}

    this.ClientsService.getClientTransactionLog(_Transactions).subscribe((data : any)=>{  

            console.log(data);

            if(data.Result){  
                
                  this.transactions = data.Result_value.SearchResult; 

                  /*this.chRef.detectChanges();
                  const table: any = $('#policies_table');
                  this.dataTable = table.DataTable({
                      "order": [[ 1, "asc" ]]
                  });*/

              }else{

                
                  
              }
              this.spinner.hide()

      },
      (err : HttpErrorResponse)=>{
              console.log("Some Error occured");

              //this.loading = false;
             // this.alertService.error('You have entered the invalid details.');
      })


  }

         

  pageChanged(event: any): void {
      this.PageIndex=event.page;
     // console.log(this.PageIndex);
      this.getClientTransactionLog(this.id);
  }    

  ngOnInit() {
      if (this.id > 0) {  
          //this.getClientInfo()
          this.getClientTransactionLog(this.id);

      }
  }
 } 