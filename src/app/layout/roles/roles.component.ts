import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { RolesService} from '../../shared/services/roles.service';
import { CommonService} from '../../shared/services/common.service';
import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';





@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
    animations: [routerTransition()]
})


export class RolesComponent implements OnInit {

	// Our array of roles
  roles: any[];
  Citylist: any[];
  Statelist: any[];
  modules: any[];
  module_type: any[];
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
  config = {
    backdrop: false,
    ignoreBackdropClick: true,
    class:'modal-lg'
  };

  alerts: any = []
  optionsMapCreate = [];
  optionsMapView = [];
  optionsMapDelete = [];
  optionsMap = [];
 
 
  constructor(private frmBuilder: FormBuilder,private router: Router,private rolesService: RolesService,private http: HttpClient, private chRef: ChangeDetectorRef,private modalService: BsModalService,private sanitizer: DomSanitizer,private commonService: CommonService,private spinner: NgxSpinnerService) {
      

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
      this.getRoles();
  }


  onFilter(value) {

      this.SearchText= value;    
      this.getRoles(); 

  }

  statusFilter(status: any){
        console.log(status)
        this.isDeleted=false;
        if(status=="0"){
            this.isDeleted=true;
        }
        this.getRoles();

  }


  getRoleMaster(){

      this.rolesService.getRoleMaster().subscribe((data : any)=>{  

            console.log(data);
            this.module_type=data.Result_value.TransureModuleList;
            this.modules=data.Result_value.RoleCommandList;
          
          
        },
        (err : HttpErrorResponse)=>{
                console.log(err)
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        }) 

       

  } 


  updateCheckedOptions(type,option, event) {

      //console.log(event);
      //console.log(option);
      if(type=='all'){
        this.optionsMapCreate[option] = event.target.checked
        this.optionsMapView[option] = event.target.checked
        this.optionsMapDelete[option] = event.target.checked 
      }
      if(type=='create'){
        this.optionsMapCreate[option] = event.target.checked    
      }

      if(type=='view'){
        this.optionsMapView[option] = event.target.checked
       
      }

      if(type=='delete'){
        this.optionsMapDelete[option] = event.target.checked 
      }
      //console.log(this.optionsMapCreate);
      if(this.optionsMapDelete[option] || this.optionsMapView[option] || this.optionsMapCreate[option]){

            if(this.optionsMap.indexOf(option)<0){
                this.optionsMap.push(option);
            }
            
      }else{
          
           this.optionsMap.splice(this.optionsMap.indexOf(option), 1 );

      }

      //console.log(this.optionsMap)
      
  }

  getRoles() { 

    this.spinner.show()
    var _RolesOptions = {"PageIndex": 
    this.PageIndex,"PageSize": this.itemsPerPage,"SortBy": "0","SortOrder":2,"Filter": {"SearchText": this.SearchText,
    "Deleted": this.isDeleted}}

    this.rolesService.getRoles(_RolesOptions).subscribe((data : any)=>{  

            console.log(data);

            if(data.Result){  
                  this.totalItems=data.Result_value.TotalRecords;
                  this.roles = data.Result_value.SearchResult; 
                  this.spinner.hide()
                  /*this.chRef.detectChanges();
                  const table: any = $('#roles_table');
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


           

  onDelete(id){

        var ans = confirm("Do you want to delete role with Id: " + id);  
        if (ans) {  

            this.rolesService.deleteRole(id).subscribe((data : any)=>{  
                    console.log(data)
                        if(data.Result){ 
                            this.getRoles();
                            this.PageIndex=1;
                            this.alerts = [
                              {
                                type: 'success',
                                msg: `Role deleted successfully.`
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
  
  onRolesSave(){
      this.isSubmitted = true;
      if(!this.register.valid)
      return;

      this.loading = true;
      var _RoleModal=this.register.value;
      var _PermissionList=[];

      var _optionsMapView=this.optionsMapView;
      var _optionsMapCreate=this.optionsMapCreate;
      var _optionsMapDelete=this.optionsMapDelete;
      

      this.optionsMap.forEach(function(value, key) {
          var innerObj = {};
          console.log(value+"Gaurv"+_optionsMapCreate[value]);
          innerObj["RoleCommandId"]   =  value;
          innerObj["AddEditAccess"]  = _optionsMapCreate[value];
          innerObj["ViewAccess"]     = _optionsMapView[value];
          innerObj["DeleteAccess"]   = _optionsMapDelete[value];
          _PermissionList.push(innerObj);
        
      })

      _RoleModal.PermissionList=_PermissionList;
      this.rolesService.saveRoles(_RoleModal).subscribe((data : any)=>{  
              console.log(data)
              if(data.Result){    
                    this.loading = false;
                    this.modalRef.hide()
                    this.register.reset();  
                    this.getRoles();
                    this.alerts = [
                      {
                        type: 'success',
                        msg: `Role saved Successfully.`
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


    
    get RoleId() { 
        return this.register.get('RoleId');
    } 
    get ModuleId() { 
        return this.register.get('ModuleId');
    }
    get Role() { 
        return this.register.get('Role');
    }
    
    

    

  ngOnInit() {
    
    this.getRoles();
    this.register = this.frmBuilder.group({

           Role:["", [Validators.required]],
           ModuleId:["", [Validators.required]],
           RoleId:[""]

        });
  }

  openModal(template: TemplateRef<any>,r_data) {
     this.title = "Add New"; 
     this.optionsMapCreate=[];
     this.optionsMapView=[];
     this.optionsMapDelete=[];
     this.optionsMap=[];
     this.getRoleMaster();
     this.register.reset(); 
     this.isSubmitted = false;
     if(r_data!=0){
          console.log(r_data); 
          var  _RoleModel = { 
              "Role": r_data.Role,
              "RoleId": r_data.RoleId, 
              "ModuleId": r_data.ModuleId
            };

            // var _optionsMapView=[];
            // var _optionsMapCreate=[];
            // var _optionsMapDelete=[];


            r_data.PermissionList.forEach(permission => {
              
                this.optionsMap.push(permission.RoleCommandId);
                this.optionsMapDelete[permission.RoleCommandId] =permission.DeleteAccess;
                this.optionsMapView[permission.RoleCommandId] =permission.ViewAccess;
                this.optionsMapCreate[permission.RoleCommandId] =permission.AddEditAccess;
              
            });

           //  r_data.PermissionList.forEach(function(value, key) {
           //         this.optionsMap.push(r_data.PermissionList[key].PermissionId);
           //        _optionsMapDelete[r_data.PermissionList[key].PermissionId]=r_data.PermissionList[key].DeleteAccess;
           //        _optionsMapView[r_data.PermissionList[key].PermissionId]=r_data.PermissionList[key].ViewAccess;
           //        _optionsMapCreate[r_data.PermissionList[key].PermissionId]=r_data.PermissionList[key].AddEditAccess;
                  
                    
           //   }) 

           // this.optionsMapDelete =_optionsMapDelete
           // this.optionsMapView=_optionsMapView
           // this.optionsMapCreate=_optionsMapCreate

          this.register.setValue(_RoleModel);  
          console.log(this.optionsMapDelete); 
          this.title = "Edit";

     }     
     this.modalRef = this.modalService.show(template,this.config);
  }

  /*open(content,id) {
        this.title = "Add New"; 
        if(id){
            this.title = "Edit";
            this.getRole(id);
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
