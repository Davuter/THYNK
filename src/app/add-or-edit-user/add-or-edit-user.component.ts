import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-add-or-edit-user',
  templateUrl: './add-or-edit-user.component.html',
  styleUrls: ['./add-or-edit-user.component.scss']
})
export class AddOrEditUserComponent implements OnInit {
  @Input() userdetail!: IUser;
  @Output() onAddUser = new EventEmitter();
  @Output() onEditUser = new EventEmitter();
  userForm!: FormGroup;
  cardImageBase64!:string;
  submitted:boolean = false;
  isImageSaved!: boolean;
  
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
      
    this.cardImageBase64 = this.userdetail.userPicture;
    this.isImageSaved = this.userdetail.id > 0;
      
      this.userForm = this.formBuilder.group({
        name: [this.userdetail.name, Validators.required],
        userPicture:[this.userdetail.userPicture,Validators.required],
        job: [this.userdetail.job, Validators.required],
        motto: [this.userdetail.motto],
        hobbies: [this.userdetail.hobbies],
        hometown: [this.userdetail.hometown],
        personalBlog: [this.userdetail.personalBlog],
        id:[this.userdetail.id]
    });
  }

  onFileChange(base64Image:string){
    this.userForm.controls["userPicture"].setValue(base64Image);
  }

  onReset(){

  }

  onSubmit() { 
    this.submitted = true; 
    
    
          // stop here if form is invalid
          if (this.userForm.invalid) {
            return;
        }
    if(this.userdetail.id > 0){
      this.onEditUser.emit(this.userForm.value);
    }else{
      this.onAddUser.emit(this.userForm.value);
    }
  }

  get f() { return this.userForm.controls; }
}
