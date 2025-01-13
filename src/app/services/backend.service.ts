import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lense } from '../models/lens';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private remoteApiUrl = 'https://jola2311-project-dt190g-ht24.azurewebsites.net';
  private localApiUrl = 'http://localhost:3000'
  private apiUrl = `${this.localApiUrl}/api/v1`

  constructor(private http: HttpClient) {}

  getAllLenses() : Observable<Lense[]> {
    return this.http.get<Lense[]>(`${this.apiUrl}/lenses`);
  }

}
