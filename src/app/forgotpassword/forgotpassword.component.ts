import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import {LoginService} from '../shared/services/login.service';
//import { AlertService} from '../shared/services/alert.service';
import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['./forgotpassword.component.scss'],
    animations: [routerTransition()]
})
export class ForgotpasswordComponent implements OnInit {
	
    register: FormGroup;  
    isSubmitted: boolean = false;
    loading: boolean = false; 
    sentRecoverylink: boolean = false; 
    alerts: any = []
 

    constructor(private frmBuilder: FormBuilder,private router: Router,private loginService: LoginService) { }

   
    ngOnInit() {

        this.register = this.frmBuilder.group({
           email:["", [Validators.required,EmailValidator]]

        });
    	
      // console.log(this.loginService.userLogin());

    }

    

    
    get email() { 
        return this.register.get('email');
    } 
    
    resndRecoveryLink(){
         this.sentRecoverylink=false;
         this.alerts=[];

    }

    onForgotpassword(){
          // console.log("MMMMM"); 
           this.isSubmitted = true;
           if(!this.register.valid)
              return;

      this.loading = true;
      var email=this.register.get('email').value;
      this.loginService.userForgotPassword(this.register.get('email').value).subscribe((data : any)=>{  
              if(data.Result){     
                    this.isSubmitted = false;
                    this.loading = false;
                    this.register.reset(); 
                    this.sentRecoverylink=true;
                    this.alerts = [
                      {
                        type: 'success',
                        msg: 'We sent a recovery link to your email address <br><br><b>'+email+"</b>"
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
                
        //localStorage.setItem('isLoggedin', 'true');
        //this.router.navigate(['/dashboard']);
         
           
    }
    
}
