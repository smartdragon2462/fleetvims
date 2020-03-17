import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class LoginService {
    constructor(private http:HttpClient) {}
    userLogin(data) {
        return this.http.post(environment.apiEndpoint+'Login/',data,httpOptions);
    }

    userForgotPassword(email) {
    		var data = { "Email": email};
    		return this.http.post(environment.apiEndpoint+'ForgotPasswordRequest?Email='+email,'',httpOptions);
    }
    verifyResetPasswordToken(token){
    	var data = { "Token": token};
    	return this.http.post(environment.apiEndpoint+'VerifyResetPasswordToken',data,httpOptions);

    }

    resetPassword(token,password){
    	var data = { "Token": token,'Password':password};
    	return this.http.post(environment.apiEndpoint+'ResetPassword',data,httpOptions);

    }
    
}