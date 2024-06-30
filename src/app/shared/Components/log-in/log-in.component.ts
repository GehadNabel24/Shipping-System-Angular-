import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../Services/account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginData } from '../../Models/loginData';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent{

  isValid=true
  errorMessageService: any;
  showPassword=false


  constructor( private accountService:AccountService,private router:Router){}


  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })



  login(){

    const data:loginData={
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!

    }

    this.accountService.Login_Account(data).subscribe({
      next: (res) => {
        this.isValid=true
        this.accountService.handleLogin(res)
      },
      error: (err) => {
        this.isValid=false
        console.log(err)
      },



    })
  }


}
