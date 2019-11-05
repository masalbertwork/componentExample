import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';

import { FavoritoPayload } from './model/FavoritoPayload';

@Injectable({
  providedIn: 'root'
})
export class AppActivitatService {
  urlfav: string = '/masterservices/companybyactivity/findfav';
  url: string = '/masterservices/companybyactivity/find';
  token: string =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWYiOiJFU0I1ODM2ODA2OSIsInNlcnZpY2VzIjoiW1wiSU5GTUFOSUZcIixcIklORlZBSVhFXCIsXCJJTkZERU1FMlwiLFwiUkVJTkdFMDZcIixcIlJFSU5HRTA3XCIsXCJSRUlOR0UwOFwiLFwiUkVJTkdFMTNcIixcIlJFSU5HRTE0XCIsXCJSRUlOR0UxNVwiLFwiUkVJTkdFMTZcIixcIlJFSU5HRTE3XCIsXCJSRUlOR0UyM1wiLFwiUkVJTkdFMjZcIixcIkNPUEFSVDAxXCIsXCJDT1BBUlQwMlwiLFwiSUZUTUlUMDNcIixcIkNPSEFPMjkyXCIsXCJDQVJHQURPUlwiLFwiVkVSTUFTQ09cIixcIlZFUk1BU1NPXCIsXCJXRUJGT1JXXCIsXCJHRVNBRFVcIl0iLCJleHAiOjE1NzMwNDExMDgsInVzZXIiOiJOQURBTDAxIiwiaWF0IjoxNTcyOTU0NzA4LCJhcHBzIjoie1wiYXBwUm9sZXNcIjpbe1wiQXBwQ29kZVwiOlwiUkVTRVJWQVNcIixcImRlc2NyaXB0aW9uXCI6XCJXZWIgZGUgUmVzZXJ2YXNcIixcImNyZWF0ZWRBdFwiOlwiMjAxNy0xMS0xNlQwMDowMDowMFpcIixcInJvbGVzQXBsaWNhY2lvblwiOlt7XCJyb2xlQ29kZVwiOlwiVFJBTlNQXCIsXCJkZXNjcmlwdGlvblwiOlwiVHJhbnNwb3J0aXN0YVwifV19LHtcIkFwcENvZGVcIjpcIldFQkNFTlNPXCIsXCJkZXNjcmlwdGlvblwiOlwiV2ViIENlbnNvIE9wZXJhZG9yZXMgVHJhbnNwb3J0ZVwiLFwiY3JlYXRlZEF0XCI6XCIyMDE3LTA3LTEwVDA5OjQyOjUzWlwiLFwicm9sZXNBcGxpY2FjaW9uXCI6W3tcInJvbGVDb2RlXCI6XCJPUFRSQU5TXCIsXCJkZXNjcmlwdGlvblwiOlwiT3BlcmFkb3IgZGUgVHJhbnNwb3J0ZVwifV19XSxcInNlcnZlaXNcIjpbXX0ifQ.ABdf95vkDHRNIpzT2PKkbqquw_TelxYLUThUl1MNn1o';

  _environmnentUrl: string = 'http://10.120.1.182:8090/porticapp';

  constructor(private http: HttpClient) {}

  consultaTransportistasFavoritos(
    favoritoPayload: FavoritoPayload
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token': this.token
      })
    };

    return this.http.post(
      this._environmnentUrl + this.urlfav,
      favoritoPayload,
      httpOptions
    );
  }

  consultaTransportistas(payload: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token': this.token
      })
    };

    return this.http.post(
      this._environmnentUrl + this.url,
      payload,
      httpOptions
    );
  }
}
