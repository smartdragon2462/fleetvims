import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';
import { environment } from '../../../environments/environment';


import {Observable} from 'rxjs/Observable';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class RolesService {
    constructor(private http:HttpClient) {}
    getRoles(data) {
        return this.http.post(environment.apiEndpoint+'GetRoleList/',data,httpOptions);
    }
    saveRoles(data) {
        return this.http.post(environment.apiEndpoint+'SaveRole/',data,httpOptions);
    }
    getRoleById(id) {
    	var url=environment.apiEndpoint+"GetRoleDetail?id="+id;
        return this.http.post(url,'',httpOptions);
    }
    deleteRole(id) {
    	var url=environment.apiEndpoint+"DeleteRole?id="+id;
        return this.http.post(url,'',httpOptions);
    }

    saveRoleContact(data){
        return this.http.post(environment.apiEndpoint+'SaveContact/',data,httpOptions);
    }

    getRoleMaster(){
        var url=environment.apiEndpoint+"GetRoleMasterDetails";
        return this.http.post(url,'',httpOptions);
    }
    
    deleteRoleContact(id){
        var url=environment.apiEndpoint+"DeleteContact?id="+id;
        return this.http.post(url,'',httpOptions);

    }

    roleMatch(Role,Permissions): boolean {

        var isMatch = false;
        var userRoles: any[] = JSON.parse(localStorage.getItem('permissionList'));
        if(userRoles[Role]){
                //isMatch= true;
                Permissions.forEach(element => {
                   if (userRoles[Role][element]) {
                     isMatch = true;
                     return false;
                   }
                })   
        }
        return isMatch;

    }
}