// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if(err) {
    return console.log("Unable to connect to mongodb server");
  }
  console.log('Connected to MongoDB server');

  const db = client.db("TodoApp");


    //deleteMany
  // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // });
    //deleteOne
  // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // });
    //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: "Max"});
  db.collection('Users').findOneAndDelete({_id: new ObjectID("5b5e3f2edfd10710932be3af")}).then((results) => {
      console.log(JSON.stringify(results, undefined, 2));
  });


  //client.close();
});
