﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable,  of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(usuario: string, senha: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { usuario, senha })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

  
    error(message) {
        return throwError({ error: { message } });
    }

    unauthorized() {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    handleAuthError(error){
        console.log(error);
        
        if (error.status === 401) {
            return this.unauthorized();
        }
        throw   error;
    }


}