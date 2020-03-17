import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import {LoginService} from '../shared/services/login.service';
//import { AlertService} from '../shared/services/alert.service';
import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './newpassword.component.html',
    styleUrls: ['./newpassword.component.scss'],
    animations: [routerTransition()]
})
export class NewpasswordComponent implements OnInit {
	
    
    token: string;
    register: FormGroup;  
    isSubmitted: boolean = false;
    loading: boolean = false; 
    tokenVerified: boolean = false; 
    alerts: any = []
 

  
   constructor(private frmBuilder: FormBuilder,private Router: Router,private router: ActivatedRoute,private loginService: LoginService) {

        if (this.router.snapshot.params["token"]) {  
            this.token = this.router.snapshot.params["token"];

            this.loginService.verifyResetPasswordToken(this.token).subscribe((data : any)=>{  
              if(data.Result){     
                    this.tokenVerified=true
                    //alert("Test");
                    //console.log(data.Result_value.UserDetail);
                   
                }else{
                    //this.loading = false;

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

        }else{
            
            this.Router.navigate(['/login']);
        }

    }

   
    ngOnInit() {

        this.register = this.frmBuilder.group({
           newpassword:["", [Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]],
           confnewpassword:["", [Validators.required]]
        });
    	
      // console.log(this.loginService.userLogin());

    }

    

   

    get confnewpassword() { 
        return this.register.get('confnewpassword');
    } 

    get newpassword() { 
        return this.register.get('newpassword');
    } 
    

    onNewpassword(){

        this.isSubmitted = true;
         if(!this.register.valid)
            return;

      this.loading = true;

      this.loginService.resetPassword(this.token,this.register.get('newpassword').value).subscribe((data : any)=>{  
              if(data.Result){     
                    this.loading = false;
                    this.register.reset(); 
                    this.isSubmitted=false;
                    this.tokenVerified=false
                    this.alerts = [
                      {
                        type: 'success',
                        msg: 'Your Password Reset Successfully'
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
    
}
