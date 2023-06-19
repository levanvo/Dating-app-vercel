import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from '../typeUser';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }


  // ==============================User
  getAllUser():Observable<ILogin[]>{// getting All Users
    return this.http.get<ILogin[]>(`http://localhost:3000/users`);
  }
  getOneUser(idUser:any):Observable<ILogin[]>{// getting All Users
    return this.http.get<ILogin[]>(`http://localhost:3000/users/${idUser}`);
  }
  addUser(dataUser:any):Observable<ILogin[]>{// getting All Users
    return this.http.post<ILogin[]>(`http://localhost:3000/users`,dataUser);
  }
  updateUser(dataUser:any):Observable<ILogin[]>{// getting All Users
    return this.http.put<ILogin[]>(`http://localhost:3000/users/${dataUser.id}`,dataUser);
  }
  
  // ==============================Message
  getAllMessage():Observable<any[]>{// getting All Messages
    return this.http.get<any[]>(`http://localhost:3000/message`);
  }
  getOneMessage(idMessage:any):Observable<any[]>{// getting one Messages
    return this.http.get<any[]>(`http://localhost:3000/message/${idMessage}`);
  }
  addMessage(dataMessage:any):Observable<any[]>{// add Messages
    return this.http.post<any[]>(`http://localhost:3000/message`,dataMessage);
  }
  updateMessage(dataMessage:any):Observable<any[]>{// update Messages
    return this.http.put<any[]>(`http://localhost:3000/message/${dataMessage.id}`,dataMessage);
  }
  deleteMessage(idMessage:any):Observable<any[]>{// delete one Messages
    return this.http.delete<any[]>(`http://localhost:3000/message/${idMessage}`);
  }











}
