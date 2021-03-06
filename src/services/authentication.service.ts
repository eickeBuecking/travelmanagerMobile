import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError  } from 'rxjs/operators';
import { User } from '../models/user';


interface LoginResponse {
  access_token: string;
  expires_in: number;
}
@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: HttpClient) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<User> {
        const body = new HttpParams().set('grant_type','password').set('username', username).set('password',password).set('client_id','travelmanager-service');
         return this.http.post<LoginResponse>('http://localhost:8280/auth/realms/Travelmanager/protocol/openid-connect/token', body.toString(), {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
          
        }).map((response: LoginResponse) => {
                // login successful if there's a jwt token in the response

                if (response.access_token) {
                    // set token property
                    this.token = response.access_token;
                    let user = new User();
                    user.username = "Eicke";
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', this.token);
                    // return true to indicate successful login
                    return user;
                } else {
                  throw new ErrorObservable(
                    'Token was not exposed as suspected.');
                }
            }).pipe(
              catchError(this.handleError)
            );


    }

    private handleError(error: HttpErrorResponse) {
      console.error('Raw error: ', error);
      if (error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}` +
          `message was: ${error.message}`);
      }
      // return an ErrorObservable with a user-facing error message
      return new ErrorObservable(
        'Wrong credentials.');
    };

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }

    public loggedIn() : boolean {
      if (!this.token) {
        this.token = localStorage.getItem('token');
      }
      return (this.token != undefined);
    }
}
