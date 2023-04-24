import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) { }
  username: string = "";
  password: string = "";

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  canEdit() {
    // return this.authService.hasPermission('edit');
  }

  isError = false;
  errorString:string = "";
  login() {
    console.log(this.username, this.password)
    this.authService.login(this.username, this.password).subscribe(
      (res) => {
        console.log(res);
        if (res.success === true && res.data.accessToken && res.data.refreshToken) {
          localStorage.setItem('access_token', res.data.accessToken);
          localStorage.setItem('refresh_token', res.data.refreshToken);
          console.log('res.data.accessToken');
          console.log(res.data.accessToken);

          console.log('res.data.refreshToken');
          console.log(res.data.refreshToken);

          const tokenInfo = this.authService.getDecodedAccessToken(res.data.accessToken); // decode token

          console.log('tokenInfo');
          console.log(tokenInfo);

          localStorage.setItem('user_name', tokenInfo.UserName);
          localStorage.setItem('user_id', tokenInfo.Id);

          const expireDate = tokenInfo.exp; // get token expiration dateTime
          console.log(tokenInfo); // show decoded token object in console

          const expiresAt = new Date(expireDate * 1000).toISOString();
          console.log(expiresAt); // Kết quả: "02:27:43"

          localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));



          this.router.navigateByUrl('/');
        } else{
          this.isError = true;
          this.errorString = res.message;
        }
      },
      (error) => {
        this.isError = true;
        this.errorString = error.message;
      }
    );
  }


  logout() {
    this.authService.logout();
  }

}
