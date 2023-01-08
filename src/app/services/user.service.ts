import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Message } from '../model/message.model';
import { Note } from '../model/note.model';
import { PaginatedResponse } from '../model/paginated-response.model';
import { SimpleUser } from '../model/simple-user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public fetchMessages(id: number): Observable<PaginatedResponse<Message>> {
    return this.http.get<PaginatedResponse<Message>>(environment.localhostApi + `user/${id}/message`);
  }

  public sendMessage(id: number, message: Message) {
    return this.http.post(environment.localhostApi + `user/${id}/message`, {
      receiverId: message.receiverId,
      message: message.message,
      type: message.type,
      rideId: message.rideId
    });
  }

  public sendNote(id: number, note: { message: string }): Observable<Note> {
    return this.http.post<Note>(environment.localhostApi + `user/${id}/note`, note);
  }

  public sendResetMail(id: number) {
    return this.http.get(environment.localhostApi + `user/${id}/resetPassword`);
  }

  public resetPassword(id: number, resetObj: { newPassword: string, code: string }) {
    return this.http.put(environment.localhostApi + `user/${id}/resetPassword`, resetObj); 
  }

  public getByMail(user: { email: string }): Observable<SimpleUser> {
    return this.http.post<SimpleUser>(environment.localhostApi + `user/id`, user);
  } 

}
