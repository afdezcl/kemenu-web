import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Tokens } from '@models/auth/tokens.model';
import { Login } from '@models/auth/login.interface';
import { Register } from '@models/auth/register.interface';
import jwt_decode from 'jwt-decode';
import { ForgotPassword } from '@models/auth/forgotPassword.interface';
import { ChangePassword, ForgotPasswordId } from '@models/auth/changePassword.interface';
import { ResetPassword } from '@models/auth/resetPassword.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USER_EMAIL = 'USER_EMAIL';
  private readonly USER_ROLE = 'USER_ROLE';
  isBrowser: boolean;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  register(user: Register) {
    return this.httpClient
      .post(environment.apiBaseUrl + '/public/register', user);
  }

  login(user: Login) {
    return this.httpClient
      .post(environment.apiBaseUrl + '/login', user, { observe: 'response' })
      .pipe(map(response => {
        const tokens: Tokens = {
          jwt: response.headers.get('Authorization'),
          refreshToken: response.headers.get('JWT-Refresh-Token')
        };
        this.storeTokens(tokens);
      }));
  }

  forgotPassword(data: ForgotPassword) {
    return this.httpClient
      .post(environment.apiBaseUrl + '/public/forgot/password', data);
  }

  changePassword(forgotPasswordId: ForgotPasswordId, data: ChangePassword) {
    return this.httpClient
      .patch(environment.apiBaseUrl + '/public/forgot/password/' + forgotPasswordId.id + '/email/' + forgotPasswordId.email, data);
  }

  resetPassword(resetPassword: ResetPassword) {
    return this.httpClient
      .patch(environment.apiBaseUrl + '/web/v1/customer/' + this.getUserEmail() + '/password/change', resetPassword);
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    if (this.isBrowser) {
      return !!this.getJwtToken();
    }
  }

  refreshToken() {
    return this.httpClient.post<any>(environment.apiBaseUrl + '/public/refresh', {
      refreshToken: this.getRefreshToken()
    }, { observe: 'response' })
      .pipe(tap(response => {
        const tokens: Tokens = {
          jwt: response.headers.get('Authorization'),
          refreshToken: response.headers.get('JWT-Refresh-Token')
        };
        this.storeTokens(tokens);
      }));
  }

  getJwtToken() {
    if (this.isBrowser) {
      return localStorage.getItem(this.JWT_TOKEN);
    }
  }

  getUserEmail() {
    if (this.isBrowser) {
      return localStorage.getItem(this.USER_EMAIL);
    }
  }

  getUserRole() {
    if (this.isBrowser) {
      return localStorage.getItem(this.USER_ROLE);
    }
  }

  private getRefreshToken() {
    if (this.isBrowser) {
      return localStorage.getItem(this.REFRESH_TOKEN);
    }
  }

  private storeJwtToken(jwt: string) {
    if (this.isBrowser) {
      localStorage.setItem(this.JWT_TOKEN, jwt);
    }
  }

  private storeTokens(tokens: Tokens) {
    const jwtDecoded: any = jwt_decode(tokens.jwt);
    this.storeUserEmail(jwtDecoded.sub);
    this.storeUserRole(jwtDecoded.role[0]);
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private storeUserEmail(email: string) {
    localStorage.setItem(this.USER_EMAIL, email);
  }

  private storeUserRole(role: string) {
    localStorage.setItem(this.USER_ROLE, role);
  }

  refreshTokenHasExpirated(tokens: Tokens): boolean {
    const jwtDecoded: any = jwt_decode(tokens.refreshToken);
    const experationDate = new Date(jwtDecoded.exp * 1000);
    const now = new Date();
    return experationDate < now;
  }

  getRefreshCookie(shortUrlId: string) {
    return this.httpClient.get(environment.apiBaseUrl + '/show/' + shortUrlId);
  }
}
