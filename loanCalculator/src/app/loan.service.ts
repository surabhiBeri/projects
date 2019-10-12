import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Loan } from './calculation/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  
  constructor(private http: HttpClient) { } 
  configUrl = '';

  getConfig(loanAmount,loanMonth) {
    this.configUrl = 'https://ftl-frontend-test.herokuapp.com/interest?amount='+loanAmount+'&numMonths='+loanMonth+'';
    return this.http.get(this.configUrl);
  }
  
}
