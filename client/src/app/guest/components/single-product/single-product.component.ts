import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProductService } from '../../../services/product.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  currentUrl;
  product;
  // productImageUrl = environment.productImageUrl;
  productImageUrl = 'http://localhost:3000/images/upload/test/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.getProduct();
    // console.log(this.activatedRoute.snapshot);
  }

  async getProduct() {
    try {
      const response = await this.productService.getProduct(this.currentUrl.id);
      this.product = response.data;
    } catch (error) {
      console.log(error);
    }
  }

}
