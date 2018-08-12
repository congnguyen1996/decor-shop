import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  formUpdatePw;
  commonImageUrl = environment.commonImageUrl;
  user;
  listRoleObj = {
    '0': 'Cụ tổ',
    '1': 'Bố bọn trẻ',
    '2': 'Mẹ bọn trẻ',
    '3': 'Bọn trẻ con'
  };

  processing = false;
  message;
  messageClass;

  constructor(
    public router: Router,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.createFormUpdatePw();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  createFormUpdatePw() {
    this.formUpdatePw = this.formBuilder.group({
      oldpw: ['', Validators.required],
      newpw: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validPassword
      ])],
      confirmpw: ['', Validators.compose([
        Validators.required
      ])]
    }, { validator: [this.matchingPasswords('newpw', 'confirmpw'), this.differentPasswords('oldpw', 'newpw')] });
  }

  // Function to disable the registration form
  disableFormUpdatePw() {
    this.formUpdatePw.controls['oldpw'].disable();
    this.formUpdatePw.controls['newpw'].disable();
    this.formUpdatePw.controls['confirmpw'].disable();
  }
  // Function to enable the registration form
  enableFormUpdatePw() {
    this.formUpdatePw.controls['oldpw'].enable();
    this.formUpdatePw.controls['newpw'].enable();
    this.formUpdatePw.controls['confirmpw'].enable();
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

  matchingPasswords(password, confirmpassword) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirmpassword].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true }; // Return as error: do not match
      }
    };
  }

  differentPasswords(oldpw, newpw) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[oldpw].value !== group.controls[newpw].value) {
        return null; // Return as a match
      } else {
        return { 'passwordNotChange': true }; // Return as error: do not match
      }
    };
  }

  removeMessage() {
    this.message = null;
    this.messageClass = null;
  }

  async onSubmitUpdatePw() {
    this.processing = true;
    this.disableFormUpdatePw();
    const data = {
      oldpw: this.formUpdatePw.controls['oldpw'].value,
      newpw: this.formUpdatePw.controls['newpw'].value
    };
    try {
      const response = await this.userService.updatePassword(data);
      this.message = response.message;
      this.messageClass = 'alert alert-success alert-dismissible'; // Set a success class
      this.authService.logout();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      this.message = JSON.parse(error).message;
      this.messageClass = 'alert alert-danger alert-dismissible'; // Set a success class
      this.processing = false; // Re-enable submit button
      this.enableFormUpdatePw(); // Re-enable form
    }
  }
}
