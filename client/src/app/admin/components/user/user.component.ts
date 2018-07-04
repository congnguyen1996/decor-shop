import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  messageClass;
  message;
  formCreateUser;

  listUser;
  page = 1;
  pages;
  total;
  limit = 20;
  processing = false;

  usernameValid;
  usernameMessage;

  selectedUser;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.createFormCreateUser();
    this.getUsers(null, this.page, this.limit, null);
  }
  createFormCreateUser() {
    this.formCreateUser = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        this.validUsername
      ])],
      fullname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validPassword
      ])]
    });
  }

  // Function to disable the registration form
  disableFormCreateUser() {
    this.formCreateUser.controls['username'].disable();
    this.formCreateUser.controls['fullname'].disable();
    this.formCreateUser.controls['password'].disable();
  }
  // Function to enable the registration form
  enableFormCreateUser() {
    this.formCreateUser.controls['username'].enable();
    this.formCreateUser.controls['fullname'].enable();
    this.formCreateUser.controls['password'].enable();
  }


  validUsername(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true }; // Return as invalid username
    }
  }

  validPassword(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true }; // Return as invalid password
    }
  }

  async checkUsername() {
    if (this.formCreateUser.controls.username.invalid) {
      return;
    }
    if (!this.formCreateUser.get('username').value) {
      this.usernameValid = false; // Return username as invalid
      return;
    }
    try {
      const response = await this.authService.checkUsername(this.formCreateUser.get('username').value);
      this.usernameValid = response.success;
      this.usernameMessage = response.message; // Return error message
    } catch (error) {
      this.usernameValid = false; // Return username as invalid
      this.messageClass = 'alert alert-danger alert-dismissible';
      this.message = JSON.parse(error).message;
    }
  }

  async onSumbitCreateUser() {
    this.processing = true;
    this.disableFormCreateUser();

    const user = {
      username: this.formCreateUser.get('username').value,
      fullname: this.formCreateUser.get('fullname').value,
      password: this.formCreateUser.get('password').value
    };

    try {
      const response = await this.authService.registerUser(user);
      this.messageClass = 'alert alert-success alert-dismissible'; // Set a success class
      this.message = response.message; // Set a success message
      this.getUsers(null, this.page, this.limit, null);
      this.processing = false; // Re-enable submit button
      this.enableFormCreateUser(); // Re-enable form
      this.createFormCreateUser();
    } catch (error) {
      this.messageClass = 'alert alert-danger alert-dismissible'; // Set an error class
      this.message = JSON.parse(error).message; // Set an error message
      this.processing = false; // Re-enable submit button
      this.enableFormCreateUser(); // Re-enable form
    }
  }

  async getUsers(query, page, limit, sort) {
    let params = '?';
    if (query) {
      params += '&query=' + query;
    }
    if (page) {
      params += '&page=' + page;
    }
    if (limit) {
      params += '&limit=' + limit;
    }
    if (sort) {
      params += '&sort=' + sort;
    }
    try {
      const response  = await this.userService.getUsers(params);
      this.listUser = response.data.docs;
      this.page = response.data.page;
      this.pages = response.data.pages;
      this.total = response.data.total;
    } catch (error) {
      this.messageClass = 'alert alert-danger alert-dismissible'; // Set an error class
      this.message = JSON.parse(error).message; // Set an error message
    }
  }

  async onDeleteUser() {
    try {
      await this.userService.deleteUser(this.selectedUser._id);
      this.messageClass = 'alert alert-success alert-dismissible'; // Set a success class
      this.message = 'The user is deleted'; // Set a success message
      this.getUsers(null, this.page, this.limit, null);
    } catch (error) {
      this.messageClass = 'alert alert-danger alert-dismissible'; // Set an error class
      this.message = JSON.parse(error).message; // Set an error message
    }
  }

  selectUser(user, action) {
    this.selectedUser = user;
  }

  removeMessage() {
    this.message = null;
    this.messageClass = null;
  }

}
