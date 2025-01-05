import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierModel } from '../models/supplier.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  
  private readonly endpoint = '/suppliers'
  private apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getSuppliers(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(this.apiUrl);
  }
}
