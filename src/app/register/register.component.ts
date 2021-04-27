import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public submitted: boolean = false;
  public loader: boolean = false;
  public errorFlag:boolean = false;
  public errorMessage ={};
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: RegistrationService,
  ) { }

  ngOnInit(): void {
    this.generateRegistrationForm()

  }


  generateRegistrationForm() {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  get f() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;
    this.loader = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    
    console.log("here")
    setTimeout(() => {
      console.log('hello');
    }, 5000);
  

    this.service.userRegistration(this.registerForm.value).subscribe(response => {
      console.log("success",response);
      this.loader = false;
      this.router.navigate(['/login'])
      // localStorage.setItem('token', response["token"]);
      // // localStorage.setItem('user', response["user"]);
      // console.log("token",localStorage.getItem('token'));
      
    },
      error => {
        this.loader = false;
        this.errorMessage =error.error.email[0];
        this.errorFlag = true;
        console.log("error", error.error.email[0])
      }
    );

  }


}
