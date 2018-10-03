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
                console.log(error);
                console.log(info);
            });
      });
})


