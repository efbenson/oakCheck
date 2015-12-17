/* globals describe,it, require*/

'use strict';
var assert = require('chai').assert,
    expect = require('chai').expect,
    processor = require('../lib/processor');

describe ('oak-check', function () {
    describe ('#baseconditions()', function (){
        describe ('$eq', function () {

            it('should pass eq', function (done) {
                var data = {'johnny': 5},
                    condition = {'$eq' : {'johnny' : 5}};

                processor.check(condition, data, [], function (err, result) {
                    if (result) {
                        done();
                    }else {
                        done('failed should have passed');
                    }
                });
            });
            it('should fail eq', function (done) {
                var data = {'johnny': 5},
                    condition = {'$eq' : {'johnny' : 6}};

                processor.check(condition, data, [], function (err, result) {
                    if (!result) {
                        done();
                    } else {
                        done('passed should have failed')        
                    }
                });
            });
            it('should pass nested eq', function (done) {
                var data = {robots : {'johnny': 5}},
                    condition = {'$eq' : {'robots.johnny' : 5}};

                processor.check(condition, data, [], function (err, result) {
                    if (result) {
                        done();
                    } else {
                        done('passed should have passed');
                    }
                });
            });
            it('should fail nested eq', function (done) {
                var data = {robots : {'johnny': 5}},
                    condition = {'$eq' : {'robots.johnny' : 6}};

                processor.check(condition, data, [], function (err, result) {
                    if (!result) {
                        done();
                    } else {
                        done('passed should have passed');
                    }
                });
            });
        });
        describe ('$gt', function () {
            it('should pass gt', function (done) {
                var data = {'johnny': 6},
                    condition = {'$gt' : {'johnny': 5}};

                processor.check(condition, data, [], function (err, result) {
                    if (result) {
                        done();
                    } else {
                        done('failed should have passed');
                    }
                });
            });
            it('should fail gt', function (done) {
                var data = {'johnny': 5},
                    condition = {'$gt' : {'johnny': 5}};

                processor.check(condition, data, [], function (err, result) {
                    if (!result) {
                        done();
                    } else {
                        done('passed should have failed');
                    }
                });
            });
        });
        describe ('$gte', function () {
            it('should pass gte', function (done) {
                var data = {'johnny': 5},
                    condition = {'$gte' : {'johnny': 5}};

                processor.check(condition, data, [], function (err, result) {
                    if (result) {
                        done();
                    } else {
                        done('failed should have passed');
                    }
                });
            });
            it('should fail gte', function (done) {
                var data = {'johnny': 4},
                    condition = {'$gte' : {'johnny': 5}};

                processor.check(condition, data, [], function (err, result) {
                    if (!result) {
                        done();
                    } else {
                        done('passed should have failed');
                    }
                });
            });
        });
        describe ('$lt', function () {
            it('should pass lt', function (done) {
                var data = {'johnny': 4},
                    condition = {'$lt' : {'johnny': 5}};

                processor.check(condition, data, [], function (err, result) {
                    if (result) {
                        done();
                    } else {
                        done('failed should have passed');
                    };
                });
            });
            it('should fail lt', function (done) {
                var data = {'johnny': 5},
                    condition = {'$lt' : {'johnny': 5}};

                processor.check(condition, data, [], function (err, result) {
                    if (!result) {
                        done();
                    } else {
                        done('passed should have failed');
                    }
                });
            });
        });
        describe ('$lte', function () {
            it('should pass lte', function (done) {
                var data = {'johnny': 5},
                    condition = {'$lte' : {'johnny': 5}};

                processor.check(condition, data, [], function (err, result) {
                    if (result) {
                        done();
                    } else {
                        done('failed should have passed');
                    }
                });
            });
            it('should fail lte', function (done) {
                var data = {'johnny': 6},
                    condition = {'$lte' : {'johnny': 5}};

                processor.check(condition, data, [], function (err, result) {
                    if (!result) {
                        done();
                    } else {
                        done('passed should have failed');
                    }
                });
            });
        });
    });
});
