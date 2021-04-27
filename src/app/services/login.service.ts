import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private REST_API_SERVER = "http://127.0.0.1:8000";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + (localStorage.getItem('token') || null),
    })
  };


  constructor(private httpClient: HttpClient) { }

  userLogin(data){
    return this.httpClient.post(this.REST_API_SERVER+"/rest-auth/login/ ",data,this.httpOptions)

  }

  userVerifyCode(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };
    // const verification_code = data
    return this.httpClient.get(this.REST_API_SERVER+"/api/v1/user/verify-code/?verfication_code=" + data,httpOptions)

  }

  
  userProfileDetail(){
    // http://localhost:8000/api/v1/user/users/ff5a671d-154c-499f-bec4-adc67e19ef97/
    var user = JSON.parse(localStorage.getItem('user'))
    return this.httpClient.get(this.REST_API_SERVER+"/api/v1/user/users/"+ user['id']+"/",this.httpOptions)

  }

  userProfileUpdate(data){
    // http://localhost:8000/api/v1/user/users/ff5a671d-154c-499f-bec4-adc67e19ef97/
    var user = JSON.parse(localStorage.getItem('user'));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };
    // this.httpOptions.update({"Authorization": localStorage.getItem('token')});
    return this.httpClient.patch(this.REST_API_SERVER+"/api/v1/user/users/"+ user['id']+"/",data,httpOptions)

  }


  logOutUser() {
    // remove user from local storage and set current user to null
    if (localStorage.getItem('user') === null){
      return true;
    }
    localStorage.removeItem('user');
    
    
  }

}
