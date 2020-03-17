import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';
import { environment } from '../../../environments/environment';

import {Observable} from 'rxjs/Observable';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class PoliciesService {
    constructor(private http:HttpClient) {}
    getPolicies(data) {
        return this.http.post(environment.apiEndpoint+'GetPolicyList/',data,httpOptions);
    }
    savePolicies(data) {
        return this.http.post(environment.apiEndpoint+'SavePolicy/',data,httpOptions);
    }
    getPolicyById(id) {
    	var url=environment.apiEndpoint+"GetPolicyDetail?id="+id;
        return this.http.post(url,'',httpOptions);
    }
    deletePolicy(id) {
    	var url=environment.apiEndpoint+"DeletePolicy?id="+id;
        return this.http.post(url,'',httpOptions);
    }

    getPolicyMasterDetails(id,data) {
        var url=environment.apiEndpoint+"GetPolicyMasterDetails?_UserId="+id;
        return this.http.post(url,data,httpOptions);
    }

    savePolicyContact(data){
        return this.http.post(environment.apiEndpoint+'SaveContact/',data,httpOptions);
    }

    getPolicyReport(data){
        return this.http.post(environment.apiEndpoint+'GetPolicyReportSummary/',data,httpOptions);
    }

    policyTransactionCompare(id) {

       var url=environment.apiEndpoint+"GetPolicyTransactionDetail?TransactionId="+id;
        return this.http.post(url,'',httpOptions);

    }
    
    getPolicyTransactionLog(data){
        return this.http.post(environment.apiEndpoint+'GetPolicyTransactionLog/',data,httpOptions);
    }
    
    deletePolicyContact(id){
        var url=environment.apiEndpoint+"DeleteContact?id="+id;
        return this.http.post(url,'',httpOptions);

    }
}