/**
 * Resolve a json string path to value
 * @param  {Object} data
 * @param  {String} path the path to the value 'a.b.c.e'
 */
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

module.exports = {
    resolvePath : resolvePath
}
