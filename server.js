/**
 * Created by cshihadeh on 3/12/2015.
 */
var http = require("http"),
    url=require("url");

function start(route,handle) {

    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("path name is " + pathname);
        route(handle, pathname, request,response);
    }
    http.createServer(onRequest).listen(8080);
    console.log("Server is running ");
}
exports.start = start;
