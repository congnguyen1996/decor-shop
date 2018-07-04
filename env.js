// const fs = require('fs');

// if (fs.existsSync('./public/guest')) {
//   process.env.NODE_ENV = 'production';
//   process.env.databaseUri = 'mongodb://congnv1102:Ihatewomen195@ds219181.mlab.com:19181/uncledecor-app'; // Databse URI and database name
//   process.env.databaseName = 'production database: uncledecor'; // Database name
// } else {
    process.env.NODE_ENV = 'development';
    process.env.databaseUri = 'mongodb://localhost:27017/uncledecor'; // Databse URI and database name
    process.env.databaseName = 'development database: uncledecor'; // Database name
    process.env.MY_DIR_NAME = __dirname;
// }