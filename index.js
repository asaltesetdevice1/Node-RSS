/**
 * Created by cshihadeh on 3/12/2015.
 */
var server=require('./server'),
    router = require("./router"),
    requestHandlers = require("./requestHandler");

var handle = {}
handle["/jobs"] = requestHandlers.jobs;
handle["/news"] = requestHandlers.news;
handle["/favicon.ico"]=requestHandlers.favicon;
server.start(router.route, handle);
