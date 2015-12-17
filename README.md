# oak-check
rule based model validator

oak check allows you to run "queries" against a json object in order to validate something.

## Built in logical operators
- $or
- $and
- $not

## Built in comparison operators
- $eq - Equals
- $gt - Greater than
- $gte - Greater than or equal to
- $lt - Less than
- $lte - Less than or equal to

## Examples

### Simple
	var data = {'johnny': 5},
		condition = {'$eq' : {'johnny' : 5}};

	processor.check(condition, data, [], function (err, result) {
		if (result) {
			console.log('found him!');
		}else {
			console.log('johnny 5 is dead');
		}
	});
	
### Deep

	var data = {robots : {'johnny': 5}},
		condition = {'$eq' : {'robots.johnny' : 5}};

	processor.check(condition, data, [], function (err, result) {
		if (!result) {
			console.log('found him!');
		} else {
			console.log('johnny 5 is dead');
		}
	});
	
### Logical

	var data = {'johnny': 6},
		condition = {'$or' :
				[
					{'$eq' : {'johnny': 5}},
					{'$eq' : {'johnny': 6}}
				]};

	processor.check(condition, data, [], function (err, result) {
		if (result) {
			console.log('found a robot!');
		} else {
			console.log('nothing to see here');
		}
	});
	
### Custom Operators
You can pass in custom operator functions to do evaluation on data.  

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
		if (!result) {
			done();
		} else {
			done('failed should have passed');
		}
	});