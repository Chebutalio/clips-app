import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../services/auth.service";

import IUser from "../../shared/interfaces/user.interface";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private auth: AuthService,
  ) {
    this.registerForm = new FormGroup({
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber,
    });
  }
  public registerForm: FormGroup | null = null;
  public inSubmission: boolean = false;

  public name =  new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  public email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public age =  new FormControl<number | null>(null, [
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

  public isSubmitted: boolean = false;
  public alertMessage: string = 'Please wait! Your account is being created.';
  public alertColor: string = 'blue';

  public async register() {
    if (this.registerForm) {
      this.isSubmitted = true;
      this.alertMessage = 'Please wait! Your account is being created.';
      this.alertColor = 'blue';
      this.inSubmission = true;

      try {
        await this.auth.createUser(this.registerForm.value as IUser);
      } catch(error) {
        console.log(error);

        this.alertMessage = 'An unexpected error occurred. Please try again later.';
        this.alertColor = 'red';
        this.inSubmission = false;
        return;
      }

      this.alertMessage = 'Success! Your account has been created.';
      this.alertColor = 'green';
    }
  }
}
