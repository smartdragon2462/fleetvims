import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class AgenciesService {
    constructor(private http:HttpClient) {}
    getAgencies(data) {
        return this.http.post(environment.apiEndpoint+'GetAgencyList/',data,httpOptions);
    }
    saveAgencies(data) {
        return this.http.post(environment.apiEndpoint+'SaveAgency/',data,httpOptions);
    }
    getAgencyById(id) {
    	var url=environment.apiEndpoint+"GetAgencyDetail?id="+id;
        return this.http.post(url,'',httpOptions);
    }
    deleteAgency(id) {
    	var url=environment.apiEndpoint+"DeleteAgency?id="+id;
        return this.http.post(url,'',httpOptions);
    }

    getAgencyClientReport(userId,agencyId){
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); 
        var url=environment.apiEndpoint+"AgencyMonthlyExcelReport?UserId="+userId+"&AgencyId="+agencyId;
        return this.http.get(url, { headers: headers, responseType: 'blob' });
    }
    saveAgencyContact(data){
        return this.http.post(environment.apiEndpoint+'SaveContact/',data,httpOptions);
    }
    
    deleteAgencyContact(id){
        var url=environment.apiEndpoint+"DeleteContact?id="+id;
        return this.http.post(url,'',httpOptions);

    }
}