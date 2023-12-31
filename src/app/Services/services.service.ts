import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from '../typeUser';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }
  URL_users = `http://localhost:4000/users`;
  URL_message = `http://localhost:4000/message`;

  // ==============================User
  getAllUser(): Observable<ILogin[]> {
    return this.http.get<ILogin[]>(`${this.URL_users}`);
  }
  getOneUser(idUser: any): Observable<ILogin[]> {
    return this.http.get<ILogin[]>(`${this.URL_users}/${idUser}`);
  }
  addUser(dataUser: any): Observable<ILogin[]> {
    return this.http.post<ILogin[]>(`${this.URL_users}`, dataUser);
  }
  updateUser(dataUser: any): Observable<ILogin[]> {
    return this.http.put<ILogin[]>(`${this.URL_users}/${dataUser.id}`, dataUser);
  }

  // ==============================Message
  getAllMessage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_message}`);
  }
  getOneMessage(idMessage: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_message}/${idMessage}`);
  }
  addMessage(dataMessage: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.URL_message}`, dataMessage);
  }
  updateMessage(dataMessage: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.URL_message}/${dataMessage.id}`, dataMessage);
  }
  deleteMessage(idMessage: any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.URL_message}/${idMessage}`);
  }


  // =========================================================================================================
  test() {
    return this.http.get("https://localhost:5001/api/users");
  }










}
