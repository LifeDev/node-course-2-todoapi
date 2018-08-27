const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js')
var id = "5b620bfe980fd2079c7ac162";
//
// if(!ObjectID.isValid(id)){
//   console.log("ID is not valid");
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todos', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log("Not found");
//   }
//   console.log('Todo By id', todo);
// }).catch((e) => console.log(e);

User.findById(id).then((user) => {
  if(!user){
    return console.log("Unable to find a User");
  }
  console.log('User', JSON.stringify(user, undefined, 2));
});
