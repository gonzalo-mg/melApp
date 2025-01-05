import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, toArray } from 'rxjs';
import { SupplierModel } from '../models/supplier.model';
import { environment } from '../environments/environment';
import { BackendResponse } from '../models/backendResponse';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getSuppliers(): Observable<BackendResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhYmVqYW1heWFAZW1haWwuY29tIiwiaWF0IjoxNzM2MDczOTU1LCJleHAiOjE3MzYxNjAzNTV9.bjJCMdEKM-2gPfYxRkeFixzlKLRlXKwwMljrQPz5T-w',
    });
    let resp =  this.http.get<BackendResponse>(`${this.apiUrl}/suppliers`, {
      headers,
    });
    return resp;
  }
}
