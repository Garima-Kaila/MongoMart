/**
 * Created by garima05 on 31-10-2016.
 */

(function (exports) {
    "use strict";
    function Utils() {
    };
    Utils.prototype = {
        // Returns a random integer between min (included) and max (included)
        // Using Math.round() will give you a non-uniform distribution!
        // @ref : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        getRandomIntInclusive: function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        //https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
        getJSON: function (url, successHandler, errorHandler) {
            var xhr = typeof XMLHttpRequest != 'undefined'
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onreadystatechange = function () {
                var status;
                var data;
                // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
                if (xhr.readyState == 4) { // `DONE`
                    status = xhr.status;
                    if (status == 200) {
                        successHandler && successHandler(xhr.response);
                    } else {
                        errorHandler && errorHandler(status);
                    }
                }
            };
            xhr.send();
        }
    };
    exports.Utils = new Utils();

})(this);

