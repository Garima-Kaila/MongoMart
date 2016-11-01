/**
 * Created by garima05 on 31-10-2016.
 */

var ctrlStatic = require('./controllers/static');
var ctrlGame = require('./controllers/game');
var utilities = require('./utilities');

module.exports = {
    serve: function (req, res) {
        var url = req.url;
        if (url === "/") {
            url = "/static/index.html";
        }

        if (url === "/spin") {
            var spinResult = ctrlGame.spin();
            if (spinResult) {
                utilities.sendResponse(res, 200, 'json', JSON.stringify(spinResult));
            } else {
                utilities.sendResponse(res, 500, '', "Internal Server Error");
            }
        } else if (url.indexOf("/static") === 0) {
            ctrlStatic.serveStaticFiles(url, (error, content) => {
                if (error) {
                    utilities.sendResponse(res, 500, '', "Internal Server Error - File not found");
                } else {
                    var type = utilities.getFileType(url);
                    utilities.sendResponse(res, 200, type, content);
                }
            });
        }
    }
}
