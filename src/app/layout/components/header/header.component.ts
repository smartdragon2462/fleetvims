import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsersService} from '../../../shared/services/users.service';
import { HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [UsersService]
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-left';
    public login_name: string = 'push-left';

    constructor(private translate: TranslateService, public router: Router,private userService:UsersService) {

        var user_info = JSON.parse(localStorage.UserDetail);

        this.login_name=user_info.FirstName+" "+user_info.LastName;

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {}

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.userService.LogOut().subscribe((data : any)=>{  
              if(data.Result){    

                    
                    

                    //console.log(data.Result_value.UserDetail);
                   
                }else{
                   
                    //this.alertService.error('You have entered the invalid email.');
                    
                }
        },
        (err : HttpErrorResponse)=>{
                //this.loading = false;
                //this.alertService.error('You have entered the invalid details.');
        })

        localStorage.removeItem('isLoggedin');            
        localStorage.removeItem('Token');            
        localStorage.removeItem('UserDetail');
        localStorage.removeItem('permissionList');
        localStorage.removeItem('UserId');
        
        
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
