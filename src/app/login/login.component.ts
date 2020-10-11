import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData={
    email: String,
    password: String,
    rolename: String
  }
  constructor(private _auth: AuthService, private  _router: Router) { }

  ngOnInit() {
  }

  loginUser(){
    //console.log(this.loginUserData)
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token',res.token)         //res.token--response token from the server   
        this._router.navigate(['/device'])
      },
      err=>console.log(err)
    )
  }
}
