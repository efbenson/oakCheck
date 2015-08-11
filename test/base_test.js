/*global describe,it*/
'use strict';
var assert = require('chai').assert,
    expect = require('chai').expect,
    referenceError = 'invalid parameter passed',
    Processor = require('../lib/processor');

describe('oak-check', function() {
  describe('#baseconditions()', function(){    
    describe('eq', function(){
      it('should start instantate', function() {
        assert.doesNotThrow(function() {
          new Processor();
        });
      });
        
      it('should pass eq', function(done) {
        var processor = new Processor();
        
        if (processor.check({'$eq' : {'johnny': 5}}, {'johnny':5})){
          done()
        }else{
          done('failed should have passed')        
        };        
      });

      it('should fail eq', function(done) {
        var processor = new Processor();
        
        if (!processor.check({'$eq' : {'johnny': 5}}, {'johnny':4})){
          done()
        }else{
          done('passed should have failed')        
        };        
      });
            
    });
  });
});
