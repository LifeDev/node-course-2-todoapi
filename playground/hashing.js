const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPass = '$2a$10$mbwfwJkEiTX7rWu8GSvLI.h7eWd3GctQP9Uqi1CL.65eNN89neeHO';

bcrypt.compare(password, hashedPass, (err,res) => {
  console.log(res);
});

// var data = {
//   id: 10
// }
//
// var token = jwt.sign(data, '123abc');
//
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
//
// console.log(decoded);
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log('Original message: ', message);
// console.log('Hashed message: ', hash);
//
// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash) {
//   console.log('Data not changed');
// } else {
//   console.log('Changed. NO TRUST');
// }
