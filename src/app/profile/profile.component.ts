import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public profileData : any = {};
  public editMode: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,

  ) { 
    this.generateProfileForm();
  }

  ngOnInit(): void {
    this.profileDetails();
    // this.generateProfileForm();    
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

  generateProfileForm() {
    this.profileForm = this.fb.group({
      last_login: [''],
      is_superuser: [''],
      username: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      is_active: [''],
      date_joined: [''],
      id: [''],
      email: ['', Validators.required]
    })
  }


  onSubmit(){
    this.editMode = true;
  }

  logOut(){
    this.loginService.logOutUser();
    this.router.navigate(['/login']);

  }

  onUpdate(){

    // this.submitted = true;


    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    // this.loading = true;
    console.log("here")

    this.loginService.userProfileUpdate(this.profileForm.value).subscribe(response => {
      console.log("response",response)
      this.profileData = response;
      console.log("updated profile Data", this.profileData);
      this.editMode = false;

    },
      error => {
        console.log("error ",error)

      }
    );

  }

}
