import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private REST_API_SERVER = "http://127.0.0.1:8000";
  constructor(private httpClient: HttpClient) { }






  createTweet(data) {

    var user = JSON.parse(localStorage.getItem('user'));
    data['user'] = user.id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };

    return this.httpClient.post(this.REST_API_SERVER + "/api/v1/tweet/tweetlistcreate/", data, httpOptions)

  }


  userTweets() {

    var user = JSON.parse(localStorage.getItem('user'));
    // data['user'] = user.id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };

    return this.httpClient.get(this.REST_API_SERVER + "/api/v1/tweet/tweetlistcreate/", httpOptions)

  }


  followersTweets() {

    var user = JSON.parse(localStorage.getItem('user'));
    // data['user'] = user.id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };

    return this.httpClient.get(this.REST_API_SERVER + "/api/v1/tweet/tweetlistcreate/?followers", httpOptions)

  }


  getUsers() {
    // var user = JSON.parse(localStorage.getItem('user'));
    // data['user'] = user.id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };

    return this.httpClient.get(this.REST_API_SERVER + "/api/v1/user/users/", httpOptions)
  }

  getFollowers() {
    var user = JSON.parse(localStorage.getItem('user'));
    // data['user'] = user.id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };

    return this.httpClient.get(this.REST_API_SERVER + "/api/v1/tweet/userfollowerlistcreate/", httpOptions)
  }

  addFollower(id){

    var user = JSON.parse(localStorage.getItem('user'));
    let data = {}
    data['user'] = user.id;
    data['followers'] = [id];
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };

    return this.httpClient.post(this.REST_API_SERVER + "/api/v1/tweet/userfollowerlistcreate/", data, httpOptions)

  }



}


