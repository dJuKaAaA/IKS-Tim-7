import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message.model';
import { PaginatedResponse } from 'src/app/model/paginated-response.model';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  users: Array<User> = [];
  receiverId: number = -1;
  messages: Array<Message> = [];
  userFullName: string = "Neko Nekic";

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe({
      next: (response: PaginatedResponse<User>) => {
        this.users = response.results.filter(user => {
          if (user.id == this.authService.getId()) { return false; }
          return true;
        });
      }, error: (error) => {
        if (error instanceof HttpErrorResponse) {}
      }
    })
  }

  openChatWithUser(userId: number) {
    this.receiverId = userId;
    for (let user of this.users) {
      if (user.id == this.receiverId) {
        this.userFullName = user.name + " " + user.surname;
        break;
      }
    }
    this.userService.fetchMessages(this.receiverId).subscribe({
      next: (response: PaginatedResponse<Message>) => {
        this.messages = response.results;
      }, error: (error) => {
        if (error instanceof HttpErrorResponse) {}
      }
    });
  }


}
