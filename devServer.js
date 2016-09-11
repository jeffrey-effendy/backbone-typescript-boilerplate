var Koa = require("koa");
var Static = require("koa-static");

var app = Koa();

app.use(Static(__dirname + '/dist'));

app.listen(8083);
