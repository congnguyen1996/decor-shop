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
  previewProductImages = [];

  filterInput = {
    filterByCatagory: 'all'
  };
  sortInput = {
    sortByDate: 'desc'
  };
  searchInput;
  productImagesUrl = environment.productImageUrl + 'x30/';

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
    this.createFormUpdateProduct();
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
      priceunit: ['DOLLAR', Validators.required],
      pricevalue: ['', Validators.required],
      detail: ['', Validators.required]
    });
  }

  // Function to create form update product
  createFormUpdateProduct() {
    this.formUpdateProduct = this.formBuilder.group({
      id: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])]
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

  // Function to check product's id when create a new or update product
  async checkProductId(action) {
    if ((this.formUpdateProduct.controls.id.invalid && action === 'update')
      || (this.formCreateProduct.controls.id.invalid && action === 'create')) {
      return;
    }
    let id = null;
    if (action === 'update') {
      id = this.formUpdateProduct.get('id').value;
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
      this.refreshFormCreateProduct();
      this.showMessageSuccess(response.message);
    } catch (error) {
      this.showMessageError(error);
      this.refreshFormCreateProduct();
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
    const Product = {
      _id: this.selectedProduct._id,
      id: this.formUpdateProduct.get('id').value
      //  parentid: when upgrade
    };
    try {
      const response = await this.productService.updateProduct(Product);
      this.showMessageSuccess(response.message);
      this.getListProduct();
      this.createFormUpdateProduct();
      this.refreshValid();
    } catch (error) {
      this.showMessageError(error);
    }
  }

  // Function to select a product when click a action button
  selectProduct(product, action: String) {
    this.selectedProduct = product;
    if (action === 'edit') {
      this.formUpdateProduct.controls['id'].setValue(product.id);
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

  refreshFormCreateProduct() {
    this.enableFormCreateProduct(); // Re-enable form
    this.createFormCreateProduct();
    this.filesToUpload = [];
    this.previewProductImages = [];
    this.processing = false; // Re-enable submit button
  }

  onFileSelected(event) {
    this.filesToUpload  = <Array<File>>event.target.files;
    this.previewProductImages = [];
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.setupReader(this.filesToUpload[i]);
    }
  }

  setupReader(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewProductImages.push(e.target.result);
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
}
