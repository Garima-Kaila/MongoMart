/**
 * Created by garima05 on 31-10-2016.
 */


var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var Utilities = require('../../app/utilities');

var assert = require('assert');

describe('Utilities', function () {
    describe('#getFileType()', function () {

        it('should return file type / extension based on file path', function () {
            assert.equal(Utilities.getFileType('./static/abc.css'), ".css");
            assert.equal(Utilities.getFileType('./static/abc.js'), ".js");
            assert.equal(Utilities.getFileType('./static/abc.json'), ".json");
            assert.equal(Utilities.getFileType('./static/abc.html'), ".html");
            assert.equal(Utilities.getFileType('./static/abc.png'), ".png");
        });
    });

    describe('#sendResponse()', function () {

        it('should return file type / extension based on file path', function () {
            var res = {
                writeHead: sinon.spy(),
                end: sinon.spy()
            };
            Utilities.sendResponse(res, 200, "css", "response");
            expect(res.writeHead).to.have.been.calledOnce;
            expect(res.end).to.have.been.calledOnce;
        });

    });

});
