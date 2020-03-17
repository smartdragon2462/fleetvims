import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class ClientsService {
    constructor(private http:HttpClient) {}
    getClients(data) {
        return this.http.post(environment.apiEndpoint+'GetClientList/',data,httpOptions);
    }
    saveClients(data) {
        return this.http.post(environment.apiEndpoint+'SaveClient/',data,httpOptions);
    }
    getClientById(id) {
    	var url=environment.apiEndpoint+"GetClientDetail?id="+id;
        return this.http.post(url,'',httpOptions);
    }
    deleteClient(id) {
    	var url=environment.apiEndpoint+"DeleteClient?id="+id;
        return this.http.post(url,'',httpOptions);
    }

    saveClientContact(data){
        return this.http.post(environment.apiEndpoint+'SaveContact/',data,httpOptions);
    }
    getClientReport(data){
        return this.http.post(environment.apiEndpoint+'GetClientReportSummary/',data,httpOptions);
    }
    
    deleteClientContact(id){
        var url=environment.apiEndpoint+"DeleteContact?id="+id;
        return this.http.post(url,'',httpOptions);

    }

    clientTransactionCompare(id) {

       var url=environment.apiEndpoint+"GetClientTransactionDetail?TransactionId="+id;
        return this.http.post(url,'',httpOptions);

    }
    
    getClientTransactionLog(data){
        return this.http.post(environment.apiEndpoint+'GetClientTransactionLog/',data,httpOptions);
    }
    
    regenerateReprt(id){
        
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');  
        var url=environment.apiEndpoint+"GetRegenrateClientPolicyReport?id="+id;
        return this.http.get(url, { headers: headers, responseType: 'blob' });

    }
    
}