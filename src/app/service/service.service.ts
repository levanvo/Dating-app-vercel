import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  anonimous="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgxNmM1NzM2MzAwYmEzMzk4ZjEyNmMiLCJpYXQiOjE2ODYzOTI0ODAsImV4cCI6MTY4NzY4ODQ4MH0.-HA322nTiy15ZyYL4sZjFgVWAFhDev_g4a7sDsasgbI";
  // Products
  getAllPrLimit(limit:any,page:any,oder:any):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/prlimit?_limit=${limit}?_page=${page}?_oder=${oder}`);
  };
  getAllPr():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/pr`);
  };
  getOnePr(_id:any):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/pr/${_id}`);
  };
  addPr(data:any):Observable<any[]>{
    return this.http.post<any[]>(`http://localhost:8080/pr`,data,{
      headers:{
        'Authorization': `Bearer ${this.anonimous}`,
      }
    });
  };
  updatePr(data:any,id:any):Observable<any[]>{
    return this.http.put<any[]>(`http://localhost:8080/pr/${id}`,data,{
      headers:{
        'Authorization': `Bearer ${this.anonimous}`,
      }
    });
  };
  
  removePr(_id:any):Observable<any[]>{
    return this.http.delete<any[]>(`http://localhost:8080/pr/${_id}`,{
      headers:{
        'Authorization': `Bearer ${this.anonimous}`,
      }
    });
  };


  // Categories
  getAllCt():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/ct`);
  };
  getOneCt(_id:any):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/ct/${_id}`);
  };
  addCt(data:any):Observable<any[]>{
    return this.http.post<any[]>(`http://localhost:8080/ct`,data,{
      headers:{
        'Authorization': `Bearer ${this.anonimous}`,
      }
    });
  };
  updateCt(data:any,id:any):Observable<any[]>{
    return this.http.put<any[]>(`http://localhost:8080/ct/${id}`,data,{
      headers:{
        'Authorization': `Bearer ${this.anonimous}`,
      }
    });
  };
  removeCt(_id:any):Observable<any[]>{
    return this.http.delete<any[]>(`http://localhost:8080/ct/${_id}`,{
      headers:{
        'Authorization': `Bearer ${this.anonimous}`,
      }
    });
  };



  // Author
  Signup(data:any):Observable<any[]>{
    return this.http.post<any[]>(`http://localhost:8080/signup`,data);
  };
  Signin(data:any){
    return this.http.post(`http://localhost:8080/sigin`,data);
  };
  AllAuthor():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/allUsers`);
  };
  GetOneAuthor(_id:any):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/oneUser/${_id}`);
  };
  RemoveAuthor(_id:any):Observable<any[]>{
    return this.http.delete<any[]>(`http://localhost:8080/removeUser/${_id}`,{
      headers:{
        'Authorization': `Bearer ${this.anonimous}`,
      }
    });
  };
  updateAuthor(data:any):Observable<any[]>{
    return this.http.put<any[]>(`http://localhost:8080/updateUser/${data._id}`,data,{
      headers:{
        'Authorization': `Bearer ${this.anonimous}`,
      }
    });
  };
}
