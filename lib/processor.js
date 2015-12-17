'use strict';

var baseActions = require('./baseActions'),
    async = require('async'),
    lodash = require('lodash'),
    logicalOperators = {};

logicalOperators = {
    "$or" : function or(conditions, data, customConditions, callback) {
                logical(conditions, data, customConditions, "or", callback);
            },
    "$and" : function and(conditions, data, customConditions, callback) {
                logical(conditions, data, customConditions, "and", callback);
            },
    "$not" : function not(conditions, data, customConditions, callback) {
                logical(conditions, data, customConditions, "not", callback);
            }
};

/**
 * Logical
 * @param  {String[]} conditions
 * @param  {Object} data
 * @param  {String} action and, or, not
 */
function logical(conditions, data, customConditions, action, callback) {
    var retVal = action === "and",
        conditionFunctions = [];

    if (!Array.isArray(conditions)) {
        check(conditions, data, customConditions, function (err, result) {
            retVal = result;
            callback(null, action === "not" ? !retVal : retVal);
        });
        return;
    }

    lodash.forEach(conditions, function (cond) {
        conditionFunctions.push(function (asynCallback) {
            check(cond, data, customConditions, asynCallback);
        });
    });

    async.parallel(conditionFunctions,
        function (err, results) {
            if (err) {
                callback(err);
                return;
            }

            async.reduce(results, action === "and", function (memo, resultItem, reduceCallback) {
                if (action === "and") {
                    reduceCallback(null, memo && resultItem);
                } else {
                    reduceCallback(null, memo || resultItem);
                }
            }, function (err, finalResult) {
                callback(null, action === "not" ? !finalResult : finalResult);
            });
        });
}

/**
 * Evaluate the rule
 * @param  {Object} conditions
 * @param  {Object} data
 * @callback  {func} results
 */
function check(conditions, data, customConditions, callback) {
    var logical = '',
        attr = '',
        base = '',
        custom = '';

    for (attr in conditions) {
        if (conditions.hasOwnProperty(attr)) {
            for (logical in logicalOperators) {
                if (logical === attr) {
                    logicalOperators[logical](conditions[attr], data, customConditions, callback);
                }
            }

            for (base in baseActions) {
                if (base === attr) {
                    baseActions[base](conditions[attr], data, customConditions, callback);
                }
            }

            for (custom in customConditions) {
                if (custom === attr) {
                    customConditions[custom](conditions[attr], data, customConditions, callback);
                }
            }
        }
    }
}

//Return API:
module.exports =  {
    check : check
}
