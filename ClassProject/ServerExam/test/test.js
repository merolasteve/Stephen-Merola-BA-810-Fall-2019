//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
//User = require('../app/models/users');
//Todo = require('../app/models/todos');
Gadget = require('../app/models/gadgets');
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
            console.log('Acquired the index.html file!!')
        });
});

it('it should return 404', (done) => {
    chai.request(server).get('/index2.html')
        .end((err, res) => {
            res.should.have.status(404);
            done();
            console.log('404 Returned!!')
        });
});

describe('Gadget', () => {
    beforeEach((done) => {
        Gadget.remove({}, (err) => {
            done();
            console.log('Gadget described!!')
        });
    });
    //Insert user tests here
    it('it should GET all the gadgets', (done) => {
        var gadget = new Gadget({
            "Yoo": "Stephen",
            "Hoo": '99'
        });
        gadget.save((err, gadgets) => {
            chai.request(server)
                .get('/api/gadgets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                    console.log('Acquired all the gadgets!!')
                });
        });
    });  

    it('it should DELETE a gadget given the id', (done) => {
        var gadget = new Gadget({
            "Yoo": "Stephen",
            "Hoo": '99'
        });
        gadget.save((err, gadget) => {
            chai.request(server)
                .delete('/api/gadgets/' + gadget.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                    console.log('All gadgets deleted!!')
                });
        });
    });     
});