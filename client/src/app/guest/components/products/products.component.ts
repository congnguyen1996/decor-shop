import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProductService } from '../../../services/product.service';
import { CatagoryService } from '../../../services/catagory.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productImageUrl = environment.productImageUrl + 'x720/';

  listProduct;
  listCatagory;
  listCatagoryObj = {};

  query = null;
  limit = 20;
  page = 1;
  sort = '{"createat": "desc"}';
  pages;
  total;

  filterInput = {
    filterByCatagory: null
  };
  sortInput = {
    sortByDate: 'desc'
  };
  searchInput;

  constructor(
    private productService: ProductService,
    private catagoryService: CatagoryService,
    public router: Router
  ) {
    this.getListCatagory();
  }

  ngOnInit() {
    this.getListCatagory();
    this.getListProduct();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((route: NavigationEnd) => {
        const params = route.url.split('/');
        this.filterInput.filterByCatagory = params[params.length - 1];
        this.page = 1;
        this.filterByCatagory();
    });
  }


  // Function to get products with option of this
  async getListProduct() {
    try {
      const response = await this.productService.getProducts(this.query, this.searchInput, this.page, this.limit, this.sort);
      this.listProduct = response.data.docs;
      this.page = response.data.page;
      this.pages = response.data.pages;
      this.total = response.data.total;
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

  getListCatagoryObj() {
    for (let i = 0; i < this.listCatagory.length; i++) {
      this.listCatagoryObj[this.listCatagory[i].name.trim().toLowerCase().replace(' ', '-')] = this.listCatagory[i];
    }
  }

  filterByCatagory() {
    if (this.filterInput.filterByCatagory === '') {
      return;
    }
    if (this.filterInput.filterByCatagory === 'all') {
      this.query = null;
    } else {
      const catagory = this.listCatagoryObj[this.filterInput.filterByCatagory];
      this.query = '{"catagoryid": "'  + catagory._id + '"}';
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
