import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';

import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ExcelService {

	
	constructor(private http:HttpClient) {}

	exportAsExcelFile(json: any[], excelFileName: string): void {
	  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
	  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
	  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
	  this.saveAsExcelFile(excelBuffer, excelFileName);
	}
	saveAsExcelFile(buffer: any, fileName: string): void {
	   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
	   FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
	}
}