import { HttpClientModule,HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http'
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
    selector: 'app-clientreports',
    templateUrl: './clientreports.component.html',
    styleUrls: ['./clientreports.component.scss'],
    animations: [routerTransition()]
})


export class ClientReportsComponent implements OnInit {

	// Our array of clientreports
  totalItems: number = 0;
  itemsPerPage: number = 10;
  PageIndex: number = 1;
  id: number;
  alerts: any = []
  PDReportPolicySummary: any[];
  NTReportPolicySummary: any[];
  OAReportPolicySummary: any[];
  PAReportPolicySummary: any[];
  ALReportPolicySummary: any[];
  reports: any[];
  client: any[];
  isDeleted = false;
  SearchText: string='';
  ClientName: string='';
  private headers: HttpHeaders;

  constructor(private frmBuilder: FormBuilder,private router: ActivatedRoute,private ClientsService: ClientsService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private commonService:CommonService,private spinner: NgxSpinnerService) {

       if (this.router.snapshot.params["id"]) {  
            this.id = this.router.snapshot.params["id"];  
            this.ClientName= this.router.snapshot.params["cname"];

        }  
        

   }

 getSum(column,reportType) : number {
    let sum = 0;

    if(reportType=='PD' && this.PDReportPolicySummary){
        for(let i = 0; i < this.PDReportPolicySummary.length; i++) {
          sum += this.PDReportPolicySummary[i][column];
      }

    }
    else if(reportType=='NT' && this.NTReportPolicySummary){
        for(let i = 0; i < this.NTReportPolicySummary.length; i++) {
          sum += this.NTReportPolicySummary[i][column];
      }

    }
    else if(reportType=='OA' && this.OAReportPolicySummary){
        for(let i = 0; i < this.OAReportPolicySummary.length; i++) {
          sum += this.OAReportPolicySummary[i][column];
      }

    }
    else if(reportType=='PA' && this.PAReportPolicySummary){
        for(let i = 0; i < this.PAReportPolicySummary.length; i++) {
          sum += this.PAReportPolicySummary[i][column];
      }

    }else if(reportType=='AL' && this.ALReportPolicySummary){
        for(let i = 0; i < this.ALReportPolicySummary.length; i++) {
          sum += this.ALReportPolicySummary[i][column];
      }

    }

    return sum;
  }
  getAverage(column,reportType) : number {
    let sum = 0;
    let i=0;

    if(reportType=='PD' && this.PDReportPolicySummary){
        for(i = 0; i < this.PDReportPolicySummary.length; i++) {
          sum += this.PDReportPolicySummary[i][column];
      }

    }
    else if(reportType=='NT' && this.NTReportPolicySummary){
        for(i = 0; i < this.NTReportPolicySummary.length; i++) {
          sum += this.NTReportPolicySummary[i][column];
      }

    }
    else if(reportType=='OA' && this.OAReportPolicySummary){
        for(i = 0; i < this.OAReportPolicySummary.length; i++) {
          sum += this.OAReportPolicySummary[i][column];
      }

    }
    else if(reportType=='PA' && this.PAReportPolicySummary){
        for(i = 0; i < this.PAReportPolicySummary.length; i++) {
          sum += this.PAReportPolicySummary[i][column];
      }

    }else if(reportType=='AL' && this.ALReportPolicySummary){
        for(i = 0; i < this.ALReportPolicySummary.length; i++) {
          sum += this.ALReportPolicySummary[i][column];
      }

    }
    return sum/i;
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

  RegenerateReprt(id){

    
    this.commonService.regenerateReprt(id).subscribe((data : any)=>{  

            this.getClientReport(this.id);
            var mediaType = 'application/pdf';
            var blob = new Blob([data], {type: mediaType});
            var filename = 'Client_Report.pdf';
            importedSaveAs(blob, filename);

      },
      (err : HttpErrorResponse)=>{
               console.log(err)
              //this.loading = false;
             // this.alertService.error('You have entered the invalid details.');
      })


  }

  downloadReport(){
      
      this.headers = new HttpHeaders();
      this. headers.set('Accept', 'application/pdf');
      var url='http://transureapi.ciads.in/Invoices/Report_Legacy_Active_Vehicles_PD_Mahindra_2018-08-03.pdf';
      
      return this.http.get(url, { headers: this.headers, responseType: 'blob' });
  }

  getClientReport(id) { 

    this.spinner.show();
    var _ClientsOptions = {"ClientId":id,"SearchText": this.SearchText}
    this.ClientsService.getClientReport(_ClientsOptions).subscribe((data : any)=>{  

            console.log(data);

            if(data.Result){  
                  this.totalItems=data.Result_value.TotalRecords;
                  //console.log(data.Result_value.PDReportPolicySummary);
                  if(data.Result_value.PDReportPolicySummary){                    
                    this.PDReportPolicySummary=data.Result_value.PDReportPolicySummary;
                    var aa=this.PDReportPolicySummary.length;
                   var count=0;
                   this.PDReportPolicySummary.forEach(function (value) {
                    count =count+ 1; 
                      if(count==aa)
                        {
                          value.R_Status=true;
                        }
                     });
                  }
                  if(data.Result_value.NTReportPolicySummary){
                    this.NTReportPolicySummary=data.Result_value.NTReportPolicySummary

                    var aa=this.NTReportPolicySummary.length;
                    var count=0;
                    this.NTReportPolicySummary.forEach(function (value) {
                     count =count+ 1; 
                       if(count==aa)
                         {
                           value.R_Status=true;
                         }
                      });

                  }
                  if(data.Result_value.OAReportPolicySummary){
                    this.OAReportPolicySummary=data.Result_value.OAReportPolicySummary

                    var aa=this.OAReportPolicySummary.length;
                    var count=0;
                    this.OAReportPolicySummary.forEach(function (value) {
                     count =count+ 1; 
                       if(count==aa)
                         {
                           value.R_Status=true;
                         }
                      });
                  }
                  if(data.Result_value.PAReportPolicySummary){
                    this.PAReportPolicySummary=data.Result_value.PAReportPolicySummary

                    var aa=this.PAReportPolicySummary.length;
                    var count=0;
                    this.PAReportPolicySummary.forEach(function (value) {
                     count =count+ 1; 
                       if(count==aa)
                         {
                           value.R_Status=true;
                         }
                      });
                  }
                  if(data.Result_value.ALReportPolicySummary){
                    this.ALReportPolicySummary=data.Result_value.ALReportPolicySummary

                    var aa=this.ALReportPolicySummary.length;
                    var count=0;
                    this.ALReportPolicySummary.forEach(function (value) {
                     count =count+ 1; 
                       if(count==aa)
                         {
                           value.R_Status=true;
                         }
                      });
                  }

                 // this.reports = data.Result_value.SearchResult;

                  this.spinner.hide(); 
                  

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

  pageChanged(event: any): void {
      this.PageIndex=event.page;
     // console.log(this.PageIndex);
      this.getClientReport(this.id);
  }    

  ngOnInit() {
      if (this.id > 0) {  
          this.getClientInfo()
          this.getClientReport(this.id);

      }
  }
 } 