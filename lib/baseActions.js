
var util = require('./util');

function equals(condition, data, customConditions, callback) {
    var attr;
    for (attr in condition) {
        if (condition.hasOwnProperty(attr)) {
            callback(null, util.resolvePath(data, attr) === condition[attr]);
        }
    }
}

function greaterThan(condition, data, customConditions, callback) {
    var attr;
    for (attr in condition) {
        if (condition.hasOwnProperty(attr)) {
            callback(null, util.resolvePath(data, attr) > condition[attr]);
        }
    }
}

function greaterThanEqual(condition, data, customConditions, callback) {
    var attr;
    for (attr in condition) {
        if (condition.hasOwnProperty(attr)) {
            callback(null, util.resolvePath(data, attr) >= condition[attr]);
        }
    }
}

function lessThan(condition, data, customConditions, callback) {
    var attr;
    for (attr in condition) {
        if (condition.hasOwnProperty(attr)) {
            callback(null, util.resolvePath(data, attr) < condition[attr]);
        }
    }
}

function lessThanEqual(condition, data, customConditions, callback) {
    var attr;
    for (attr in condition) {
        if (condition.hasOwnProperty(attr)) {
            callback(null, util.resolvePath(data, attr) <= condition[attr]);
        }
    }
}

module.exports =  {
    '$eq' : equals,
    '$gt' : greaterThan,
    '$gte' : greaterThanEqual,
    '$lt' : lessThan,
    '$lte' : lessThanEqual
};
