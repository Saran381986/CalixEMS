import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import {AuthService} from './services/auth.service'
//injecting the auth service slightly different here bcz of some error will occur to avoid this we need to do differently
//1.import injector
//2.IN THE CONSTRUCTOR inject the injector
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


  constructor(private injector: Injector) { }

  intercept( req , next){
    let authService=this.injector.get(AuthService )
    let tokenizedReq = req.clone({
      setHeaders:{
        Autherization:`Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
