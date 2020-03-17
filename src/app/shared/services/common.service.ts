import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment'; 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class CommonService {
    constructor(private http:HttpClient) {}
    getSates(data) {
        return this.http.post(environment.apiEndpoint+'GetStates/',data,httpOptions);
    }
    getCities(id) {
        var url=environment.apiEndpoint+"GetCities?id="+id;
        return this.http.post(url,'',httpOptions);
    }
    
    getAgencies() {
    	var data='{"PageIndex": 1,"PageSize": 200,"SortBy": 3,"SortOrder": 1,"Filter": {"Deleted": false}}';
        return this.http.post(environment.apiEndpoint+'GetAgencyList_DropDown/',data,httpOptions);
        //return this.http.post(url,'',httpOptions);
    }
    getLeinholders() {
        var data='{"PageIndex": 1,"PageSize": 200,"SortBy": 3,"SortOrder": 1,"Filter": {"Deleted": false}}';
        return this.http.post(environment.apiEndpoint+'GetLeinholderList_DropDown/',data,httpOptions);
        //return this.http.post(url,'',httpOptions);
    }
    getInsurers() {
        var data='{"PageIndex": 1,"PageSize": 200,"SortBy": 3,"SortOrder": 1,"Filter": {"Deleted": false}}';
        return this.http.post(environment.apiEndpoint+'GetInsurerList_DropDown/',data,httpOptions);
        //return this.http.post(url,'',httpOptions);
    }

    saveMake(data){
        return this.http.post(environment.apiEndpoint+'SaveMake/',data,httpOptions);
    }
    deleteMake(id) {
    	var url=environment.apiEndpoint+"DeleteMake?id="+id;
        return this.http.post(url,'',httpOptions);
    }

    savePolicyType(data){
        return this.http.post(environment.apiEndpoint+'SavePolicyType/',data,httpOptions);
    }
    
    DeletePolicyType(id) {
    	var url=environment.apiEndpoint+"DeletePolicyType?id="+id;
        return this.http.post(url,'',httpOptions);
    }


    saveDriverType(data){
        return this.http.post(environment.apiEndpoint+'SaveDriverType/',data,httpOptions);
    }
    
    DeleteDriverType(id) {
    	var url=environment.apiEndpoint+"DeleteDriverType?id="+id;
        return this.http.post(url,'',httpOptions);
    }
    
    saveUnitType(data){
        return this.http.post(environment.apiEndpoint+'saveUnitType/',data,httpOptions);
    }
    saveCargoType(data){
        return this.http.post(environment.apiEndpoint+'saveCargoType/',data,httpOptions);
    }
    onDeleteCargoType(data){
        return this.http.post(environment.apiEndpoint+'DeleteCargoType/',data,httpOptions);
    }
    
    onStateTaxSave(data){
        return this.http.post(environment.apiEndpoint+'StateTaxSave/',data,httpOptions);
    }
    onDeleteStateTax(data){
        return this.http.post(environment.apiEndpoint+'DeleteStateTax/',data,httpOptions);
    }
    

    dashboard() {
        var data='{"PageIndex":0,"PageSize": 0,"SortBy":0,"SortOrder": 0,"Filter": ""}';
        return this.http.post(environment.apiEndpoint+'GetDashboardDetailList/',data,httpOptions);
    }

    
    RecentaddedvehicelDashboard(data) {
        return this.http.post(environment.apiEndpoint+'GetRecentaddedvehicelDashboardDetailList/',data,httpOptions);
    }
    RecentlyDeletedVehiclesDashboard(data) {
        return this.http.post(environment.apiEndpoint+'GetRecentlyDeletedVehiclesDashboardDetailList/',data,httpOptions);
    }

    ExpiringPoliciesDashboard(data) {
        return this.http.post(environment.apiEndpoint+'GetExpiringPoliciesDashboardDetailList/',data,httpOptions);
    }
    

    RecentTransactionDashboard(data) {
        return this.http.post(environment.apiEndpoint+'GetRecentTransactionDashboardDetailList/',data,httpOptions);
    }
    
    GetClientSummaryDashboardDetailList(data) {
        return this.http.post(environment.apiEndpoint+'GetClientSummaryDashboardDetailList/',data,httpOptions);
    }
    GetNonSponsorDashboardDetailList(data) {
        return this.http.post(environment.apiEndpoint+'GetNonSponsorDashboardDetailList/',data,httpOptions);
    }
    


    regenerateReprt(id){
        
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');  
        var url=environment.apiEndpoint+"GetRegenrateClientPolicyReport?id="+id;
        return this.http.get(url, { headers: headers, responseType: 'blob' });

    }
}