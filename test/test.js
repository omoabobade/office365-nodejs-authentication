'use strict';

var expect  = require('chai').expect;
const mockery = require('mockery');
const nodemailerMock = require('nodemailer-mock');

describe('Tests that it tries to login', function(){
    var auth;
    let app = null;
    before(function(){
        mockery.enable({
            warnOnUnregistered:false,
        });

        mockery.registerMock('nodemailer', nodemailerMock);
        auth = require('../index');

    });

    afterEach(function(){
        nodemailerMock.mock.reset();
    });

    after(function() {
        // Remove our mocked nodemailer and disable mockery
        mockery.deregisterAll();
        mockery.disable();
      });

      it('should login and send email telling users someone just attemted to login onto a platform using their credentials', function(done) {
            auth("kola@mail.com", "password", "appname", function(error, info){
                expect(info.response).to.equal("nodemailer-mock success");
            });
            done();
      });

      it('should fail to send an email and login user', function(done) {
        // tell the mock class to return an error
        const err = 'Something just happen right now, not sending email and login in user';
        nodemailerMock.mock.shouldFailOnce();
        nodemailerMock.mock.failResponse(err);
        auth("kola@mail.com", "password", "appname", function(error, info){
            expect(error).to.equal(err);
        });
        done();
      });

      it('throw error if invalid email used', function(done) {
        const err = "Invalid email";
        auth("kola", "password", "appname", function(error, info){
            expect(error).to.equal(err);
            console.log(err);
        });
        done();
      });

      it('throw error if invalid password used', function(done) {
        const err = "Password cannot be empty";
        auth("kola@mail.co", "", "appname", function(error, info){
            expect(error).to.equal(err);
            console.log(err);
        });
        done();
      });
})


