import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {
  @Input() userdetail!: IUser;
  @Output() onDeleteUser = new EventEmitter();
  @Output() onEditUser = new EventEmitter();

  errorReceived:boolean=false
  userId!:number
  constructor() { }

  ngOnInit(): void {
        // this.getUserInfo();
  }


  deleteUser(userId:number){
     this.onDeleteUser.emit(userId);
  }

  editUser(userId:number){
    this.onEditUser.emit(userId);
  }
 
}
