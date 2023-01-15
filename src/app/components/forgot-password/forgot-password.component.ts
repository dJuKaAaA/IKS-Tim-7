import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SimpleUser } from 'src/app/model/simple-user.model';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = "";  
  resetCode: string = "";
  newPassword: string = "";
  confirmPassword: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private matDialog: MatDialog) { }

  backToHome() {
    this.router.navigate(['']);
  }

  sendResetMail() {
    this.userService.getByMail({ email: this.email }).subscribe({
      next: (user: SimpleUser) => {
        this.userService.sendResetMail(user.id).subscribe({
          next: () => {
            this.matDialog.open(DialogComponent, {
              data: {
                header: "Success!",
                body: "Successfully sent activation code to your email"
              }
            });
          }, error: (error) => {
            if (error instanceof HttpErrorResponse) {
              this.matDialog.open(DialogComponent, {
                data: {
                  header: "Error!",
                  body: error.error.message
                }
              });
            }
          }
        })
      }, error: (error) => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Error!",
              body: error.error.message
            }
          });
        }
      }
    });
  }

  resetPassword() {
    if (this.newPassword != this.confirmPassword) {
      this.matDialog.open(DialogComponent, {
        data: {
          header: "Not confirmed!",
          body: "New password and confirm password are not the same"
        }
      });
      return;
    }
    this.userService.getByMail({ email: this.email }).subscribe({
      next: (user: SimpleUser) => {
        this.userService.resetPassword(user.id, { newPassword: this.newPassword, code: this.resetCode })
          .subscribe({
            next: () => {
              this.matDialog.open(DialogComponent, {
                data: {
                  header: "Reset successful!",
                  body: "Password successfully reset"
                }
              });
              this.router.navigate(['']);
            }, error: (error) => {
              if (error instanceof HttpErrorResponse) {
                console.log(error);
                this.matDialog.open(DialogComponent, {
                  data: {
                    header: "Error!",
                    body: error.error.message
                  }
                });
              }
            }
          })
      }, error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Error!",
              body: error.error.message
            }
          });
        }
      }
    });
  }

}
