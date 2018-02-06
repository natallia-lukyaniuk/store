import jwtDecode from 'jwt-decode';
// import { fetch } from 'whatwg-fetch';
// require('whatwg-fetch');

export const TOKEN_NAME = 'jwt_token';

export default class AuthService {
  constructor(domain) {
    this.domain = domain || 'http://localhost:8000';
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    return this.fetch(`${this.domain}/api/authenticate`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => {
      this.setToken(res.token);
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

   isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    }
    catch (err) {
      return false;
    }
  }

   setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

   getToken() {
    return localStorage.getItem('id_token');
  }

   logout() {
    localStorage.removeItem('id_token');
  }

  getProfile() {
    return jwtDecode(this.getToken());
  }


  fetch(url, options) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
    };

    if (this.loggedIn()) {
      headers['Authorization'] = this.getToken();
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this.checkStatus)
      .then(response => response.json());
  }

   checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}