import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfirmationDialogService } from '../confirm-dialog/confirm-dialog.service';
import { IUser } from '../models/user.model';
import { IUserList } from '../models/userlist.model';
import { UsersService } from './userlist.services';

@Component({
  selector: 'app-userlist',
  providers: [UsersService],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  users!: IUserList;
  errorReceived: boolean = false;
  selectedUser!: IUser;
  renderDetail: boolean = true;
  
  constructor(private service: UsersService, private confirmDialogSevice: ConfirmationDialogService, private router: Router, private activeRouter : ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.getUsers();
  }

  getUsers() {
    this.errorReceived = false;
    this.service.getUsers()
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe(users => {
        this.users = users;
      });
  }

  navigateUserDetail(userId:number) {
    // this.router.navigate(['/details/', userId]);
    this.service.getUserDetails(userId).pipe(catchError((err) => this.handleError(err)))
      .subscribe(userdetail => {
        this.selectedUser = userdetail;
      });
  }

  getUserInfo(userId: number) {
    this.renderDetail = true;
    this.service.getUserDetails(userId).pipe(catchError((err) => this.handleError(err)))
      .subscribe(userdetail => {
        this.selectedUser = userdetail;
      });
  }

  onDeleteUser(userId: number) {
    this.openConfirmationDialog(userId);
  }

  deleteUser(userId: number) {
    this.errorReceived = false;
    this.renderDetail = true;
    this.service.deleteUser(userId).pipe(catchError((err) => this.handleError(err)))
      .subscribe(response => {
        if (response) {
          this.getUsers();
          this.selectedUser = null as any;
        }
      });
  }

  addnewUser() {
    this.renderDetail = false;
    this.selectedUser = {
      id: 0,
      name :'',
      job:'',
      motto:'',
      hobbies:'',
      hometown:'',
      personalBlog:'',
      userPicture:''
    };
  }

  addUser(user:IUser){
   
    this.service.addUser(user).pipe(catchError((err) => this.handleError(err)))
      .subscribe(response => {
        if (response > 0) {
          this.getUsers();
          this.getUserInfo(response);
        }
      });
  }

  onEditUser(userId: number) {
    this.renderDetail = false;
  }

  editUser(user:IUser){
   
    this.service.editUser(user).pipe(catchError((err) => this.handleError(err)))
      .subscribe(response => {
        if (response) {
          this.getUsers();
          this.getUserInfo(user.id);
        }
      });
  }

  private handleError(error: any) {
    this.errorReceived = true;
    return Observable.throw(error);
  }

  private openConfirmationDialog(userId: number) {
    this.confirmDialogSevice.confirm('', 'Are you sure you want to delete?')
      .then((confirmed) => {
        if (confirmed)
          this.deleteUser(userId);
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
