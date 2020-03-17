import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'
import {LoginService} from '../shared/services/login.service';
import { AlertService} from '../shared/services/alert.service';
import { FormGroup, FormBuilder, Validators,EmailValidator } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
	
    register: FormGroup;  
    isSubmitted: boolean = false;
    loading: boolean = false;
    //isDesktopDevice : string;
    deviceInfo = null;

    constructor(private frmBuilder: FormBuilder,private router: Router,private loginService: LoginService,
        private alertService: AlertService,private deviceService: DeviceDetectorService) { 
         this.deviceInfo = this.deviceService.getDeviceInfo();
         console.log(this.deviceInfo);

    }

   
    ngOnInit() {
        this.register = this.frmBuilder.group({
           email:["", [Validators.required,EmailValidator]],
           password:["", [Validators.required]],
           remember:[""]

        });   

    }

    

    
    get email() { 
        return this.register.get('email');
    } 
    get password() { 
        return this.register.get('password');
    }
    get remember() { 
        return this.register.get('remember');
    }

    



    onLoggedin(){
           this.isSubmitted = true;
           if(!this.register.valid)
              return;

        this.loading = true;
        var ts = Math.round((new Date()).getTime() / 1000);
        const DeviceId= this.deviceInfo.browser+"_"+this.deviceInfo.browser_version+"_"+this.deviceInfo.os_version+"_"+this.register.get('email').value+"_"+ts;
        var _UserLoginModel = { "Email": this.register.get('email').value, "Password": this.register.get('password').value,'DeviceId':DeviceId}


        this.loginService.userLogin(_UserLoginModel).subscribe((data : any)=>{  
              if(data.Result){    
                    
                    console.log(data.Result_value.UserDetail);
                    var permissionList={};
                    //if(data.Result_value.UserDetail.Permissions){
                        data.Result_value.UserDetail.Permissions.forEach(permission => {
                            permissionList[permission.RoleCommandName]={'RoleCommandId':permission.RoleCommandId,'DeleteAccess':permission.DeleteAccess,'ViewAccess':permission.ViewAccess,'AddEditAccess':permission.AddEditAccess};
                        
                        });    
                    //}    
                    
                    

                     
                     localStorage.setItem('DeviceId',DeviceId);
                     localStorage.setItem('isLoggedin', 'true');
                     localStorage.setItem('Token',data.Result_value.AuthenticationToken);
                     localStorage.setItem('UserDetail',JSON.stringify(data.Result_value.UserDetail));
                     localStorage.setItem('permissionList',JSON.stringify(permissionList));
                     localStorage.setItem('UserId',data.Result_value.UserDetail.UserId);
                     this.router.navigate(['/dashboard']);



                }else{
                    this.loading = false;
                    this.alertService.error('You have entered the invalid details.');
                    
                }
        },
        (err : HttpErrorResponse)=>{
                this.loading = false;
                this.alertService.error('You have entered the invalid details.');
        })

         
           
    }
    
}
