import { HttpErrorResponse } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../services/device.service'
import { Router }from '@angular/router'



@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

//create property to store the list of device from db
 public  deviceConfig={ 
   deviceType: String,
   modelNo: String,
   modelName: String,
   capacity:String}
     
  
  constructor(private _device:DeviceService,
              private router:Router ) { }



    addDeviceconfig(){
      this._device.postDeviceconfig(this.deviceConfig)
      .subscribe(
        res=>{
          console.log(res)
          alert("Added Sucessfully")
        },
        err=>{
          return console.log(err);
        }
      )
    }





  ngOnInit(): void {
    this._device.getDeviceconfig()
    .subscribe(
      res=>console.log(res),
      //res=>this.deviceConfig=res,
      //err=>console.log(err),
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      },
    )
    
  }

}
