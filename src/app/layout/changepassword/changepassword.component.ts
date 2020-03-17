import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,ChangeDetectorRef,TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { UsersService} from '../../shared/services/users.service';
import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.scss'],
    animations: [routerTransition()]
})


export class ChangePasswordComponent implements OnInit {

   
    register: FormGroup;  
    isSubmitted: boolean = false;
    loading: boolean = false; 
    alerts: any = []

  constructor(private frmBuilder: FormBuilder,private router: ActivatedRoute,private http: HttpClient,private userService:UsersService,private spinner: NgxSpinnerService) {
   

   }


   onChangepassword(){

        this.isSubmitted = true;
         if(!this.register.valid)
            return;

      this.loading = true;

      this.userService.changePassword(this.register.get('oldpassword').value,this.register.get('newpassword').value).subscribe((data : any)=>{  
              if(data.Result){    

                    this.loading = false;
                    this.register.reset(); 
                    this.isSubmitted=false;
                    this.alerts = [
                      {
                        type: 'success',
                        msg: 'Your Password changed Successfully'
                      }
                    ]

                    this.alerts.map((alert: any) => ({
                      type: alert.type,
                      msg: alert.msg
                    })); 
                    

                    //console.log(data.Result_value.UserDetail);
                   
                }else{
                    this.loading = false;
                    
                    this.alerts = [
                      {
                        type: 'danger',
                        msg: data.Error_value.ErrorText
                      }
                    ]

                    this.alerts.map((alert: any) => ({
                      type: alert.type,
                      msg: alert.msg
                    })); 

                    //this.alertService.error('You have entered the invalid email.');
                    
                }
        },
        (err : HttpErrorResponse)=>{
                this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })
         
           
    }
   
   get confnewpassword() { 
        return this.register.get('confnewpassword');
    } 

    get newpassword() { 
        return this.register.get('newpassword');
    } 
    get oldpassword() { 
        return this.register.get('oldpassword');
    } 
    ngOnInit() {

      this.register = this.frmBuilder.group({
           oldpassword:["", [Validators.required]],
           newpassword:["", [Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]],
           confnewpassword:["", [Validators.required]]


        });
        
    }
 } 