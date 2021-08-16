import { Injectable } from '@angular/core';

import { DataService } from '../services/data.services';
import { IUserList } from '../models/userlist.model';
import { IUser } from '../models/user.model';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigurationService } from '../services/configuration.service';



@Injectable()
export class UsersService {
  private usersUrl: string = '';

  constructor(private service: DataService, private configService : ConfigurationService) {
        var settings = configService.getSetting();
        this.usersUrl = settings.userApiUrl;
  }

  getUsers(): Observable<IUserList> {
    let url = this.usersUrl;

    return this.service.get(url).pipe<IUserList>(tap((response: any) => {
      return response;
    }));
  }

  getUserDetails(userId:number): Observable<IUser> {
    let url = this.usersUrl + "/" + userId;
    
    return this.service.get(url).pipe<IUser>(tap((response: any) => {
      return response;
    }));
  }

  deleteUser(userId:number):Observable<boolean>{
    let url = this.usersUrl + "/" + userId;

    return this.service.delete(url).pipe<boolean>(tap((response: any) => {
      return response;
    }));;
  }

  addUser(user:IUser){
    let url = this.usersUrl;

    return this.service.post(url, user).pipe<number>(tap((response: any) => {
      return response;
    }));
  }

  editUser(user:IUser) : Observable<Number>{
    let url = this.usersUrl;

    return this.service.putWithId(url, user).pipe<Number>(tap((response: any) => {
      return response;
    }));
  }
}
