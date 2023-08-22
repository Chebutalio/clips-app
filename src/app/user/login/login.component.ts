import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup | null = null;
  public inSubmission: boolean = false;
  public isSubmitted: boolean = false;
  public alertMessage: string = 'Please wait! We are logging you in.';
  public alertColor: string = 'blue';

  public email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g),
  ]);
  public password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);

  constructor(
    private auth: AngularFireAuth,
  ) {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  public async login() {
    this.isSubmitted = true;
    this.alertMessage = 'Please wait! We are logging you in.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      if (this.loginForm) {
        await this.auth.signInWithEmailAndPassword(
          this.loginForm.value.email as string, this.loginForm.value.password as string
        )
      }
    } catch(error) {
      console.error(error);

      this.alertMessage = 'An unexpected error occurred. Please try again later.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMessage = 'Success! You are now logged in!';
    this.alertColor = 'green';
  }
}
