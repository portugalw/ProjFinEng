import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/primeng';

import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnDestroy {
    currentUser: User;
    subscription: Subscription;

    items: MenuItem[];

    constructor(public breadcrumbService: BreadcrumbService,
        private router: Router,
        private authenticationService: AuthenticationService) {
        
            this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });

        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
