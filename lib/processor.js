'use strict';

/**
 * @constructor
 */
function Processor() {
    var self = this;

    self.customCondition = {};
    self.baseActions = {
        "$eq" : function eq(conditions, data) {
            var attr;
            for (attr in conditions) {
                if (conditions.hasOwnProperty(attr)) {
                    return resolvePath(data, attr) === conditions[attr];
                }
            }
        }
    };

    self.logicalOperators ={
        "$or" : function or(conditions, data) {
                    return logical.call(self, conditions, data, "or");
                },
        "$and" : function and(conditions, data){
                    return logical.call(self, conditions, data, "and");
                },
        "$not" : function not(conditions, data){
                    return logical.call(self, conditions, data, "not");
                }
    };
}

function resolvePath(data, path) {
    var steps = path.split('.'),
        obj = data,
        i = 0;

    for (i = 0; i < steps.length; i++) {
        obj = obj[steps[i]];
        if (obj === undefined) {
            return obj;
        }
    }
    return obj;
}

function logical(conditions, data, action) {
    /*jshint validthis:true */
    var self = this,
        retVal = action === "and",
        i = 0;
    for (i = 0; i < conditions.length; i++){
        if (action === "and"){
            retVal = retVal && check.call(self, conditions[i], data);		
        }
        else{
            retVal = retVal || check.call(self, conditions[i], data);					
        }       
    }

    return action === "not" ? !retVal : retVal;
}

/**
 * add a condition
 * 
 */
function addCustomCondition(name, func) {
    /*jshint validthis:true */
    var self = this;
    self.customCondition[name] = func;
}

function check(conditions, data) {
    /*jshint validthis:true */
    var self = this,
        logical = '',
        attr = '',
        base = '',
        custom = '';

    for (attr in conditions){
        if (conditions.hasOwnProperty(attr)) {      
            for (logical in self.logicalOperators){
                if (logical === attr){
                    return self.logicalOperators[logical].call(self, conditions[attr], data);
                }
            }

            for (base in self.baseActions){
                if (base === attr){
                    return self.baseActions[base].call(self, conditions[attr], data);
                }
            }

            for (custom in self.customCondition){
                if (custom === attr){
                    return self.customCondition[custom].call(self, conditions[attr], data);
                }
            }
        }		
	}
}

function evaluator(token){

}

//Define API:
Processor.prototype.addCustomCondition = addCustomCondition;
Processor.prototype.check = check;

//Return API:
module.exports =  Processor;