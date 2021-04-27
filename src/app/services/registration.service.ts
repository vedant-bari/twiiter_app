import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  private REST_API_SERVER = "http://127.0.0.1:8000/rest-auth/registration/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'my-auth-token'
    })
  };
  constructor(private httpClient: HttpClient) { }

  userRegistration(user_data){
    return this.httpClient.post(this.REST_API_SERVER,user_data,this.httpOptions);

  }
}
