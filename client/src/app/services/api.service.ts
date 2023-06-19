import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  /**
   * API GET /llaves : Esta llamada retorna un JSON con las llaves de encriptación
   *
   * @return {*}  {Observable<any>}
   * @memberof ApiService
   */
  public getLlaves(): Observable<any> {
    return this.http.get(`${this.API_URL}/llaves`);
  }

  /**
   * API POST /escenario
   *
   * @param {Object} body
   * @return {*}  {Observable<any>}
   * @memberof ApiService
   */
  public postEscenario(body: Object): Observable<any> {
    return this.http.post(`${this.API_URL}/escenario`, body);
  }
}
