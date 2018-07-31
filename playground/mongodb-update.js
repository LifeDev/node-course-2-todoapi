// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if(err) {
    return console.log("Unable to connect to mongodb server");
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection("Todos").findOneAndUpdate({_id: new ObjectID("5b5f8db498e32efa525a9c2f")}, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection("Users").findOneAndUpdate({
    _id: new ObjectID("5b5e413300f1c11101bb2589")
  }, {
    $inc: {
      age: 1
    },
    $set: {
      name: "Max"
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  client.close();
});
