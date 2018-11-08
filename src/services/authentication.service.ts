import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError  } from 'rxjs/operators';
import { User } from '../models/user';
import * as jwt from 'jsonwebtoken';
import { decode } from 'punycode';

interface LoginResponse {
  access_token: string;
  expires_in: number;
}
@Injectable()
export class AuthenticationService {
    public token: string;
    private cert: string = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiN3J5uoDpfuVS9/INFCPGGaX+Gy17fH4p+4DSxxHuoPegDrCadubZRGMau0OaG5Q0rJblrvq0PTR06Ik1QCBaEJSI+/wsiZrGO8U8tmxl/Xtij0+HRXGpotDud23RxaS2MTTH4pX2w/IUaeTVE8v0haVIFpXE9fKbsFPEvTBJbrIvds+bvi7lrdOt0AplsgezFwEgVDiD0FLF86pWPjhJ0ZFd5g3/yyx3tUCkKUeMBd4/lb2fr1MJ+0edI4kUd3l/LMueliY++ahlFJ+/la1rtyuIDtlYHayNrCu81xQyYFdDFZy+u5jzSEeydKMRQQL0RISXQhC6MiRRsgZvr47DwIDAQAB\n-----END PUBLIC KEY-----";
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
                    user.username = this.extractUserFromToken(this.token);
                    if (username != null) {
                      // store username and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('currentUser', JSON.stringify(user));
                      localStorage.setItem('token', this.token);
                      // return true to indicate successful login
                      return user;  
                    } else {
                      throw new ErrorObservable(
                        'Token was invalid.');
                    }
                    
                } else {
                  throw new ErrorObservable(
                    'Token was not exposed as suspected.');
                }
            }).pipe(
              catchError(this.handleError)
            );


    }

    public extractUserFromToken(token:string) : string {
      try {
        let decoded = jwt.verify(token, this.cert);
        console.log("Token: " + JSON.stringify(decoded));
        return decoded["preferred_username"];
      } catch (err) {
        console.log("Token verification failed: " + err);
        return null;
      }
      
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
      let username:string;
      if (!this.token) {
        this.token = localStorage.getItem('token');
      }
      if (this.token != undefined) {
         username = this.extractUserFromToken(this.token);
      }
      
      return (username != undefined);
    }
}
