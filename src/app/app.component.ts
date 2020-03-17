import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import {Router, NavigationEnd} from "@angular/router";
import {GoogleAnalyticsEventsService} from "./google-analytics-events.service";
declare var ga:Function;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
    constructor(public router: Router, public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
  
    location: Location;
    ngOnInit() {
    	if (environment.production) {
               if (location.protocol === 'http:') {
                window.location.href = location.href.replace('http', 'https');
               }
        }
    }

}
