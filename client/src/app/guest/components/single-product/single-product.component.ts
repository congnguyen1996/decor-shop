import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProductService } from '../../../services/product.service';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  currentUrl;
  product;
  productImageUrl = environment.productImageUrl + 'full_size/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private productService: ProductService
  ) { }

  async ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    await this.getProduct();
    const title = this.product.name;
    if (title.length > 50) {
      this.titleService.setTitle(title.substring(0, 49) + '... | Decor Shop');
    } else {
      this.titleService.setTitle(title + ' | Decor Shop');
    }
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
