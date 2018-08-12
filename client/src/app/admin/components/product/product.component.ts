import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CatagoryService } from '../../../services/catagory.service';
import { FileUploadService } from '../../../services/file-upload.service';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  formCreateProduct;
  formUpdateProduct;

  //
  query = null;
  sort = '{"createat": "desc"}';
  page = 1;
  pages;
  total;
  limit = 20;

  processing = false;

  messageClass;
  message;
  productIdValid;
  productIdMessage;

  listProduct;
  selectedProduct;
  listCatagory;
  listUser;
  listCatagoryObj = {};
  listUserObj = {};

  filesToUpload: Array<File> = [];
  previewFileUpload = [];

  filterInput = {
    filterByCatagory: 'all'
  };
  sortInput = {
    sortByDate: 'desc'
  };
  searchInput;
  productImagesUrl = environment.productImageUrl + 'x30/';
  previewImageUrl = environment.productImageUrl + 'x720/';

  constructor(
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private productService: ProductService,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
  }

  ngOnInit() {
    this.getListProduct();
    this.getListCatagory();
    this.getListUser();
    this.createFormCreateProduct();
    this.createFormUpdateProduct(null, null, null, 'VND', null, null);
  }

  // Function to create form update product
  createFormUpdateProduct(id: String, name: String, catagoryid: String, priceunit: String, pricevalue: String, detail: String): void {
    this.formUpdateProduct = this.formBuilder.group({
      id: [id, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])],
      name: [name, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
      catagoryid: [catagoryid, Validators.required],
      priceunit: [priceunit, Validators.required],
      pricevalue: [pricevalue, Validators.required],
      detail: [detail, Validators.required]
    });
  }

  // Function to create form add a new product
  createFormCreateProduct() {
    this.formCreateProduct = this.formBuilder.group({
      id: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
      catagoryid: [null, Validators.required],
      priceunit: ['VND', Validators.required],
      pricevalue: ['', Validators.required],
      detail: ['', Validators.required]
    });
  }

  // Function to disable the registration form
  disableFormCreateProduct() {
    this.formCreateProduct.controls['id'].disable();
    this.formCreateProduct.controls['name'].disable();
    this.formCreateProduct.controls['catagoryid'].disable();
    this.formCreateProduct.controls['priceunit'].disable();
    this.formCreateProduct.controls['pricevalue'].disable();
    this.formCreateProduct.controls['detail'].disable();
  }
  // Function to enable the registration form
  enableFormCreateProduct() {
    this.formCreateProduct.controls['id'].enable();
    this.formCreateProduct.controls['name'].enable();
    this.formCreateProduct.controls['catagoryid'].enable();
    this.formCreateProduct.controls['priceunit'].enable();
    this.formCreateProduct.controls['pricevalue'].enable();
    this.formCreateProduct.controls['detail'].enable();
  }

  // Function to disable the registration form
  disableFormUpdateProduct() {
    this.formUpdateProduct.controls['id'].disable();
    this.formUpdateProduct.controls['name'].disable();
    this.formUpdateProduct.controls['catagoryid'].disable();
    this.formUpdateProduct.controls['priceunit'].disable();
    this.formUpdateProduct.controls['pricevalue'].disable();
    this.formUpdateProduct.controls['detail'].disable();
  }
  // Function to enable the registration form
  enableFormUpdateProduct() {
    this.formUpdateProduct.controls['id'].enable();
    this.formUpdateProduct.controls['name'].enable();
    this.formUpdateProduct.controls['catagoryid'].enable();
    this.formUpdateProduct.controls['priceunit'].enable();
    this.formUpdateProduct.controls['pricevalue'].enable();
    this.formUpdateProduct.controls['detail'].enable();
  }

  // Function to check product's id when create a new or update product
  async checkProductId(action) {
    if ((this.formUpdateProduct.controls.id.invalid && action === 'update')
      || (this.formCreateProduct.controls.id.invalid && action === 'create')) {
      return;
    }
    let id = null;
    if (action === 'update') {
      id = this.formUpdateProduct.get('id').value;
      if (this.selectedProduct.id === id) {
        return true;
      }
    } else if (action === 'create') {
      id = this.formCreateProduct.get('id').value;
    }
    try {
      const response = await this.productService.checkProductId(id);
      this.productIdValid = response.success;
      this.productIdMessage = response.message; // Return error message
      this.getListProduct();
    } catch (error) {
      this.productIdValid = false; // Return username as invalid
      this.showMessageError(error);
    }
  }

  // Funtion to submit data of form add product to the Server
  async onSumbitCreateProduct() {
    this.processing = true;
    this.disableFormCreateProduct();

    const product = {
      id: this.formCreateProduct.get('id').value,
      name: this.formCreateProduct.get('name').value,
      catagoryid: this.formCreateProduct.get('catagoryid').value,
      priceunit: this.formCreateProduct.get('priceunit').value,
      pricevalue: this.formCreateProduct.get('pricevalue').value,
      detail: this.formCreateProduct.get('detail').value,
      images: null
    };
    try {
      const responseImages = await this.fileUploadService.uploadProductImages(this.filesToUpload);
      product.images = responseImages.data;
      const response = await this.productService.createProduct(product);
      // refresh data of page and show message dialog
      this.getListProduct();
      this.enableFormCreateProduct(); // Re-enable form
      this.refreshFormProduct();
      this.showMessageSuccess(response.message);
      this.refreshValid();
    } catch (error) {
      this.showMessageError(error);
      this.refreshFormProduct();
    }
  }

  // Function to get products with option of this
  async getListProduct() {
    try {
      const response  = await this.productService.getProducts(this.query, this.searchInput, this.page, this.limit, this.sort);
      this.listProduct = response.data.docs;
      this.page = response.data.page;
      this.pages = response.data.pages;
      this.total = response.data.total;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to get list user
  async getListUser() {
    try {
      const response  = await this.userService.getUsers(null, null, null, null);
      this.listUser = response.data.docs;
      this.getListUserObj();
    } catch (error) {
      console.log(error);
    }
  }

  // Function to get list catagory
  async getListCatagory() {
    try {
      const response  = await this.catagoryService.getCatagories(null, null, null, null);
      this.listCatagory = response.data.docs;
      this.getListCatagoryObj();
    } catch (error) {
      console.log(error);
    }
  }

  // Function to delete a product
  async onDeleteProduct() {
    try {
      const response = await this.productService.deleteProduct(this.selectedProduct._id);
      this.showMessageSuccess(response.message);
      this.getListProduct();
    } catch (error) {
      this.showMessageError(error);
    }
  }

  // Funtion to submit data when update a product
  async onSumbitUpdateProduct() {
    this.processing = true;
    this.disableFormUpdateProduct();

    const product = {
      _id: this.selectedProduct._id,
      id: this.formUpdateProduct.get('id').value,
      name: this.formUpdateProduct.get('name').value,
      catagoryid: this.formUpdateProduct.get('catagoryid').value,
      priceunit: this.formUpdateProduct.get('priceunit').value,
      pricevalue: this.formUpdateProduct.get('pricevalue').value,
      detail: this.formUpdateProduct.get('detail').value,
      images: this.selectedProduct.images
    };
    try {
      if (this.filesToUpload.length > 0) {
        const responseImages = await this.fileUploadService.uploadProductImages(this.filesToUpload);
        product.images = [...product.images, ...responseImages.data];
      }
      const response = await this.productService.updateProduct(product);
      this.showMessageSuccess(response.message);
      this.getListProduct();
      this.refreshFormProduct();
      this.refreshValid();
    } catch (error) {
      this.showMessageError(error);
      this.refreshFormProduct();
    }
  }

  // Function to select a product when click a action button
  selectProduct(product, action: String) {
    this.selectedProduct = JSON.parse(JSON.stringify(product));
    if (action === 'edit') {
      this.enableFormUpdateProduct();
      this.createFormUpdateProduct(this.selectedProduct.id,
        this.selectedProduct.name, this.selectedProduct.catagoryid,
        this.selectedProduct.price.unit, this.selectedProduct.price.value,
        this.selectedProduct.detail);
      this.productIdValid = true;
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
    this.productIdValid = false;
    this.productIdMessage = null;
  }

  refreshFormProduct() {
    this.filesToUpload = [];
    this.previewFileUpload = [];
    this.selectedProduct = null;
    this.processing = false; // Re-enable submit button
  }

  onFileSelected(event) {
    this.filesToUpload  = <Array<File>>event.target.files;
    this.previewFileUpload = [];
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.setupReader(this.filesToUpload[i]);
    }
  }

  setupReader(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewFileUpload.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
  getListCatagoryObj() {
    for (let i = 0; i < this.listCatagory.length; i++) {
      this.listCatagoryObj[this.listCatagory[i]._id] = this.listCatagory[i];
    }
  }

  getListUserObj() {
    for (let i = 0; i < this.listUser.length; i++) {
      this.listUserObj[this.listUser[i]._id] = this.listUser[i];
    }
  }

  filterByCatagory() {
    if (this.filterInput.filterByCatagory === 'all') {
      this.query = null;
    } else {
      this.query = '{"catagoryid": "'  + this.filterInput.filterByCatagory + '"}';
    }
    this.getListProduct();
  }

  sortByDate() {
    this.sort = '{"createat": "' + this.sortInput.sortByDate + '"}';
    this.getListProduct();
  }

  setPage(n) {
    this.page = n;
    this.getListProduct();
  }

  searchProducts(e) {
    if (e.keyCode === 13) {
      this.page = 1;
      this.getListProduct();
    }
  }

  removeFileImage(index) {
    this.selectedProduct.images.splice(index, 1);
  }
}
