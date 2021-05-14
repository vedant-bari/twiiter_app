import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { LoginService} from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm: FormGroup;
  public submitted: boolean = false;
  public loader: boolean = true;
  public otpsend: boolean = false;
  public errorFlag: boolean = false;
  public verification_code: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService : LoginService,
  ) { }

  ngOnInit(): void {
    this.generateLoginForm();
  }


  generateLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  get f() { return this.loginForm.controls; }


  

  onSubmit() {
    this.submitted = true;
   

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loader = true;
    console.log("here")
    this.loginService.userLogin(this.loginForm.value).subscribe(response =>{
      console.log(response)
      localStorage.setItem('token', response["token"]);
      localStorage.setItem('user', JSON.stringify(response["user"]));
      this.router.navigate(['/profile'])
      this.loader = false;
      
      
      
    },
    error =>{
      this.errorFlag = true;
      console.log("error", error)

    }
    );
      
  }

}