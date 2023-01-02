import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Panic } from '../model/panic';
import { PanicPage } from '../model/panic-page';

@Injectable({
  providedIn: 'root'
})
export class PanicService {

  constructor(private http : HttpClient) { }

  getPanicMessages() : Observable<PanicPage>{
    return this.http.get<PanicPage>(environment.localhostApi + "panic");
  }

  update(panic : Panic) : Observable<string>{
    console.log("ej");
    return this.http.put<string>(JSON.stringify(panic),environment.localhostApi + "panic/" + panic.id);
  }

  getPanicById(id : number) : Observable<Panic>{
    return this.http.get<Panic>(environment.localhostApi + "panic/" + id);
  }
}
