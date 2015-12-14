/*global describe,it*/
'use strict';
var assert = require('chai').assert,
    expect = require('chai').expect,
    referenceError = 'invalid parameter passed',
    Processor = require('../lib/processor');

describe('oak-check', function () {
    describe ('#baseconditions()', function (){
        describe ('eq', function () {
            it('should start instantate', function () {
                assert.doesNotThrow(function () {
                    new Processor();
                });
            });

            it('should pass eq', function (done) {
                var processor = new Processor();

                if (processor.check({'$eq' : {'johnny': 5}}, {'johnny': 5})) {
                    done()
                }else{
                    done('failed should have passed')        
                };
            });
            it('should fail eq', function (done) {
                var processor = new Processor();

                if (!processor.check({'$eq' : {'johnny': 5}}, {'johnny': 4})) {
                    done()
                }else{
                    done('passed should have failed')        
                };
            });
            it('should pass nested eq', function (done) {
                var processor = new Processor();

                if (processor.check(
                    {'$eq' :
                        {'robots.johnny': 5}},
                    {robots :
                        {'johnny': 5}}
                    )) {
                    done()
                }else{
                    done('passed should have passed');
                };
            });
            it('should fail nested eq', function (done) {
                var processor = new Processor();

                if (!processor.check(
                    {'$eq' :
                        {'robots.johnny': 5}},
                    {robots :
                        {'johnny': 4}}
                    )) {
                    done()
                }else{
                    done('passed should have passed');
                };
            });
        });
        describe('$or', function(){
            it('should pass or eq', function (done) {
                var processor = new Processor();

                if (processor.check({'$or' :
                            [{'$eq' : {'johnny': 5}},
                            {'$eq' : {'johnny': 6}}]},
                        {'johnny': 6})) {
                    done()
                }else{
                    done('failed should have passed');
                };
            });
            it('should fail or eq', function (done) {
                var processor = new Processor();

                if (!processor.check({'$or' :
                            [{'$eq' : {'johnny': 5}},
                            {'$eq' : {'johnny': 6}}]},
                        {'johnny': 7})) {
                    done()
                }else{
                    done('failed should have passed');
                };
            });
            it('should pass nested or eq', function (done) {
                var processor = new Processor();

                if (processor.check({'$or' :
                            [{'$eq' : {'robots.johnny': 5}},
                            {'$eq' : {'robots.johnny': 6}}]},
                         {robots : {'johnny': 6}})) {
                    done()
                }else{
                    done('failed should have passed');
                };
            });
            it('should fail nested or eq', function (done) {
                var processor = new Processor();

                if (!processor.check({'$or' :
                            [{'$eq' : {'robots.johnny': 5}},
                            {'$eq' : {'robots.johnny': 6}}]},
                         {robots : {'johnny': 4}})) {
                    done()
                }else{
                    done('failed should have passed');
                };
            });            
        });
    });
});
