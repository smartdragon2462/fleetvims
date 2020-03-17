import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';
import { environment } from '../../../environments/environment';


import {Observable} from 'rxjs/Observable';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class UsersService {
    constructor(private http:HttpClient) {}
    getUsers(data) {
        return this.http.post(environment.apiEndpoint+'GetUserList/',data,httpOptions);
    }
    saveUsers(data) {
        return this.http.post(environment.apiEndpoint+'SaveContact/',data,httpOptions);
    }
    getUserById(id) {
    	var url=environment.apiEndpoint+"GetUserDetail?id="+id;
        return this.http.post(url,'',httpOptions);
    }
    deleteUser(id) {
    	var url=environment.apiEndpoint+"DeleteContact?id="+id;
        return this.http.post(url,'',httpOptions);
    }

    getTransureRoles() {
        var _RolesOptions = {"PageIndex":1,"PageSize":800,"SortBy": "0","SortOrder":2,"Filter": {"SearchText":'',
    "Deleted":false,"ModuleType": 1}}
        var url=environment.apiEndpoint+"GetRoleList";
        return this.http.post(url,_RolesOptions,httpOptions);
    }
    saveUserContact(data){
        return this.http.post(environment.apiEndpoint+'SaveContact/',data,httpOptions);
    }
    
    deleteUserContact(id){
        var url=environment.apiEndpoint+"DeleteContact?id="+id;
        return this.http.post(url,'',httpOptions);

    }
    changePassword(oldpassword,password){
        var data = { "OldPassword": oldpassword,'Password':password};
        return this.http.post(environment.apiEndpoint+'ChangePassword',data,httpOptions);

    }
    LogOut(){
        
        return this.http.post(environment.apiEndpoint+'Logout','',httpOptions);

    }
}