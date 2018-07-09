(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/services/product.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/product.service.ts ***!
  \*********************************************/
/*! exports provided: ProductService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductService", function() { return ProductService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.service */ "./src/app/services/util.service.ts");
/* harmony import */ var rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/internal/operators/map */ "./node_modules/rxjs/internal/operators/map.js");
/* harmony import */ var rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductService = /** @class */ (function () {
    function ProductService(http, utilService) {
        this.http = http;
        this.utilService = utilService;
        this.domain = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].domain;
    }
    ProductService.prototype.createAuthenticationHeaders = function () {
        this.loadToken(); // Get token so it can be attached to headers
        // Headers configuration options
        this.options = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["RequestOptions"]({
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]({
                'Content-Type': 'application/json',
                'authorization': this.authToken // Attach token
            })
        });
    };
    // Function to get token from client local storage
    ProductService.prototype.loadToken = function () {
        this.authToken = localStorage.getItem(btoa('token')); // Get token and asssign to variable to be used elsewhere
    };
    // Function to check product's id exist
    ProductService.prototype.checkProductId = function (id) {
        return this.utilService
            .getHttpPromise(this.http.get(this.domain + 'api/product/check-product-id/' + id)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_4__["map"])(function (res) { return res.json(); })));
    };
    // Function to get a product record by _id
    ProductService.prototype.getProduct = function (id) {
        return this.utilService
            .getHttpPromise(this.http.get(this.domain + 'api/product/get-product/' + id)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_4__["map"])(function (res) { return res.json(); })));
    };
    // Function to get products
    ProductService.prototype.getProducts = function (query, key, page, limit, sort) {
        var params = '?';
        if (query) {
            params += '&query=' + query;
        }
        if (key) {
            params += '&key=' + key;
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
        return this.utilService
            .getHttpPromise(this.http.get(this.domain + 'api/product/get' + params)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_4__["map"])(function (res) { return res.json(); })));
    };
    // Function to create a new product
    ProductService.prototype.createProduct = function (product) {
        this.createAuthenticationHeaders();
        return this.utilService
            .getHttpPromise(this.http.post(this.domain + 'api/product/create', product, this.options)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_4__["map"])(function (res) { return res.json(); })));
    };
    // Function to update product
    ProductService.prototype.updateProduct = function (product) {
        this.createAuthenticationHeaders();
        return this.utilService
            .getHttpPromise(this.http.put(this.domain + 'api/product/update', product, this.options)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_4__["map"])(function (res) { return res.json(); })));
    };
    // Function to delete product
    ProductService.prototype.deleteProduct = function (id) {
        this.createAuthenticationHeaders();
        return this.utilService
            .getHttpPromise(this.http.delete(this.domain + 'api/product/delete/' + id, this.options)
            .pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_4__["map"])(function (res) { return res.json(); })));
    };
    ProductService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            _util_service__WEBPACK_IMPORTED_MODULE_3__["UtilService"]])
    ], ProductService);
    return ProductService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map