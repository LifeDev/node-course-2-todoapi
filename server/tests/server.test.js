const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, populateUsers, users} = require('./seed/seed');

beforeEach(populateUsers);

beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));

    });
  });

  it('should not create todo with invalid body data', (done) =>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }
  });


    Todo.find().then((todos) => {
      expect(todos.length).toBe(2);
      done();
    }).catch((e) => done(e));
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    }).end(done);

  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it('should return 404 if todo not found', (done) => {
    var id = new ObjectID();
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done().catch((e) => {
        console.log(e);
      }));
  });
  it('should return 400 for nonIDs', (done) => {
    request(app)
      .get('/todos/1234')
      .expect(400)
      .end(done().catch(e));
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexID = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID);
      })
      // .end((err, res) => {
      //   if(err){
      //     return done(err);
      //   }
      //   done();
      // });
      .end(done().catch(e))
  });
  it('should return 404 if todo not found', (done) => {
    var hexID = new ObjectID();
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(404)
      // .end((err, res) => {
      //   if(err){
      //     return done(err);
      //   }
      //   done();
      // });
      .end(done().catch(e))

  });
  it('should return 400 if ID is invalid', (done) => {
    var hexID = new ObjectID();
    request(app)
      .delete(`/todos/${hexID+3}`)
      .expect(400)
      // .end((err, res) => {
      //   if(err){
      //     return done(err);
      //   }
      //   done();
      // });
      .end(done().catch(e))

  });
});

describe('GET /user/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end(done);
  });

  it('should return a 401 if not authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', '')
    .expect(401)
    .expect((res) => {
      expect(res.body).toEqual({})
    }).end(done)
  });
});
