/**
 * Created by garima05 on 31-10-2016.
 */


var path = require("path");
function getContentType(dataType) {
    var contentType;

    switch (dataType) {
        case 'js':
        case '.js':
            contentType = 'text/javascript';
            break;
        case 'css':
        case '.css':
            contentType = 'text/css';
            break;
        case 'json':
        case '.json':
            contentType = 'application/json';
            break;
        case 'png':
        case '.png':
            contentType = 'image/png';
            break;
        default: {
            contentType = 'text/html';
        }
    }
    return contentType;
}

module.exports = {
    getFileType: function (filePath) {
        return path.extname(filePath);
    },

    //@ref: http://stackoverflow.com/questions/19696240/proper-way-to-return-json-using-node-or-express
    sendResponse: function (res, status, dataType, response) {
        res.writeHead(status, {
            'Content-Type': getContentType(dataType)
        });
        res.end(response, 'utf-8');
    }
};
