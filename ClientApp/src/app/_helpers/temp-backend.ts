import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '@app/_models/user';
import { ok } from 'assert';

const users: User[] = [{id: 1, userName: 'test', password: 'test', firstName: 'Carl', lastName: 'Johnson' }];

@Injectable() 
export class TempBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
    
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            if(url.endsWith('/users/authenticate') && method === 'POST') {
                return authenticate();
            }
            else {
                return next.handle(request);
            }       
        }

        function authenticate() {
            const { userName, password } = body;
            const user = users.find(x => x.userName === userName && x.password === password);
        
            if (!user) {
                return error('User name or password is incorrect');
            }

            return ok({
                id: user.id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'temp-jwt-token'
            });

        }

        //helper functions
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer temp-jwt-token';
        }
    }
}

export let tempBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: TempBackendInterceptor,
    multi: true
};