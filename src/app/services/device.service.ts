import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http'
import { Router }from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private _deviceconfigUrl = "http://localhost:3000/api/device"
  private _mapsviewUrl = "http://localhost:3000/api/maps"

  constructor(private http : HttpClient) { }

  getDeviceconfig(){
    return this.http.get<any>(this._deviceconfigUrl)
  }

  getMapsview(){
    return this.http.get<any>(this._mapsviewUrl)
  }



  //DEVICE CONFIGURATION ENTRY(add)
  postDeviceconfig(device){
    return this.http.post<any>(this._deviceconfigUrl,device)   //device--device api
  }
}
