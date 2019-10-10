import {Component} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    currentUser: User;
    
    constructor(public app: AppMainComponent, 
        private router: Router,
        private authenticationService: AuthenticationService) {
            this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        }
}
