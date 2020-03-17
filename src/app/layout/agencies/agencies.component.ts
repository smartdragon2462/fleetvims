import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { AgenciesService} from '../../shared/services/agencies.service';
import { CommonService} from '../../shared/services/common.service';
import { RolesService} from '../../shared/services/roles.service';
import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
    selector: 'app-agencies',
    templateUrl: './agencies.component.html',
    styleUrls: ['./agencies.component.scss'],
    animations: [routerTransition()]
})


export class AgenciesComponent implements OnInit {

	// Our array of agencies
  agencies: any[];
  Citylist: any[];
  Statelist: any[];
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
  agencylogo: string;
 
  constructor(private frmBuilder: FormBuilder,private router: Router,private agenciesService: AgenciesService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private sanitizer: DomSanitizer,private commonService: CommonService,private spinner: NgxSpinnerService, public RolesService: RolesService) {
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


  onSelectlogoFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      
      var file=event.target.files[0]
      if (file.type.match('image.*')) {
      //console.log(event.target.files[0]);
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (imagesrc:any) => { // called once readAsDataURL is completed
        
        //console.log(imagesrc);
        this.agencylogo = imagesrc.target.result;

        //
        const AgencyLogoPath = this.register.get('AgencyLogoPath');
        AgencyLogoPath.setValue(imagesrc.target.result);
        //console.log(event);
      
      }
     }else{
        //this.contactregister.nativeElement.reset()
        alert('invalid format!');
     } 
    }
  }

  
  pageChanged(event: any): void {
      this.PageIndex=event.page;
     // console.log(this.PageIndex);
      this.getAgencies();
  }


itemsPerPageChange(itemcount: any): void {
      this.itemsPerPage=itemcount;
      this.getAgencies();
  }

  onFilter(value) {

      this.SearchText= value;    
      this.getAgencies(); 

  }

  statusFilter(status: any){
        console.log(status)
        this.isDeleted=false;
        if(status=="0"){
            this.isDeleted=true;
        }
        this.getAgencies();

  }

  getAgencies() { 

    this.spinner.show()
    var _AgenciesOptions = {"PageIndex": 
    this.PageIndex,"PageSize": this.itemsPerPage,"SortBy": this.SortBy,"SortOrder":this.SortOrder,"Filter": {"SearchText": this.SearchText,
    "Deleted": this.isDeleted}}

    this.agenciesService.getAgencies(_AgenciesOptions).subscribe((data : any)=>{  

            console.log(data);

            if(data.Result){  
                  this.totalItems=data.Result_value.TotalRecords;
                  this.agencies = data.Result_value.SearchResult; 
                  /*this.chRef.detectChanges();
                  const table: any = $('#agencies_table');
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
              this.spinner.hide()

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
      this.getAgencies();
      //SortOrder: number = 2;

   }        

  onDelete(id){

        var ans = confirm("Do you want to delete agency with Id: " + id);  
        if (ans) {  

            this.agenciesService.deleteAgency(id).subscribe((data : any)=>{  
                    console.log(data)
                        if(data.Result){ 
                            this.getAgencies();
                            this.PageIndex=1;
                            this.alerts = [
                              {
                                type: 'success',
                                msg: `Agency deleted successfully.`
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

  onAgencyReport(id){
     this.spinner.show()
    this.agenciesService.getAgencyClientReport(this.UserInfo.UserId,id).subscribe((data : any)=>{  
              //console.log(data)

              var mediaType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
              var blob = new Blob([data], {type: mediaType});
              var filename = "AgencyReport.xlsx";
              this.spinner.hide()
              importedSaveAs(blob, filename);


              // if(data.Result){    
              //       this.loading = false;
              //       this.modalRef.hide()
              //       this.register.reset();  
              //       this.getAgencies();
              //       this.alerts = [
              //         {
              //           type: 'success',
              //           msg: `Agency saved Successfully.`
              //         }
              //       ]
              //     this.alerts.map((alert: any) => ({
              //       type: 'sucess',
              //       msg: alert.msg
              //     }));  

                    
              //   }else{

              //       if(data.Error_value.ErrorCode==112){
              //           localStorage.removeItem('isLoggedin');            
              //           localStorage.removeItem('Token');            
              //           localStorage.removeItem('UserDetail');
              //           localStorage.removeItem('permissionList');
              //           localStorage.removeItem('UserId');
              //           this.router.navigate(['/login']);
              //       }
              //       this.loading = false;
              //       //this.alertService.error('You have entered the invalid details.');
                    
              //   }
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })


  }
  
  onAgenciesSave(){
console.log(this.register.valid);

      this.isSubmitted = true;
      if(!this.register.valid)
      return;

      this.loading = true;
      this.agenciesService.saveAgencies(this.register.value).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    this.modalRef.hide()
                    this.register.reset();  
                    this.getAgencies();
                    this.alerts = [
                      {
                        type: 'success',
                        msg: `Agency saved Successfully.`
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


    get Email() { 
        return this.register.get('Email');
    } 
    get AgencyName() { 
        return this.register.get('AgencyName');
    }
    get Phone() { 
        return this.register.get('Phone');
    }
    get AgencyId() { 
        return this.register.get('AgencyId');
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
    get AgencyLogoPath() { 
        return this.register.get('AgencyLogoPath');
    }


    

  ngOnInit() {

    
    this.getAgencies();
    this.register = this.frmBuilder.group({
           AgencyName:["", [Validators.required]],
           Address1:["", [Validators.required]],
           Address2:[""],
           StateId:["", [Validators.required]],
           CityId:["", [Validators.required]],
           Zip:["", [Validators.required]],
           //Phone:["", [Validators.required,Validators.pattern('^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$')]],
           Phone:[""],
           AgencyId:[""],
           AgencyLogoPath:[""],
           Email :[""]



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
            this.getAgency(id);
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
