const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app.js')

const deleteAll = require('../helpers/deleteUser')

chai.use(chaiHttp)

after(function(done) {
  deleteAll(done)
});

describe('User signin/Register', function(){
  describe('POST /register', function() {
    var token
    it('should send status code 201 and successfully registered ', function(done){
        chai
            .request(app)
            .post('/api/register')
            .send({email: 'reza@gmail.com', password: '12345678'})
            .then(function(res){
                //console.log(res.body,"=============")
                expect(res.body).to.be.an('object')
                token = res.body.access_token
                expect(res).to.have.status(201)
                expect(res.body).to.have.property('access_token')
                // //console.log('hallllooooooo')
                
                done()
            })
            .catch(error=>{
                console.log(error)
            })
            
    })
    it('should send status code 200  and successfully login ', function(done){
      chai
          .request(app)
          .post('/api/login')
          .send({email: 'reza@gmail.com', password: '12345678'})
          .then(function(res){
              console.log(res.body,"=============")
              expect(res.body).to.be.an('object')
              expect(res.body).to.have.property('username')
              expect(res.body).to.have.property('access_token')
              expect(res).to.have.status(200)
              done()
          })
          .catch(error=>{
              //console.log(error)
          })
          
  })

    it('should send a validation format email is wrong', function(done) {
      chai
        .request(app)
        .post('/api/register')
        .send({ email: 'rez.adf.com', password: '1234567'})
        .then(function(res) {
            //console.log(res.body,"=======================================")
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          // //console.log(res.body.message, 'asdkjasdlads')
          // //console.log(res.message, 'ajskdjasldasd')
          done()
        })
        .catch((err) => {
          // //console.log(err)
        })
    })
    it('should send a validation format password is wrong', function(done) {
      chai
        .request(app)
        .post('/api/register')
        .send({ email: 'lalalala@gmail.com', password: '1234'})
        .then(function(res) {
            //console.log(res.body,"=======================================")
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          // //console.log(res.body.message, 'asdkjasdlads')
          // //console.log(res.message, 'ajskdjasldasd')
          done()
        })
        .catch((err) => {
          // //console.log(err)
        })
    })
    it('should return email is required', function(done) {
      chai
      .request(app)
      .post('/api/register')
      .send({ password: '12345678'})
      .then(function(res) {
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        //console.log(res.body.message, 'hei hei')
        done()
      })
      .catch((err) => {
        //console.log(err)
      })
    })
    it('should return password is required', function(done) {
      chai
      .request(app)
      .post('/api/register')
      .send({email: 'tom@mail.com'})
      .then(function(res) {
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        // //console.log(res.body.message, 'hei hei')
        done()
      })
      .catch((err) => {
        // //console.log(err)
      })
    })
//   describe('POST /login', function() {
//     it('should return status 404 of not found', function(done) {
//       chai
//       .request(app)
//       .post('/api/login')
//       .send()
//       .then(function(res) {
//         expect(res).to.have.status(404)
//         expect(res.body).to.be.an('object')
//         expect(res.body.message).to.equal('not found')
        
//         done()
//       })
//       .catch((err) => {
//         // //console.log(err)
//       })
//     })
    it('should return email/password is wrong', function(done) {
      chai
      .request(app)
      .post('/api/login')
      .send({email: 'dad@gmail.com', password: '1235678'})
      .then(function(res) {
        // expect(res).to.have.status(404)
        // //console.log(res.body.code,"disinii")
        // expect(res.body).to.be.an('object')
        // //console.log(res.body,"passs")
        expect(res.body.message).to.equal('Invalid email/password')
        done()
      })
      .catch((err) => {
        // //console.log(err)
      })
    })
    it('should return email/password is wrong', function(done) {
      chai
      .request(app)
      .post('/api/login')
      .send({email: 'asd@gmail.com', password: 'w12wd'})
      .then(function(res) {
        expect(res.body.message).to.equal('Invalid email/password')
        done()
      })
      .catch((err) => {
        // //console.log(err)
      })
    })
  })

})

const expect = chai.expect