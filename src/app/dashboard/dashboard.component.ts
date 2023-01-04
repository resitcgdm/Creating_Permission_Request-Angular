import { Component,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl,FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $:any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date:FormGroup|any;

  constructor( private http:HttpClient,private toast:ToastrService) {}

ngOnInit(): void {
  // $('.date-box').css('display','none');
  this.date =new FormGroup({
    'date':new FormControl(),
    
  });
  
}

leaveBalance:boolean=false;
applyLeave:boolean=true;
 fromDate=new Date();
toDate=new Date();
days:any;
todateSec:any;
fromdateSec:any;
millisecondsPerDay:any;
diff:any;
weeks:any;
leaveDays:any;
izin:any;



logindata(date:FormGroup) 
{
  this.http.get<any>("http://localhost:3000/users")
  .subscribe(res=>{
    const Limit=res.find((a:any)=>{
      return a.dayLimit < this.leaveDays 
    });
    if(Limit) 
    {
       this.toast.error('Permission request invalid','Invalid',{
        timeOut:5000,
        progressBar:true

       });
      
    }
    else 
    {
      this.toast.success('Your permission request has been submitted','Success',{
        timeOut:5000,
        progressBar:true
      });
    }
  },err=>
  {
     alert('Something was wrong'); 
  })
}

onKeyUpfromdate(event: any) {
  this.fromDate = event.target.value;
 
  this.todateSec = new Date(this.toDate);
  this.fromdateSec = new Date(this.fromDate);
  
   if (this.todateSec < this.fromdateSec)
   alert('To date must be grater that from date!');
   
   
   

  this.millisecondsPerDay = 86400 * 1000; 
  this.fromdateSec.setHours(0,0,0,1); 
  this.todateSec.setHours(23,59,59,999); 
  this.diff = this.todateSec - this.fromdateSec; 
  this.days = Math.ceil(this.diff / this.millisecondsPerDay);
   
  
  this.weeks = Math.floor(this.days / 7);
  this.days = this.days - (this.weeks * 2);
   
 
  this.fromdateSec = this.fromdateSec.getDay();
  this.todateSec = this.todateSec.getDay();
   
  
  if (this.fromdateSec - this.todateSec > 1) 
  this.days = this.days - 2; 
   
  
  if (this.fromdateSec == 0 && this.todateSec != 6)
  this.days = this.days - 1; 
   
  
  if (this.todateSec == 6 && this.fromdateSec != 0){
  this.days = this.days - 1 ;
  }
  this.leaveDays = this.days;
  if(this.leaveDays =='NaN' || this.leaveDays =='' || this.leaveDays <='0' || this.leaveDays =='undefined'){
  this.leaveDays ='';
  }else{
  this.leaveDays = this.days;
  }
  
   
  }
   
  onKeyUptoDate(event: any) {
  this.toDate = event.target.value;
  // console.log(this.toDate);
  //alert(this.toDate);
  //alert(this.fromDate);
   
  this.todateSec = new Date(this.toDate);
  this.fromdateSec = new Date(this.fromDate);
   
  if (this.todateSec < this.fromdateSec)
  alert('To date must be grater that from date!');
   
 
  this.millisecondsPerDay = 86400 * 1000; 
  this.fromdateSec.setHours(0, 0, 0, 1); 
  this.todateSec.setHours(23, 59, 59, 999); 
  this.diff = this.todateSec - this.fromdateSec; 
  this.days = Math.ceil(this.diff / this.millisecondsPerDay);
   
  
  this.weeks = Math.floor(this.days / 7);
  this.days = this.days - (this.weeks * 2);
   
 
  this.fromdateSec = this.fromdateSec.getDay();
  this.todateSec = this.todateSec.getDay();
   
   
  if (this.fromdateSec - this.todateSec > 1) 
  this.days = this.days - 2; 
   

  if (this.fromdateSec == 0 && this.todateSec != 6)
  this.days = this.days - 1; 
   
  
  if (this.todateSec === 6 && this.fromdateSec !== 0) {
  this.days = this.days - 1 ;
  }
  this.leaveDays = this.days;
  if ( this.leaveDays === 'NaN' || this.leaveDays === '' || this.leaveDays <= '0' || this.leaveDays =='undefined'){
  this.leaveDays = '';
  } else {
  this.leaveDays = this.days;
  }
  
  }



}
