import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { PaginatedResponse } from '../model/paginated-response.model';
import { Panic } from '../model/panic';

@Injectable({
  providedIn: 'root'
})
export class PanicService {

  constructor(private http : HttpClient) { }

  getPanicMessages() : Observable<PaginatedResponse<Panic>>{
    return this.http.get<PaginatedResponse<Panic>>(environment.localhostApi + "panic");
  }

  update(panic : Panic) : Observable<string>{
    // console.log("ej");
    return this.http.put<string>(JSON.stringify(panic),environment.localhostApi + "panic/" + panic.id);
  }

  getPanicById(id : number) : Observable<Panic>{
    return this.http.get<Panic>(environment.localhostApi + "panic/" + id);
  }

  setAsReviewed(id:number): Observable<string>{
    console.log(id);
    return this.http.put<string>(environment.localhostApi+"panic/review/" + id, {});
  }
}
