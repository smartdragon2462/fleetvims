import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class LienholdersService {
    constructor(private http:HttpClient) {}
    getLienholders(data) {
        return this.http.post(environment.apiEndpoint+'GetLeinholderList/',data,httpOptions);
    }
    saveLienholders(data) {
        return this.http.post(environment.apiEndpoint+'SaveLeinholder/',data,httpOptions);
    }
    getLienholderById(id) {
    	var url=environment.apiEndpoint+"GetLeinholderDetail?id="+id;
        return this.http.post(url,'',httpOptions);
    }
    deleteLienholder(id) {
    	var url=environment.apiEndpoint+"DeleteLeinholder?id="+id;
        return this.http.post(url,'',httpOptions);
    }

    saveLienholderContact(data){
        return this.http.post(environment.apiEndpoint+'SaveContact/',data,httpOptions);
    }
    
    deleteLienholderContact(id){
        var url=environment.apiEndpoint+"DeleteContact?id="+id;
        return this.http.post(url,'',httpOptions);

    }
}