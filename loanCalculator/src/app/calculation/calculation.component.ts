import { Component, OnInit } from '@angular/core';
import { Loan } from './loan';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {
  loan = new Loan();
  valid = true;
  isLoggedIn = 'false';
  localArray:any=[];  
  elements: any = [];
  result:any;
  reset=true;
  pastCalculation: boolean;
  
  headElements = ['Loan Amount', 'Loan Duration', 'Interest Rate', 'Monthly Payment'];
  constructor(public configService: LoanService) { 
  }
  onSubmit(){
      this.pastCalculation=true;
      if(this.loan.amount != undefined && this.loan.amount != null && this.loan.duration != undefined && this.loan.duration != null){ 
        this.configService.getConfig(this.loan.amount,this.loan.duration)
        .subscribe(result =>{ 
         if(result != undefined || result != null){
           this.result =result; 
           this.loan.interestRate=this.result.interestRate;
           this.loan.monthlyPayment=this.result.monthlyPayment.amount;
           this.loan.paymentCurrency=this.result.monthlyPayment.currency;

           if(localStorage.getItem("history") == null || localStorage.getItem("history") == undefined ){
            this.localArray.push(    {amount: this.loan.amount, duration: this.loan.duration, interestRate: this.result.interestRate, monthlyPaymentAmount: this.result.monthlyPayment.amount, monthlyPaymentCurrency: this.result.monthlyPayment.currency});
            localStorage.setItem("history", JSON.stringify(this.localArray));
           }
           else{ 
            this.localArray =  JSON.parse(localStorage.getItem("history"));  
            this.localArray.push( {amount: this.loan.amount, duration: this.loan.duration, interestRate: this.result.interestRate, monthlyPaymentAmount: this.result.monthlyPayment.amount, monthlyPaymentCurrency: this.result.monthlyPayment.currency}); 
            localStorage.setItem("history", JSON.stringify(this.localArray)); 
           }
         } 
        });
      }
  }
  onReset(){
  
  }
  ngOnInit() { 
    if(localStorage.getItem("history") == null || localStorage.getItem("history") == undefined ){
    }
    else{
      this.localArray =  JSON.parse(localStorage.getItem("history"));  
    }
  }

}
