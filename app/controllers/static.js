/**
 * Created by garima05 on 31-10-2016.
 */


var fs = require('fs');

module.exports = {
    serveStaticFiles: function (path, cb) {
        var filePath = './app' + path;
        fs.readFile(filePath, cb);
    }
}