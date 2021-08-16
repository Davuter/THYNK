import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IConfiguration } from '../models/configuration.model';


// Implementing a Retry-Circuit breaker policy 
// is pending to do for the SPA app
@Injectable()
export class ConfigurationService {
  constructor() { }

  getSetting() {
      //TODO : Read config settings from a file
        let settings:IConfiguration ={
            userApiUrl:"https://localhost:44355/api/users"
        }
        return settings;
  }
}
