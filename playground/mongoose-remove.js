const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js')
//
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findByIdAndRemove("5b903f741e575656dab801b6").then((todo) => {
  console.log(todo);
});
