import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService} from './login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private loginService : LoginService,
  ) { }


  public getToken(){
    if (JSON.parse(localStorage.getItem('user')) == null) {
      return false;
    }
    return true;
  } 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var currentUser = this.getToken();
    // console.log('authguard', currentUser);
    if (currentUser) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
} 


}



