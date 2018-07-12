(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["guest-guest-module"],{

/***/ "./src/app/guest/components/about/about.component.css":
/*!************************************************************!*\
  !*** ./src/app/guest/components/about/about.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img {\r\n    height: 100%;\r\n    width: 100%;\r\n}"

/***/ }),

/***/ "./src/app/guest/components/about/about.component.html":
/*!*************************************************************!*\
  !*** ./src/app/guest/components/about/about.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h2>About Page</h2>\n</div>"

/***/ }),

/***/ "./src/app/guest/components/about/about.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/guest/components/about/about.component.ts ***!
  \***********************************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutComponent = /** @class */ (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-about',
            template: __webpack_require__(/*! ./about.component.html */ "./src/app/guest/components/about/about.component.html"),
            styles: [__webpack_require__(/*! ./about.component.css */ "./src/app/guest/components/about/about.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AboutComponent);
    return AboutComponent;
}());



/***/ }),

/***/ "./src/app/guest/components/products/products.component.css":
/*!******************************************************************!*\
  !*** ./src/app/guest/components/products/products.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n.row-cards img:hover {\r\n    -webkit-filter: brightness(50%);\r\n}"

/***/ }),

/***/ "./src/app/guest/components/products/products.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/guest/components/products/products.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"my-3 my-md-5\" id=\"list-product\">\n  <div class=\"container\">\n    <div class=\"page-header\">\n      <h1 class=\"page-title\">\n        Products\n      </h1>\n      <div *ngIf=\"page < pages\" class=\"page-subtitle\">{{ limit*(page-1) + 1 }} - {{ limit*page + 1 }} of {{ total }} products</div>\n      <div *ngIf=\"page >= pages\" class=\"page-subtitle\">{{ limit*(page-1) + 1 }} - {{ total }} of {{ total }} products</div>\n      <div class=\"page-options d-flex\">\n        <select [(ngModel)]=\"sortInput.sortByDate\" class=\"form-control custom-select w-auto ml-2\" (change)=\"sortByDate()\">\n          <option value=\"asc\">Newest</option>\n          <option value=\"desc\">Oldest</option>\n        </select>\n        <div class=\"input-icon ml-2\">\n          <span class=\"input-icon-addon\">\n            <i class=\"fe fe-search\"></i>\n          </span>\n          <input [(ngModel)]=\"searchInput\" type=\"text\" class=\"form-control w-10\" placeholder=\"Search product\" (keyup)=\"searchProducts($event)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"row row-cards\">\n      <div *ngFor=\"let product of listProduct\" class=\"col-sm-4 col-lg-3 mb-5\">\n        <div class=\"mb-1 ratio-4x3\">\n          <div class=\"ratio-content\">\n            <a [routerLink]=\"['/product-detail/', product._id]\">\n              <img style=\"height: 100%;\" src=\"{{productImageUrl}}{{product.images[0]}}\" alt=\"Photo by Nathan Guerrero\" class=\"rounded\">\n            </a>\n          </div>\n        </div>\n        <div><strong>[{{ product.id }}]</strong>&nbsp;&nbsp;{{ product.name }}</div>\n        <h4 *ngIf=\"product.price.unit === 'VND'\" class=\"text-danger\">{{ product.price?.value | number }}<sup>đ</sup></h4>\n        <h4 *ngIf=\"product.price.unit === 'DOLLAR'\" class=\"text-danger\"><i class=\"fa fa-usd\" aria-hidden=\"true\"></i> {{ product.price?.value | number }}</h4>\n      </div>\n    </div>\n    <!-- Pagination -->\n    <div *ngIf=\"pages > 1\">\n      <ul class=\"pagination justify-content-center\">\n          <li *ngIf=\"page > 3\" class=\"page-item\"><span class=\"page-link\" (click)=\"setPage(1)\">First</span></li>\n          <li *ngIf=\"page > 2\" class=\"page-item\"><span class=\"page-link\" (click)=\"setPage(page-2)\">{{ page - 2 }}</span></li>\n          <li *ngIf=\"page > 1\" class=\"page-item\"><span class=\"page-link\" (click)=\"setPage(page-1)\">{{ page - 1 }}</span></li>\n          <li class=\"page-item active\"><span class=\"page-link\">{{ page }}</span></li>\n          <li *ngIf=\"page + 1 <= pages\" class=\"page-item\"><span class=\"page-link\" (click)=\"setPage(page+1)\">{{ page + 1 }}</span></li>\n          <li *ngIf=\"page + 2 <= pages\" class=\"page-item\"><span class=\"page-link\" (click)=\"setPage(page+2)\">{{ page + 2 }}</span></li>\n          <li *ngIf=\"page + 2 < pages\" class=\"page-item\"><span class=\"page-link\" (click)=\"setPage(pages)\">Last</span></li>\n        </ul>\n    </div>\n    <!-- End pagination -->\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/guest/components/products/products.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/guest/components/products/products.component.ts ***!
  \*****************************************************************/
/*! exports provided: ProductsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsComponent", function() { return ProductsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_product_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/product.service */ "./src/app/services/product.service.ts");
/* harmony import */ var _services_catagory_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/catagory.service */ "./src/app/services/catagory.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(productService, catagoryService, router) {
        this.productService = productService;
        this.catagoryService = catagoryService;
        this.router = router;
        this.productImageUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].productImageUrl + 'x720/';
        this.listCatagoryObj = {};
        this.query = null;
        this.limit = 20;
        this.page = 1;
        this.sort = '{"createat": "desc"}';
        this.filterInput = {
            filterByCatagory: null
        };
        this.sortInput = {
            sortByDate: 'desc'
        };
        this.getListCatagory();
    }
    ProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getListCatagory();
        this.getListProduct();
        this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__["NavigationEnd"]; }))
            .subscribe(function (route) {
            var params = route.url.split('/');
            _this.filterInput.filterByCatagory = params[params.length - 1];
            _this.page = 1;
            _this.filterByCatagory();
        });
    };
    // Function to get products with option of this
    ProductsComponent.prototype.getListProduct = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productService.getProducts(this.query, this.searchInput, this.page, this.limit, this.sort)];
                    case 1:
                        response = _a.sent();
                        this.listProduct = response.data.docs;
                        this.page = response.data.page;
                        this.pages = response.data.pages;
                        this.total = response.data.total;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Function to get list catagory
    ProductsComponent.prototype.getListCatagory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.catagoryService.getCatagories(null, null, null, null)];
                    case 1:
                        response = _a.sent();
                        this.listCatagory = response.data.docs;
                        this.getListCatagoryObj();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsComponent.prototype.getListCatagoryObj = function () {
        for (var i = 0; i < this.listCatagory.length; i++) {
            this.listCatagoryObj[this.listCatagory[i].name.trim().toLowerCase().replace(' ', '-')] = this.listCatagory[i];
        }
    };
    ProductsComponent.prototype.filterByCatagory = function () {
        if (this.filterInput.filterByCatagory === '') {
            return;
        }
        if (this.filterInput.filterByCatagory === 'all') {
            this.query = null;
        }
        else {
            var catagory = this.listCatagoryObj[this.filterInput.filterByCatagory];
            this.query = '{"catagoryid": "' + catagory._id + '"}';
        }
        this.getListProduct();
    };
    ProductsComponent.prototype.sortByDate = function () {
        this.sort = '{"createat": "' + this.sortInput.sortByDate + '"}';
        this.getListProduct();
    };
    ProductsComponent.prototype.setPage = function (n) {
        this.page = n;
        this.getListProduct();
    };
    ProductsComponent.prototype.searchProducts = function (e) {
        if (e.keyCode === 13) {
            this.page = 1;
            this.getListProduct();
        }
    };
    ProductsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-products',
            template: __webpack_require__(/*! ./products.component.html */ "./src/app/guest/components/products/products.component.html"),
            styles: [__webpack_require__(/*! ./products.component.css */ "./src/app/guest/components/products/products.component.css")]
        }),
        __metadata("design:paramtypes", [_services_product_service__WEBPACK_IMPORTED_MODULE_2__["ProductService"],
            _services_catagory_service__WEBPACK_IMPORTED_MODULE_3__["CatagoryService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], ProductsComponent);
    return ProductsComponent;
}());



/***/ }),

/***/ "./src/app/guest/components/single-product/single-product.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/guest/components/single-product/single-product.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img {\r\n    width: 90%;\r\n    height: 90%;\r\n}\r\n.other-image {\r\n    margin-top: 1.5rem;\r\n    margin-bottom: 1.5rem;\r\n}"

/***/ }),

/***/ "./src/app/guest/components/single-product/single-product.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/guest/components/single-product/single-product.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"product\" class=\"container\">\n<br>\n<h2><strong>[{{ product.id }}]</strong>&nbsp;&nbsp;{{ product.name }}</h2>\n<h3 *ngIf=\"product.price.unit === 'VND'\" class=\"text-danger\">{{ product.price?.value | number }}<sup>đ</sup></h3>\n<h3 *ngIf=\"product.price.unit === 'DOLLAR'\" class=\"text-danger\"><i class=\"fa fa-usd\" aria-hidden=\"true\"></i> {{ product.price?.value | number }}</h3>\n <div class=\"text-center\">\n   <img class=\"rounded\" src=\"{{productImageUrl}}{{product.images[0]}}\" alt=\"\">\n </div>\n <br>\n <div>\n    <h4>Detail</h4>\n    <div [innerHTML]=\"product.detail\"></div>\n </div>\n <div *ngIf=\"product.images.length > 1\">\n    <h4>Other images of this product</h4>\n    <div *ngFor=\"let image of product.images; first as isFirst\" class=\"text-center other-image\">\n        <img *ngIf=\"!isFirst\" class=\"rounded\" src=\"{{productImageUrl}}{{image}}\" alt=\"\">\n    </div>\n </div>\n</div>\n"

/***/ }),

/***/ "./src/app/guest/components/single-product/single-product.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/guest/components/single-product/single-product.component.ts ***!
  \*****************************************************************************/
/*! exports provided: SingleProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingleProductComponent", function() { return SingleProductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_product_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/product.service */ "./src/app/services/product.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var SingleProductComponent = /** @class */ (function () {
    function SingleProductComponent(activatedRoute, productService) {
        this.activatedRoute = activatedRoute;
        this.productService = productService;
        this.productImageUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].productImageUrl + 'full_size/';
    }
    SingleProductComponent.prototype.ngOnInit = function () {
        this.currentUrl = this.activatedRoute.snapshot.params;
        this.getProduct();
        // console.log(this.activatedRoute.snapshot);
    };
    SingleProductComponent.prototype.getProduct = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productService.getProduct(this.currentUrl.id)];
                    case 1:
                        response = _a.sent();
                        this.product = response.data;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SingleProductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-single-product',
            template: __webpack_require__(/*! ./single-product.component.html */ "./src/app/guest/components/single-product/single-product.component.html"),
            styles: [__webpack_require__(/*! ./single-product.component.css */ "./src/app/guest/components/single-product/single-product.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_product_service__WEBPACK_IMPORTED_MODULE_2__["ProductService"]])
    ], SingleProductComponent);
    return SingleProductComponent;
}());



/***/ }),

/***/ "./src/app/guest/guest.module.ts":
/*!***************************************!*\
  !*** ./src/app/guest/guest.module.ts ***!
  \***************************************/
/*! exports provided: GuestModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuestModule", function() { return GuestModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _guest_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./guest.routing.module */ "./src/app/guest/guest.routing.module.ts");
/* harmony import */ var _components_products_products_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/products/products.component */ "./src/app/guest/components/products/products.component.ts");
/* harmony import */ var _components_single_product_single_product_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/single-product/single-product.component */ "./src/app/guest/components/single-product/single-product.component.ts");
/* harmony import */ var _components_about_about_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/about/about.component */ "./src/app/guest/components/about/about.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var GuestModule = /** @class */ (function () {
    function GuestModule() {
    }
    GuestModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _components_products_products_component__WEBPACK_IMPORTED_MODULE_4__["ProductsComponent"],
                _components_single_product_single_product_component__WEBPACK_IMPORTED_MODULE_5__["SingleProductComponent"],
                _components_about_about_component__WEBPACK_IMPORTED_MODULE_6__["AboutComponent"]
            ],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                _guest_routing_module__WEBPACK_IMPORTED_MODULE_3__["GuestRoutingModule"]
            ],
            providers: []
        })
    ], GuestModule);
    return GuestModule;
}());



/***/ }),

/***/ "./src/app/guest/guest.routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/guest/guest.routing.module.ts ***!
  \***********************************************/
/*! exports provided: GuestRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuestRoutingModule", function() { return GuestRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _components_products_products_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/products/products.component */ "./src/app/guest/components/products/products.component.ts");
/* harmony import */ var _components_single_product_single_product_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/single-product/single-product.component */ "./src/app/guest/components/single-product/single-product.component.ts");
/* harmony import */ var _components_about_about_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/about/about.component */ "./src/app/guest/components/about/about.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var guestRoutes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: _components_about_about_component__WEBPACK_IMPORTED_MODULE_4__["AboutComponent"]
            },
            {
                path: 'products/:catagory',
                component: _components_products_products_component__WEBPACK_IMPORTED_MODULE_2__["ProductsComponent"]
            },
            {
                path: 'product-detail/:id',
                component: _components_single_product_single_product_component__WEBPACK_IMPORTED_MODULE_3__["SingleProductComponent"]
            }
        ]
    }
];
var GuestRoutingModule = /** @class */ (function () {
    function GuestRoutingModule() {
    }
    GuestRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(guestRoutes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
        })
    ], GuestRoutingModule);
    return GuestRoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=guest-guest-module.js.map