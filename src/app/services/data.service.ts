import { SecurityUtils } from './../utils/security-utils';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = "http://localhost:3000/v1";

  constructor(private http: HttpClient) { }

  composeHeaders() {
    const token = SecurityUtils.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return headers;
  }

  getAllProducts() {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  authenticate(data: User) {
    return this.http.post(
      `${this.url}/accounts/authenticate`,
      data);
  }

  refreshToken() {
    return this.http.post(
      `${this.url}/accounts/refresh-token`,
      null,
      { headers: this.composeHeaders() });
  }

  create(data) {
    return this.http.post(`${this.url}/accounts`,
      data,
      { headers: this.composeHeaders() });
  }

  resetPassword(data) {
    return this.http.post(`${this.url}/accounts/reset-password`,
      data,
      { headers: this.composeHeaders() });
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.url}/accounts`,
      { headers: this.composeHeaders() });
  }

  updateProfile(data) {
    return this.http.put(`${this.url}/accounts`,
      data,
      { headers: this.composeHeaders() });
  }
}
