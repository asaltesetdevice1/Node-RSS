/**
 * Created by cshihadeh on 3/12/2015.
 */

function route(handle, pathname, requset, response) {

    if (typeof handle[pathname] === 'function') {
        handle[pathname](requset,response);
    }else if(pathname==='/') {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Welcome...");
        response.end();
    }
    else if(pathname==='/favicon') {
        handle[pathname](response);

    }
    else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}
exports.route = route;
