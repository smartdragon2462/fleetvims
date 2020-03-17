import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { PoliciesService} from '../../shared/services/policies.service';
import { CommonService} from '../../shared/services/common.service';

import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {saveAs as importedSaveAs} from "file-saver";




@Component({
    selector: 'app-policyreports',
    templateUrl: './policyreports.component.html',
    styleUrls: ['./policyreports.component.scss'],
    animations: [routerTransition()]
})


export class PolicyReportsComponent implements OnInit {

	// Our array of policyreports
  totalItems: number = 0;
  itemsPerPage: number = 10;
  PageIndex: number = 1;
  id: number;
  alerts: any = []
  reports: any[];
  client: any[];
  isDeleted = false;
  SearchText: string='';

  constructor(private frmBuilder: FormBuilder,private router: ActivatedRoute,private PoliciesService: PoliciesService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private commonService:CommonService,private spinner: NgxSpinnerService) {

       if (this.router.snapshot.params["id"]) {  
            this.id = this.router.snapshot.params["id"];  

        }  
        

   }

   getClientInfo(){
    this.PoliciesService.getPolicyById(this.id).subscribe((data : any)=>{  
            
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

            this.getPolicyReport(this.id);
            var mediaType = 'application/pdf';
            var blob = new Blob([data], {type: mediaType});
            var filename = 'Policy_Report.pdf';
            importedSaveAs(blob, filename);

      },
      (err : HttpErrorResponse)=>{
               console.log(err)
              //this.loading = false;
             // this.alertService.error('You have entered the invalid details.');
      })


  }

   getPolicyReport(id) { 

    this.spinner.show();
    var _ClientsOptions = {"PolicyId":parseInt(id)}

    // var _ClientsOptions = {"PageIndex": 
    // this.PageIndex,"PageSize": this.itemsPerPage,"SortBy": "0","SortOrder":2,"Filter": {"PolicyId":parseInt(id),"SearchText": this.SearchText,
    // "Deleted": this.isDeleted,"ClientId":parseInt(id)}}

    this.PoliciesService.getPolicyReport(_ClientsOptions).subscribe((data : any)=>{  

            console.log(data);

            if(data.Result){  
                  //this.totalItems=data.Result_value.TotalRecords;
                  if(data.Result_value.PDReportPolicySummary){
                    this.reports = data.Result_value.PDReportPolicySummary
                  }else if(data.Result_value.NTReportPolicySummary){
                    this.reports = data.Result_value.NTReportPolicySummary
                  }else if(data.Result_value.OAReportPolicySummary){
                    this.reports = data.Result_value.OAReportPolicySummary
                  }else if(data.Result_value.PAReportPolicySummary){
                    this.reports = data.Result_value.PAReportPolicySummary
                  }  
                  
                 this.spinner.hide(); 
                  

              }else{
                  this.spinner.hide();
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
      this.getPolicyReport(this.id);
  }    

  ngOnInit() {
      if (this.id > 0) {  
          //this.getClientInfo()
          this.getPolicyReport(this.id);

      }
  }
 } 