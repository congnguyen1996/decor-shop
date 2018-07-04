// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  domain: 'http://localhost:3000/',
  commonImageUrl: 'http://localhost:3000/images/common/',
  productImageUrl: 'http://localhost:3000/images/upload/products/'

  // domain: 'https://uncledecor.herokuapp.com/',
  // commonImageUrl: 'https://uncledecor.herokuapp.com/images/common/',
  // productImageUrl: 'https://uncledecor.herokuapp.com/images/upload/products/'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
