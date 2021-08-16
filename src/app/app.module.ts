import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { DataService } from './services/data.services';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ConfigurationService } from './services/configuration.service';
import { ConfirmationDialogService } from './confirm-dialog/confirm-dialog.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AddOrEditUserComponent } from './add-or-edit-user/add-or-edit-user.component';
import { ImageuploaderComponent } from './imageuploader/imageuploader.component';

@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    ConfirmDialogComponent,
    UserdetailsComponent,
    AddOrEditUserComponent,
    ImageuploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule
  ],
  providers: [DataService, ConfigurationService, ConfirmationDialogService,UserdetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
