/* global describe,it*/
'use strict';
var assert = require('chai').assert,
    expect = require('chai').expect,
    referenceError = 'invalid parameter passed',
    processor = require('../lib/processor');

describe ('oak-check', function () {
    describe ('#custom', function (){
        it('should pass $or with custom function', function (done) {
            var data = {'johnny': 6},
                condition = {'$or' :
                        [
                            {'$eq' : {'johnny': 5}},
                            {'$hi' : {'johnny': 6}}
                        ]},
                custom = {
                    '$hi' : function (condition, data, customConditions, callback) {
                        setTimeout(function () {
                            callback (null, true);
                        }, 100);
                    }
                };

            processor.check(condition, data, custom, function (err, result) {
                if (result) {
                    done();
                } else {
                    done('failed should have passed');
                }
            });
        });
        it('should fail $or with custom function', function (done) {
            var data = {'johnny': 6},
                condition = {'$or' :
                        [
                            {'$eq' : {'johnny': 5}},
                            {'$hi' : {'johnny': 6}}
                        ]},
                custom = {
                    '$hi' : function (condition, data, customConditions, callback) {
                        setTimeout(function () {
                            callback (null, false);
                        }, 100);
                    }
                };

            processor.check(condition, data, custom, function (err, result) {
                if (!result) {
                    done();
                } else {
                    done('failed should have passed');
                }
            });
        });
        it('should get proper data passed to it', function (done) {
            var data = {'johnny': 6},
                condition = {'$or' :
                        [
                            {'$eq' : {'johnny': 5}},
                            {'$hi' : {'johnny': 6}}
                        ]},
                custom = {
                    '$hi' : function (condition, data, customConditions, callback) {
                        setTimeout(function () {
                            callback (null, data.johnny === 6);
                        }, 100);
                    }
                };

            processor.check(condition, data, custom, function (err, result) {
                if (result) {
                    done();
                } else {
                    done('failed should have passed');
                }
            });
        });
    });
});
