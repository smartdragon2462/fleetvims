import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class VehiclesService {
    constructor(private http:HttpClient) {}
    getVehicles(data) {
        return this.http.post(environment.apiEndpoint+'GetVehicleList/',data,httpOptions);
    }
    saveVehicles(data) {
        return this.http.post(environment.apiEndpoint+'SaveVehicle/',data,httpOptions);
    }
    getVehicleById(id) {
        var url=environment.apiEndpoint+"GetVehicleDetail?id="+id;
        return this.http.post(url,'',httpOptions);
    }
    getVehicleMasterDetails() {

        var data='{"PageIndex": 1,"PageSize": 200,"SortBy": 3,"SortOrder": 1,"Filter": {"Deleted": false}}';
        var url=environment.apiEndpoint+"GetVehicleMasterDetails";
        return this.http.post(url,data,httpOptions);
    }
    deleteVehicle(id) {
        var url=environment.apiEndpoint+"DeleteVehicle?id="+id;
        return this.http.post(url,'',httpOptions);
    }

    
    
    vehicleErrorRecordSave(record,clientid) {
        var url=environment.apiEndpoint+"SaveVehicleDetail?clientId="+clientid;
        return this.http.post(url,record,httpOptions);
    }

    vehicleImport(fileToUpload,clientid){
         var url=environment.apiEndpoint+"VehicleUpload?clientId="+clientid;
        //var url="http://localhost/test.php"
         //alert(url);
       
         const formData: FormData = new FormData();
         console.log(fileToUpload);
         formData.append('', fileToUpload, fileToUpload.name);
        // formData.append('fileKey', fileToUpload, fileToUpload.name);
          let headers = new HttpHeaders();
         return this.http.post(url,formData,{ headers: headers });
        //return this.http.post(url,'',httpOptions);
        
    }

    vehicleCertificate(id) {

        //let headers = new HttpHeaders();
        //headers = headers.set('Accept', 'application/pdf');  
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');  
        var url=environment.apiEndpoint+"GetVehicleCertificate?VehicleId="+id;
        return this.http.get(url, { headers: headers, responseType: 'blob' });
    }

    vehicleTransactionCertificate(id) {
        //let headers = new HttpHeaders();
        //headers = headers.set('Accept', 'application/pdf');  
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');  
        var url=environment.apiEndpoint+"GetVehicleTransactionCertificate?TransactionId="+id;
        return this.http.get(url, { headers: headers, responseType: 'blob' });
    }

    vehicleCounter(id,check) {
     //  var url=environment.apiEndpoint+"GetVehicleCounter?ClientId="+id; 
       var url=environment.apiEndpoint+"GetVehicleCounter?ClientId="+id+"&check="+check;
       return this.http.post(url,'',httpOptions);
    }   
     
   vehicleTransactionCompare(id) {

       var url=environment.apiEndpoint+"GetVehicleTransactionDetail?TransactionId="+id;
        return this.http.post(url,'',httpOptions);

    }

    printBatchCertificate(id) {

        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');  
        var url=environment.apiEndpoint+"PrintVehicleCertificate?VehicleIds="+id;
        return this.http.get(url, { headers: headers, responseType: 'blob' });
    }


    printCovrageReport(id,clientid) {

        //let headers = new HttpHeaders();
        //headers = headers.set('Accept', 'application/pdf');  
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');  
        var url=environment.apiEndpoint+"GetClientVehicleReport?CoverageType="+id+"&ClientId="+clientid;
        return this.http.get(url, { headers: headers, responseType: 'blob' });
    }


    saveVehicleContact(data){
        return this.http.post(environment.apiEndpoint+'SaveContact/',data,httpOptions);
    }

    checkUniqueSerialno(serialno,vehicleid){

        var  _vehicleModel={'VehicleId':vehicleid,'SerialNumber':serialno};
        var url=environment.apiEndpoint+"ValidateSerialNumber";
        return this.http.post(url,_vehicleModel,httpOptions);

    }


    
    deleteVehicleContact(id){
        var url=environment.apiEndpoint+"DeleteContact?id="+id;
        return this.http.post(url,'',httpOptions);

    }

    batchUpdateVehicles(data){
        return this.http.post(environment.apiEndpoint+'BatchUpdateVehicle/',data,httpOptions);
    }
        
    getVehicleTransactionLog(data){
        return this.http.post(environment.apiEndpoint+'GetVehicleTransactionLog/',data,httpOptions);
    }

    updateCoverageType(data){
        return this.http.post(environment.apiEndpoint+'UpdateCoverageType/',data,httpOptions);
    }

    sendEmail(data){

        return this.http.post(environment.apiEndpoint+'EmailCertificate',data,httpOptions);
    }

    
}