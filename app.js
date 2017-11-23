var express=require('express');
var router=require('./router/router.js');
var bodyParser=require("body-parser");
var app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));

app.use('/static',express.static('./static'));
app.use('/public',express.static('./public'));

app.get('/',router.showForm);
app.post('/addTitle1',router.addTitle1);
app.post('/addTitle2',router.addTitle2);
app.post('/addContent',router.addContent);

app.listen(3030);