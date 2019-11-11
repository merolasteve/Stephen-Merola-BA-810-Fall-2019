//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
//User = require('../app/models/users');
//Todo = require('../app/models/todos');
Widget = require('../app/models/widgets');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);
it('it should GET the index.html file', (done) => {
    chai.request(server)
        .get('/index.html')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });


});
it('it should return 404', (done) => {
    chai.request(server).get('/index2.html')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
});

describe('Widget', () => {
    beforeEach((done) => {
        Widget.remove({}, (err) => {
            done();
        });
    });
    //Insert user tests here
    it('it should POST a widget', (done) => {
        var widget = {
            "Foo": "Jane",
            "Woo": 12,
            "email": "woo@hoo.com",
            "password": "pass"

        }
        chai.request(server)
            .post('/api/widgets')
            .send(widget)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('Foo');
                res.body.Foo.should.be.a('string');
                res.body.Foo.should.equal('Jane');
                res.body.should.have.property('Woo');
                res.body.Woo.should.be.a('Number');
                res.body.Woo.should.equal(12);
                done();
            });
    });

    /*
    it('it should not POST a widget without id field', (done) => {
        var widget = {
            "Foo": "Jane",
            "Woo": 12,
            "password": "pass"
        }
        chai.request(server)
            .post('/api/widgets')
            .send(widget)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('it should not POST a user without email field', (done) => {
        var user = {
            "firstName": "Jane",
            "lastName": "Doe",
            "password": "pass"
        }
        chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    */

    it('it should GET all the widgets', (done) => {
        var widget = new Widget({
            "Foo": "Jane",
            "Woo": 12,

            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });
        widget.save((err, widgets) => {
            chai.request(server)
                .get('/api/widgets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    /*
    it('it should GET a widget by the given id', (done) => {
        var widget = new Widget({
            "Foo": "Jane",
            "Woo": 12,
            
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });

        widget.save((err, widget) => {
            chai.request(server)
                .get('/api/widgets/' + widget._id)
                .send(widget)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Foo');
                    res.body.should.have.property('Woo');
                   
                    //res.body.should.have.property('password');
                    res.body.should.have.property('_id').eql(widget._id.toString());
                    done();
                });
        });

    });
    it('it should GET a widget by the given id', (done) => {
        var widget = new Widget({
            "Foo": "Jane",
            "Woo": 12,
            
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });

        widget.save((err, widget) => {
            chai.request(server)
                .get('/api/widgets/' + widget._id)
                .send(widget)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Foo');
                    res.body.should.have.property('Woo');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('_id').eql(widget._id.toString());
                    done();
                });
        });

    });
    it('it should UPDATE a widget', (done) => {

        var widget = new Widget({
            "Foo": "Jane",
            "Woo": 12,
            "email": "yoo@hoo.com",
            "password": "pass"
        });
        widget.save((err, widget) => {
            chai.request(server)
                .put('/api/widgets/' + widget._id)
                .send({
                    "_id": widget._id,
                    "Foo": "Joey",
                     "Woo": 12,
            
                    "email": "yoo@hoo.edu",
                    "password": "pass"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email').eql('yoo@hoo.edu');
                    res.body.should.have.property('Foo').eql('Joey');
                    done();
                });
        });
    });
    it('it should DELETE a widget given the id', (done) => {
        var widget = new Widget({
            "Foo": "Jane",
            "Woo": 12,
            
            "email": "five@hoo.com",
            "password": "pass"
        });
        widget.save((err, widget) => {
            chai.request(server)
                .delete('/api/widgets/' + widget.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});
*/

});