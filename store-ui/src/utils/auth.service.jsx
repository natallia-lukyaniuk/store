import * as jwtDecode from 'jwt-decode';

export const TOKEN_NAME = 'jwt_token';

export default class AuthenticationService {
  static getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  static setToken(token) {
    localStorage.setItem(TOKEN_NAME, token);
  }

  static getTokenExpirationDate(token) {
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  static isTokenExpired(token) {
    if (!token) {
      token = this.getToken();
    }

    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  static login(name, password) {
    const user = {
      login: name,
      password,
    };
    return this.http
      .post('http://localhost:3000/api/authenticate', JSON.stringify(user))
      .map(res => res);
  }

  static logout() {
    // clear token remove user from local storage to log user out
    this.setToken(null);
    localStorage.removeItem(TOKEN_NAME);
  }
}
