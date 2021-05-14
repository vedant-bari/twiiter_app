import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public tweet: string = '';
  public tweetList: any = [];
  public usersList: any =[];
  public followersList: any =[];
  public followerstweetList : any =[];
  public profileData : any = {};
  public editMode: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private loginService: LoginService,
  ) { 
    
  }


  

  ngOnInit(): void {
    this.profileData = JSON.parse(localStorage.getItem('user'));
    this.getTweetList();
    this.getAllUserslist();
    this.getFollowersTweetList();   
    this.getAllFollowerslist();
  }

  profileDetails() {
    
    this.loginService.userProfileDetail().subscribe(response => {
      console.log("response",response)
      this.profileData = response;
      console.log("profile Data", this.profileData);

    },
      error => {
        console.log("error ",error)

      }
    );
    
  }

  


  onSubmit(){
    console.log("tweet", this.tweet)
    this.profileService.createTweet({"text":this.tweet}).subscribe(
      resp=>{
         console.log("resp",resp) 
         this.tweetList.unshift(resp) 
      },
      error =>{
        console.log("resp",error) 
      }
    )
  }
  

  getTweetList(){
    console.log("tweet", this.tweet)
    this.profileService.userTweets().subscribe(
      resp=>{
         this.tweetList = resp; 
          
      },
      error =>{
        console.log("resp",error) 
      }
    )
  }

  getFollowersTweetList(){
    console.log("tweet", this.tweet)
    this.profileService.followersTweets().subscribe(
      resp=>{
         this.followerstweetList = resp; 
          
      },
      error =>{
        console.log("resp",error) 
      }
    )
  }

  getAllUserslist(){
    this.profileService.getUsers().subscribe(
      resp =>{
        console.log(resp)
        this.usersList = resp
    },
      error =>{
        console.log(error)
      }
  )    
  }

  getAllFollowerslist(){
    this.profileService.getFollowers().subscribe(
      resp =>{
        console.log(resp)
        this.followersList = resp
    },
      error =>{
        console.log(error)
      }
  )    
  }

  addFollower(id){
    console.log("user_id", id);
    this.profileService.addFollower(id).subscribe(
      resp=>{
        console.log("resp",resp)
        let follower_index = this.usersList.findIndex(o => o.id === id);
        console.log("index",follower_index);
        this.usersList.splice(follower_index,1);
        
        
      }
    )
  }

  logOut(){
    this.loginService.logOutUser();
    this.router.navigate(['/login']);

  }



  

}
