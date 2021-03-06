import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin;

  messageClass;
  message;

  processing = false;
  isSubmitLogin = false;

  previousUrl;
  invalidCounter = 5;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private  authGuard: AuthGuard,
    public router: Router
  ) { }

  async ngOnInit() {
    this.createFormLogin();
    if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger'; // Set error message: need to login
      this.message = 'You must be logged in to view that page.'; // Set message
      this.previousUrl = this.authGuard.redirectUrl; // Set the previous URL user was redirected from
      this.authGuard.redirectUrl = undefined; // Erase previous URL
    }
    if (await this.authService.loggedIn()) {
      if (this.previousUrl) {
        this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
      } else {
        this.router.navigate(['/admin/user']); // Navigate to dashboard view
      }
    }
  }

  createFormLogin() {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Function to disable form
  disableFormLogin() {
    this.formLogin.controls['username'].disable(); // Disable username field
    this.formLogin.controls['password'].disable(); // Disable password field
  }

  // Function to enable form
  enableFormLogin() {
    this.formLogin.controls['username'].enable(); // Enable username field
    this.formLogin.controls['password'].enable(); // Enable password field
  }

  async onSubmitLogin() {
    if (this.invalidCounter <= 0) {
      this.messageClass = 'alert alert-danger alert-dismissible';
      this.message = 'You have been wrong too many times, try later!';
      // block this account
      return;
    }
    if (this.formLogin.invalid) {
      this.isSubmitLogin = true;
      return;
    }
    this.processing = true;
    this.disableFormLogin();
    const user = {
      username: this.formLogin.get('username').value,
      password: this.formLogin.get('password').value
    };
    try {
      const response = await this.authService.login(user);
      if (!response.success) {
        this.messageClass = 'alert alert-danger alert-dismissible'; // Set bootstrap error class
        this.message = response.message; // Set error message
        this.processing = false; // Enable submit button
        this.enableFormLogin(); // Enable form for
        this.formLogin.controls['password'].setValue('');
        this.invalidCounter--;
      } else {
        this.showMessageSuccess(response.message);
        // Function to store user's token in client local storage
        this.authService.storeUserData(response.data.token, response.data.user);
        // After 1 seconds, redirect to dashboard page
        setTimeout(() => {
          // Check if user was redirected or logging in for first time
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
          } else {
            this.router.navigate(['/admin/user']); // Navigate to dashboard view
          }
        }, 1000);
      }
    } catch (error) {
      this.showMessageError(error);
      this.processing = false; // Enable submit button
      this.enableFormLogin(); // Enable form for editting
    }
  }

  // Show message success
  showMessageSuccess(message) {
    this.messageClass = 'alert alert-success alert-dismissible'; // Set a success class
    this.message = message; // Set a success message
  }

  // Show message error
  showMessageError(error) {
    this.messageClass = 'alert alert-danger alert-dismissible'; // Set an error class
    this.message = JSON.parse(error).message; // Set an error message
  }

  removeMessage() {
    this.message = null;
    this.messageClass = '';
  }
}
