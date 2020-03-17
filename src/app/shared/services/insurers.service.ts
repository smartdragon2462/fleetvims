import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class InsurersService {
    constructor(private http:HttpClient) {}
    getInsurers(data) {
        return this.http.post(environment.apiEndpoint+'GetInsurerList/',data,httpOptions);
    }
    saveInsurers(data) {
        return this.http.post(environment.apiEndpoint+'SaveInsurer/',data,httpOptions);
    }
    getInsurerById(id) {
    	var url=environment.apiEndpoint+"GetInsurerDetail?id="+id;
        return this.http.post(url,'',httpOptions);
    }
    deleteInsurer(id) {
    	var url=environment.apiEndpoint+"DeleteInsurer?id="+id;
        return this.http.post(url,'',httpOptions);
    }

    saveInsurerContact(data){
        return this.http.post(environment.apiEndpoint+'SaveContact/',data,httpOptions);
    }
    
    deleteInsurerContact(id){
        var url=environment.apiEndpoint+"DeleteContact?id="+id;
        return this.http.post(url,'',httpOptions);

    }
}