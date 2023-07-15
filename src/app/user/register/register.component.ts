import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public name =  new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  public email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public age =  new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  public password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  public confirmPassword = new FormControl('', [
    Validators.required,
  ]);
  public phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);

  public registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber,
  });

  public isSubmitted: boolean = false;
  public alertMessage: string = 'Please wait! Your account is being created.';
  public alertColor: string = 'blue';

  public register(): void {
    this.isSubmitted = true;
    this.alertMessage = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
  }
}
