import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  messageClass;
  message;
  formCreateUser;
  formUpdateUser;

  listUser;
  page = 1;
  pages;
  total;
  limit = 20;
  processing = false;

  usernameValid;
  usernameMessage;

  selectedUser;
  listRole = [
    {rolekey: '0', rolevalue: 'Cụ tổ'},
    {rolekey: '1', rolevalue: 'Bố bọn trẻ'},
    {rolekey: '2', rolevalue: 'Mẹ bọn trẻ'},
    {rolekey: '3', rolevalue: 'Bọn trẻ con'}
  ];

  listRoleObj = {
    '0': 'Cụ tổ',
    '1': 'Bố bọn trẻ',
    '2': 'Mẹ bọn trẻ',
    '3': 'Bọn trẻ con'
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createFormCreateUser();
    this.createFormUpdateUser();
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
      ])],
      role: ['0', Validators.required],
    });
  }

  createFormUpdateUser() {
    this.formUpdateUser = this.formBuilder.group({
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
      role: ['0', Validators.required],
    });
  }

  // Function to disable the registration form
  disableFormCreateUser() {
    this.formCreateUser.controls['username'].disable();
    this.formCreateUser.controls['fullname'].disable();
    this.formCreateUser.controls['password'].disable();
    this.formCreateUser.controls['role'].disable();
  }
  // Function to enable the registration form
  enableFormCreateUser() {
    this.formCreateUser.controls['username'].enable();
    this.formCreateUser.controls['fullname'].enable();
    this.formCreateUser.controls['password'].enable();
    this.formCreateUser.controls['role'].enable();
  }

  // Function to disable the updation form
  disableFormUpdateUser() {
    this.formUpdateUser.controls['username'].disable();
    this.formUpdateUser.controls['fullname'].disable();
    this.formUpdateUser.controls['role'].disable();
  }
  // Function to enable the updation form
  enableFormUpdateUser() {
    this.formUpdateUser.controls['username'].enable();
    this.formUpdateUser.controls['fullname'].enable();
    this.formUpdateUser.controls['role'].enable();
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

  async checkUsername(action) {
    if ((this.formCreateUser.controls.username.invalid && action === 'create')
      || (this.formUpdateUser.controls.username.invalid && action === 'update')) {
      return;
    }
    let username = null;
    if (action === 'create') {
      username = this.formCreateUser.get('username').value;
    } else if (action === 'update') {
      username = this.formUpdateUser.get('username').value;
      if (username === this.selectedUser.username) {
        this.usernameValid = true;
        this.usernameMessage = null;
        return;
      }
    }
    try {
      const response = await this.authService.checkUsername(username);
      this.usernameValid = response.success;
      this.usernameMessage = response.message;
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
      password: this.formCreateUser.get('password').value,
      role: this.formCreateUser.get('role').value
    };

    try {
      const response = await this.authService.registerUser(user);
      this.messageClass = 'alert alert-success alert-dismissible'; // Set a success class
      this.message = response.message; // Set a success message
      this.getUsers(null, this.page, this.limit, null);
      this.processing = false; // Re-enable submit button
      this.usernameValid = true;
      this.usernameMessage = null;
      this.enableFormCreateUser(); // Re-enable form
      this.createFormCreateUser();
    } catch (error) {
      this.messageClass = 'alert alert-danger alert-dismissible'; // Set an error class
      this.message = JSON.parse(error).message; // Set an error message
      this.processing = false; // Re-enable submit button
      this.enableFormCreateUser(); // Re-enable form
    }
  }

  async onSumbitUpdateUser() {
    const user = {
      _id: this.selectedUser._id,
      username: this.formUpdateUser.get('username').value,
      fullname: this.formUpdateUser.get('fullname').value,
      role: this.formUpdateUser.get('role').value
    };
    if (this.selectedUser.username === user.username
    && this.selectedUser.fullname === user.fullname
    && this.selectedUser.role === user.role) {
      this.message = 'Nothing changed';
      this.messageClass = 'alert alert-danger alert-dismissible'; // Set an error class
      return;
    }
    this.processing = true;
    this.disableFormUpdateUser();
    try {
      const response = await this.userService.updateUser(user);
      this.messageClass = 'alert alert-success alert-dismissible'; // Set a success class
      this.message = response.message; // Set a success message
      this.getUsers(null, this.page, this.limit, null);
      this.processing = false; // Re-enable submit button
      this.usernameValid = true;
      this.usernameMessage = null;
      // this.enableFormUpdateUser(); // Re-enable form
      // this.createFormUpdateUser();
    } catch (error) {
      this.messageClass = 'alert alert-danger alert-dismissible'; // Set an error class
      this.message = JSON.parse(error).message; // Set an error message
      this.processing = false; // Re-enable submit button
      this.enableFormUpdateUser(); // Re-enable form
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
    if (action === 'update') {
      this.formUpdateUser.controls['username'].setValue(user.username);
      this.formUpdateUser.controls['fullname'].setValue(user.fullname);
      this.formUpdateUser.controls['role'].setValue(user.role);
      this.usernameValid = true;
    }
  }

  removeMessage() {
    this.message = null;
    this.messageClass = null;
  }

  getRole(key) {
    this.listRole.forEach(item => {
      if (item.rolekey === key) {
        return item.rolevalue;
      }
    });
    return null;
  }
}
