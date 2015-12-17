/* global describe,it*/
'use strict';
var assert = require('chai').assert,
    expect = require('chai').expect,
    referenceError = 'invalid parameter passed',
    processor = require('../lib/processor');

describe ('oak-check', function () {
    describe ('#logical', function (){
        describe('$or', function () {
            it('should pass or eq', function (done) {
                var data = {'johnny': 6},
                    condition = {'$or' :
                            [
                                {'$eq' : {'johnny': 5}},
                                {'$eq' : {'johnny': 6}}
                            ]};

                processor.check(condition, data, [], function (err, result) {
                    if (result) {
                        done();
                    } else {
                        done('failed should have passed');
                    }
                });
            });
            it('should fail or eq', function (done) {
                var data = {'johnny': 7},
                    condition = {'$or' :
                            [
                                {'$eq' : {'johnny': 5}},
                                {'$eq' : {'johnny': 6}}
                            ]};

                processor.check(condition, data, [], function (err, result) {
                    if (!result) {
                        done();
                    } else {
                        done('failed should have passed');
                    }
                });
            });
            it('should pass nested or eq', function (done) {
                var data = {robots : {'johnny': 6}},
                    condition = {'$or' :
                            [
                                {'$eq' : {'robots.johnny': 5}},
                                {'$eq' : {'robots.johnny': 6}}
                            ]};

                processor.check(condition, data, [], function (err, result) {
                    if (result) {
                        done();
                    } else {
                        done('failed should have passed');
                    };
                });
            });
            it('should fail nested or eq', function (done) {
                var data = {robots : {'johnny': 4}},
                    condition = {'$or' :
                            [
                                {'$eq' : {'robots.johnny': 5}},
                                {'$eq' : {'robots.johnny': 6}}
                            ]};

                processor.check(condition, data, [], function (err, result) {
                    if (!result) {
                        done();
                    } else {
                        done('failed should have passed');
                    }
                });
            });
        });
        describe('$and', function () {
            it('should pass and eq', function (done) {
                var data = {'johnny': 5, robots: 1},
                    condition = {'$and' :
                            [
                                {'$eq' : {'johnny': 5}},
                                {'$eq' : {'robots': 1}}
                            ]};

                processor.check(condition, data, [], function (err, result) {
                    if (result) {
                        done()
                    }else{
                        done('failed should have passed');
                    }
                });
            });
            it('should fail and eq', function (done) {
                var data = {'johnny': 7, robots: 1},
                    condition = {'$and' :
                            [
                                {'$eq' : {'johnny': 5}},
                                {'$eq' : {robots: 1}}
                            ]};

                processor.check(condition, data, [], function (err, result) {
                    if (!result) {
                        done()
                    } else {
                        done('failed should have passed');
                    };
                });
            });
        });
        describe('$not', function () {
            it('should pass not eq', function (done) {
                var data = {robots: 2},
                    condition = {'$not' :
                            {'$eq' : {'robots': 1}}
                    };

                processor.check(condition, data, [], function (err, result) {
                    if (result) {
                        done();
                    } else {
                        done('failed should have passed');
                    };
                });
            });
            it('should fail not eq', function (done) {
                var data = {robots: 1},
                    condition = {'$not' :
                            {'$eq' : {'robots': 1}}
                    };

                processor.check(condition, data, [], function (err, result) {
                    if (!result) {
                        done();
                    } else {
                        done('failed should have passed');
                    };
                });
            });
        });
    });
});
