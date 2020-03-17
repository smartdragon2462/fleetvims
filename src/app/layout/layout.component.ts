import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	 UserInfo: any;
    constructor() {
    	this.UserInfo=JSON.parse(localStorage.getItem('UserDetail'))
        //console.log(this.UserInfo);

    }

    ngOnInit() {}
}
