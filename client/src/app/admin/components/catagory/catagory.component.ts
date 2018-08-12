import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CatagoryService } from '../../../services/catagory.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.css']
})
export class CatagoryComponent implements OnInit {
  formCreateCatagory;
  formUpdateCatagory;

  query;
  sort;
  page = 1;
  pages;
  total;
  limit = 20;

  processing = false;

  messageClass;
  message;
  catagoryNameValid;
  catagoryNameMessage;

  listCatagory;
  selectedCatagory;

  constructor(
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.createFormCreateCatagory();
    this.createFormUpdateCatagory();
    this.getListCatagory();
  }
  createFormCreateCatagory() {
    this.formCreateCatagory = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])]
    });
  }

  createFormUpdateCatagory() {
    this.formUpdateCatagory = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])]
    });
  }

  // Function to disable the registration form
  disableFormCreateCatagory() {
    this.formCreateCatagory.controls['name'].disable();
  }
  // Function to enable the registration form
  enableFormCreateCatagory() {
    this.formCreateCatagory.controls['name'].enable();
  }


  async checkCatagoryName(action) {
    if ((this.formUpdateCatagory.controls.name.invalid && action === 'update')
      || (this.formCreateCatagory.controls.name.invalid && action === 'create')) {
      return;
    }
    let name = null;
    if (action === 'update') {
      name = this.formUpdateCatagory.get('name').value;
    } else if (action === 'create') {
      name = this.formCreateCatagory.get('name').value;
    }
    try {
      const response = await this.catagoryService.checkCatagoryName(name);
      this.catagoryNameValid = response.success;
      this.catagoryNameMessage = response.message; // Return error message
      this.getListCatagory();
    } catch (error) {
      this.catagoryNameValid = false; // Return username as invalid
      this.showMessageError(error);
    }
  }

  async onSumbitCreateCatagory() {
    this.processing = true;
    this.disableFormCreateCatagory();

    const catagory = {
      name: this.formCreateCatagory.get('name').value,
      parentid: 'super-parent'
    };

    try {
      const response = await this.catagoryService.createCatagory(catagory);
      this.showMessageSuccess(response.message);
      this.getListCatagory();
      this.processing = false; // Re-enable submit button
      this.enableFormCreateCatagory(); // Re-enable form
      this.createFormCreateCatagory();
    } catch (error) {
      this.showMessageError(error);
      this.processing = false; // Re-enable submit button
      this.enableFormCreateCatagory(); // Re-enable form
    }
  }

  async getListCatagory() {
    try {
      const response  = await this.catagoryService.getCatagories(this.query, this.page, this.limit, this.sort);
      this.listCatagory = response.data.docs;
      this.page = response.data.page;
      this.pages = response.data.pages;
      this.total = response.data.total;
    } catch (error) {
      this.showMessageError(error);
    }
  }

  async onDeleteCatagory() {
    try {
      const response = await this.catagoryService.deleteCatagory(this.selectedCatagory._id);
      this.showMessageSuccess(response.message);
      this.getListCatagory();
    } catch (error) {
      this.showMessageError(error);
    }
  }

  async onSumbitUpdateCatagory() {
    const catagory = {
      _id: this.selectedCatagory._id,
      name: this.formUpdateCatagory.get('name').value
      //  parentid: when upgrade
    };
    try {
      const response = await this.catagoryService.updateCatagory(catagory);
      this.showMessageSuccess(response.message);
      this.getListCatagory();
      this.createFormUpdateCatagory();
      this.refreshValid();
    } catch (error) {
      this.showMessageError(error);
    }
  }

  selectCatagory(catagory, action) {
    this.selectedCatagory = catagory;
    if (action === 'edit') {
      this.formUpdateCatagory.controls['name'].setValue(catagory.name);
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
    this.messageClass = null;
  }

  refreshValid() {
    this.catagoryNameValid = false;
    this.catagoryNameMessage = null;
  }
}
