import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'https://localhost:44305/api/User/login'; // API backend endpoint for authentication


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router) { }


  public login(username: string, password: string): Observable<any> {
    let payload = {
      'username': username,
       'password': password,
    }
    return this.httpClient.post<any>(this.apiURL, payload, this.httpOptions);
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id");
  }

  isLoggedIn() {
    const str = localStorage.getItem("expires_at") || "";
    if (str == "") return false; //chưa dn

    const expiresAt = JSON.parse(str);
    return moment().isBefore(moment(expiresAt));
  }

  getUsername(){
    if(this.isLoggedIn()){
      const str:string = localStorage.getItem("user_name") || "";
      if (str !== ""){
        return str;
      }
    }
    return "";
  }


  getRole() {
    // Kiểm tra quyền truy cập của người dùng
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null;
    }

    const tokenInfo = this.getDecodedAccessToken(token); // decode token
    const userRole = tokenInfo.role;

    console.log(userRole);

    return userRole;
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.httpClient.post<any>(`${this.apiURL}/refresh_token`, { refresh_token: refreshToken })
      .toPromise()
      .then(res => {
        if (res && res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          return true;
        }
        return false;
      })
      .catch(() => false);
  }
}


