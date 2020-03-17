import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class ContractsService {
    constructor(private http:HttpClient) {}
    getContracts(data) {
        return this.http.post(environment.apiEndpoint+'GetContractList/',data,httpOptions);
    }
    saveContracts(data) {
        return this.http.post(environment.apiEndpoint+'SaveContract/',data,httpOptions);
    }
    getContractById(id) {
    	var url=environment.apiEndpoint+"GetContractDetail?id="+id;
        return this.http.post(url,'',httpOptions);
    }
    deleteContract(id) {
    	var url=environment.apiEndpoint+"DeleteContract?id="+id;
        return this.http.post(url,'',httpOptions);
    }

    saveContractContact(data){
        return this.http.post(environment.apiEndpoint+'SaveContact/',data,httpOptions);
    }
    
    deleteContractContact(id){
        var url=environment.apiEndpoint+"DeleteContact?id="+id;
        return this.http.post(url,'',httpOptions);

    }
}