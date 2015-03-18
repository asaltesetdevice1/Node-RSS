/**
 * Created by cshihadeh on 3/12/2015.
 */


var http=require("http");
var fs=require("fs");
var jobsRss="http://www.careerbuilder.com/RTQ/rss20.aspx?rssid=RSS_PD&num=25&geoip=false&ddcompany=false&ddtitle=false&cat=JN009";
var newsRss="http://feeds.alwatanvoice.com/ar/palestine.xml";
var xml2js = require('xml2js').parseString;

function jobs(request,response) {
    console.log("Request handler 'jobs' was called.");

    var xml='',json;
    response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
    //console.log(request.method);
    request = http.get(jobsRss, function (res) {
        // save the data to xml
        res.on('data', function (chunk) {
            xml += chunk;
        });

        res.on('end', function () {
            xml2js(xml, function (err, result) {
                json = JSON.stringify(result);//convert from js to json format string
              //  console.log(json);

                response.write(JSON.stringify(filter(json)));//(json)
                response.end();
            });
        });
    });
}
function filter(json)
{
    var test=JSON.parse(json);//convert json format to js or array
   // console.log(test);
    //iterate through array of objects
    var items=JSON.stringify(test['rss']['channel'][0].item);
  //  console.log("channel = " + items);
            /* var length =Object.keys(JSON.parse(items)).length;
             console.log("length = " + length);*/
    var filteredJson=[];
    filteredJson.push({'Marketing Top Ten Careers':'careerbuilder.com'});
    var count=0;
    for (var key in JSON.parse(items))
    {
        if ( count<10)
        {
            var obj=JSON.parse(items)[key];
            var title = obj['title'];
            var link=obj['link'];
            var description=obj['description'];
            filteredJson.push({Title: title, Link: link,Description: description});
        }
        count++;
    }
    return filteredJson;
}

function news(request,response){
    console.log("Request Received for 'news' was called.");

    var xml='',json;
  //  response.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});
    response.writeHead(200,{"Content-Type":"application/json"});
    request=http.get(newsRss,function(res){
        res.on('data', function (chunk) {
            xml += chunk;
        });
        res.on('end', function () {
            // convert xml to json
        //    console.log(xml);
            xml2js(xml, function (err, result) {
                json = JSON.stringify(result);
             //   console.log("json = " + json);
                response.write(json);
                response.end();
            });
        });
    });
}

function favicon(request,response) {
    console.log("Request handler 'favicon' was called.");
    var img = fs.readFileSync('./favicon.ico');
    response.writeHead(200, {"Content-Type": "image/x-icon"});
    response.end(img,'binary');
}
exports.jobs = jobs;
exports.news=news;
exports.favicon=favicon;

