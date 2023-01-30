import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Message } from '../model/message.model';
import { Note } from '../model/note.model';
import { PaginatedResponse } from '../model/paginated-response.model';
import { SimpleUser } from '../model/simple-user.model';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public fetchConversation(receiverId: number): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(environment.localhostApi + `user/${receiverId}/conversation`);
  }

  public fetchMessages(id: number): Observable<PaginatedResponse<Message>> {
    return this.http.get<PaginatedResponse<Message>>(environment.localhostApi + `user/${id}/message`);
  }

  public sendMessage(id: number, message: Message): Observable<Message> {
    return this.http.post<Message>(environment.localhostApi + `user/${id}/message`, {
      receiverId: message.receiverId,
      message: message.message,
      type: message.type,
      rideId: message.rideId
    });
  }

  public sendNote(id: number, note: { message: string }): Observable<Note> {
    return this.http.post<Note>(environment.localhostApi + `user/${id}/note`, note);
  }

  public sendResetMail(email: string) {
    return this.http.get(environment.localhostApi + `user/${email}/resetPassword`);
  }

  public resetPassword(email: string, resetObj: { newPassword: string, code: string }) {
    return this.http.put(environment.localhostApi + `user/${email}/resetPassword`, resetObj); 
  }

  public fetchUsers(): Observable<PaginatedResponse<User>> {
    return this.http.get<PaginatedResponse<User>>(environment.localhostApi + `user`);
  }
  public block(id:number): Observable<String>{
    return this.http.put<String>(environment.localhostApi + `user/${id}/block`, {});
  }

}
