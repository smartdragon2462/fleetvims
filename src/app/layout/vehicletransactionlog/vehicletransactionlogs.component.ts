import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { VehiclesService} from '../../shared/services/vehicles.service';
import { ClientsService} from '../../shared/services/clients.service';
import { CommonService} from '../../shared/services/common.service';
import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {saveAs as importedSaveAs} from "file-saver";



@Component({
    selector: 'app-vehicletransactionlogs',
    templateUrl: './vehicletransactionlogs.component.html',
    styleUrls: ['./vehicletransactionlogs.component.scss'],
    animations: [routerTransition()]
})


export class VehicleTransactionLogsComponent implements OnInit {

	// Our array of vehicletransactionlogs
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
  vehicleUnit: string='';
  UserInfo: any;
  search_value: string;
  ClientName: string;
  transactions: any[];
  OldVehicleTransaction={}
  ChnageVehicleTransaction={}
  modalRef: BsModalRef;
  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class:'modal-lg'
  };
  clientid: number=0;
  oldcoveragePolicy:Array<any>=[] ;
  changecoveragePolicy:Array<any>=[] ;


  constructor(private frmBuilder: FormBuilder,private router: ActivatedRoute,private VehiclesService: VehiclesService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private commonService:CommonService,private spinner: NgxSpinnerService,private ClientsService: ClientsService) {

       if (this.router.snapshot.params["id"]) {  
            this.id = this.router.snapshot.params["id"];
            this.getVehicle(this.router.snapshot.params["id"])


        }
        if(this.router.snapshot.params["clientid"]){
           this.clientid  = this.router.snapshot.params["clientid"];
            this.getClient(this.router.snapshot.params["clientid"]);
        }  
        this.UserInfo=JSON.parse(localStorage.getItem('UserDetail'))

   }

   getVehicle(id){

     this.VehiclesService.getVehicleById(id).subscribe((data : any)=>{   
              console.log("Gaurav");
              console.log(data)
              if(data.Result){ 
                  this.vehicleUnit=data.Result_value.Unit;
                  this.getClient(data.Result_value.ClientId);
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

   getClient(id){

    this.ClientsService.getClientById(id).subscribe((data : any)=>{  
              console.log("Gaurav");
              console.log(data)
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
    this.VehiclesService.getVehicleById(this.id).subscribe((data : any)=>{  
            
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
      this.getVehicleTransactionLog(this.id); 

  }

  openModalVehicleTransaction(template: TemplateRef<any>,id) {
        this.spinner.show();
        this.VehiclesService.vehicleTransactionCompare(id).subscribe((data : any)=>{  
            
              if(data.Result){ 
                    this.spinner.hide();

console.log(data.Result_value[0]," old entry");
console.log(data.Result_value[1]," New entry");
                    if(data.Result_value.length>1){
                      this.OldVehicleTransaction=data.Result_value[0];
                      this.oldcoveragePolicy=[];
                      if(data.Result_value[0].Policies){
                        data.Result_value[0].Policies.forEach((policy) => {
                              //console.log(policy);
                              this.oldcoveragePolicy[policy.CoverageType] = this.oldcoveragePolicy[policy.CoverageType] || [];
                              this.oldcoveragePolicy[policy.CoverageType].push({'Id':policy.PolicyId,'Name':policy.PolicyNumber});
                        })
                      }
                      
                      this.ChnageVehicleTransaction=data.Result_value[1];
                      this.changecoveragePolicy=[];
                      if(data.Result_value[1].Policies){
                      data.Result_value[1].Policies.forEach((policy) => {
                              //console.log(policy);
                              this.changecoveragePolicy[policy.CoverageType] = this.changecoveragePolicy[policy.CoverageType] || [];
                              this.changecoveragePolicy[policy.CoverageType].push({'Id':policy.PolicyId,'Name':policy.PolicyNumber});
                        })
                    }

                    }else{
                        this.OldVehicleTransaction=data.Result_value[0];
                        this.oldcoveragePolicy=[];
                        if(data.Result_value[0].Policies){
                        data.Result_value[0].Policies.forEach((policy) => {
                              //console.log(policy);
                              this.oldcoveragePolicy[policy.CoverageType] = this.oldcoveragePolicy[policy.CoverageType] || [];
                              this.oldcoveragePolicy[policy.CoverageType].push({'Id':policy.PolicyId,'Name':policy.PolicyNumber});
                        })
                      }
                       
                        this.ChnageVehicleTransaction={};
                        console.log(this.oldcoveragePolicy);
                         
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
                //this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })

        
   } 


  getVehicleTransactionCertificate(id){
      //alert(id);
      
        this.spinner.show()
        this.VehiclesService.vehicleTransactionCertificate(id).subscribe((data : any)=>{  
                    var mediaType = 'application/pdf';
                    var blob = new Blob([data], {type: mediaType});
                    var filename = 'Transaction_Vehicle_Certificate.pdf';
                    this.spinner.hide()
                    importedSaveAs(blob, filename);
                },
                (err : HttpErrorResponse)=>{
                        //alert("dsadas");
                        this.spinner.hide()
                        console.log(err)

                        //this.loading = false;
                        //this.alertService.error('You have entered the invalid details.');
                })  

         
      
  }

  getVehicleTransactionLog(id){

      var _Transactions = {"PageIndex": 1,"PageSize":8000,"SortBy": "0","SortOrder":2,"Filter": {"SearchText":this.SearchText,
    "Deleted": false,"VehicleId": id}}

    this.VehiclesService.getVehicleTransactionLog(_Transactions).subscribe((data : any)=>{  

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
      this.getVehicleTransactionLog(this.id);
  }    

  ngOnInit() {
      if (this.id > 0) {  
          this.getClientInfo()
          this.getVehicleTransactionLog(this.id);

      }
  }
 } 