import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Customer } from './customer';
import { debounceTime } from 'rxjs';


// function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
//   const emailControl=c.get("email");
//   const confirmControl=c.get("confirmEmail");
//   if(emailControl.pristine===confirmControl.pristine)
//   {
//     return null;
//   }
//   if(emailControl.value===confirmControl.value)
//   {
//     return null;
//   }
//   return {match:null};
// }

function ratingRange(min:number, max:number): ValidatorFn{
  return (c:AbstractControl): { [key: string]: boolean } | null => {
       if(c.value!=null &&(isNaN (c.value) || c.value<1 || c.value > 5)){
        return {'range':true};
      }
      return null;
    };
}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}

// function ratingRange(c:AbstractControl): { [key: string]: boolean } | null {
//   if(c.value!=null &&(isNaN (c.value) || c.value<1 || c.value > 5)){
//     return {'range':true};
//   }
//   return null;
// }

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  
  get addresses():FormArray{
    return <FormArray>this.customerForm.get("addresses");
  }
  constructor(private fb:FormBuilder) { }

  

  ngOnInit() {
    this.customerForm=this.fb.group({
      firstName:["",Validators.required,Validators.minLength(3)],
      lastName:["",Validators.required,Validators.maxLength(50)],
      emailGroup:this.fb.group({
        email:["",Validators.required,Validators.email],
        confirmEmail:["",Validators.required  ],
      }, {validator:emailMatcher}),
      phone:'',
      notification:'email',
      //rating:[null, [Validators.min(1),Validators.max(5)]],
      rating:[null,ratingRange(1,5)],
      sendCatalog:true,
      addresses:this.fb.array([this.buildAddress]),
     });
  
  this.customerForm.get("nofication").valueChanges.subscribe((value)=>
    this.nofication(value)
  );

  const emailControl=this.customerForm.get("emailGroup.email");
  emailControl.valueChanges
    .pipe(debounceTime(1000))
    .subscribe((value)=>this.setMessage(emailControl));

  }
  nofication(value: any) {
    throw new Error('Method not implemented.');
  }
  setMessage(emailControl: AbstractControl<any, any>): void {
    throw new Error('Method not implemented.');
  }

  buildAddress(): FormGroup{
    return this.fb.group({
      addressType:'home',
      street1:"",
      street2:"",
      city:"",
      state:"",
      zip:""
    })
  }
  populateTestData():void{
    this.customerForm=this.fb.group({
    firstName:"Jack",
    lastName:"Lastname",
    email:"kul@SafeSubscriber.com",
    sendCatalog:false,
   });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setNofitication(notifyVia: string):void{
    const phoneControl=this.customerForm.get("phone");
    if(notifyVia=="text"){
        phoneControl.setValidators(Validators.required);
    }
    else{
        phoneControl.clearValidators();
    }
  }
}
