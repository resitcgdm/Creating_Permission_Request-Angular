import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  login:FormGroup|any;

constructor(private route:Router, private http:HttpClient,private toast:ToastrService) {}
// private toast:ToastrService
ngOnInit(): void {
  this.login =new FormGroup({
    'username':new FormControl(),
    'password':new FormControl()
  });

  
}
logindata(login:FormGroup)
 {
  // console.log(this.login.value);
  this.http.get<any>("http://localhost:3000/users")
  .subscribe(res=>{
    const user=res.find((a:any)=>{
      return a.username ===this.login.value.username && a.password === this.login.value.password
    });

    if(user) 
    {
      
       this.login.reset();
      $('.form-box').css('display','none');
      this.route.navigate(['dashboard']);
      this.toast.success('You are successfully login','Welcome');
    }
    else
     {
      this.toast.error('User not found','Invalid');
      
      this.route.navigate(['login']);
     }

  },err=>{
    alert('Something was wrong');
  })
 }

sbtn1() {

}


}
