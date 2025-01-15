import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lense } from '../models/lens';
import { DiameterStrengthBound } from '../models/DiameterStrengthBound';
import { Index } from '../models/Index';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private remoteApiUrl = 'https://jola2311-project-backend-dt190g-ht24.azurewebsites.net'
  private localApiUrl = 'http://localhost:3000'
  private apiUrl = `${this.remoteApiUrl}/api/v1`

  constructor(private http: HttpClient) {}

  /* =======================================
    Lenses
  ======================================= */

  getAllLenses() : Observable<Lense[]> {
    return this.http.get<Lense[]>(`${this.apiUrl}/lenses`)
  }

  getLense(lensName: string, quality: number) : Observable<Lense> {
    return this.http.get<Lense>(`${this.apiUrl}/lenses/${lensName}/${quality}`)
  }

  deleteLense(lensName: string, quality: number) : Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/lenses/${lensName}/${quality}`)
  }

  editLense(lensName: string, quality: number, body: Object) : Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/lenses/${lensName}/${quality}`, body)
  }

  addLense(lense: Object) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/lenses`, lense)
  }

  /* =======================================
    DiameterStrengthBounds
  ======================================= */

  getAllDsb() : Observable<DiameterStrengthBound[]> {
    return this.http.get<DiameterStrengthBound[]>(`${this.apiUrl}/lenses/diameters`)
  }

  getOneDsb(type: string, quality: string) : Observable<DiameterStrengthBound> {
    return this.http.get<DiameterStrengthBound>(`${this.apiUrl}/lenses/diameters/${type}/${quality}`)
  }

  editDsb(type: string, quality: string, dsb: DiameterStrengthBound) {
    return this.http.patch<any>(`${this.apiUrl}/lenses/diameters/${type}/${quality}`, dsb)
  }

  /* =======================================
    Indexes
  ======================================= */

  getAllIndexes() : Observable<Index[]> {
    return this.http.get<Index[]>(`${this.apiUrl}/lenses/indexes`)
  }

}
