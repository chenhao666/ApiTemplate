var fs=require('fs');

var path=require('path');


exports.showForm=function(req,res){
    res.render('form');
}
exports.addTitle1=function(req,res){
    var dataObj=req.body;
    fs.readFile(path.normalize(__dirname+'/../static/data.txt'),'utf-8',function(err,data){
        var list=JSON.parse(data);
        var num=list.length+1;
        dataObj.num=num;
        list.push(dataObj);
        fs.writeFile(path.normalize(__dirname+'/../static/data.txt'), JSON.stringify(list),function(err) {
            if (err) throw err;
            res.json({'code':'200','msg':'success'})
        });
    })
}

exports.addTitle2=function(req,res){
    var dataObj=req.body;
    //console.log(dataObj)
    fs.readFile(path.normalize(__dirname+'/../static/data.txt'),'utf-8',function(err,data){
        var list=JSON.parse(data);
        if(list[dataObj.pNum-1].children){
            var children=list[dataObj.pNum-1].children;
        }else{
            var children=[];
        }
       //console.log(children)
        var num=children.length+1;
        dataObj.num=dataObj.pNum+'-'+num;
        children.push(dataObj);
        list[dataObj.pNum-1].children=children;
        //console.log(JSON.stringify(list))
        fs.writeFile(path.normalize(__dirname+'/../static/data.txt'), JSON.stringify(list),function(err) {
            if (err) throw err;
            res.json({'code':'200','msg':'success'})
        });
    })
}

exports.addContent=function(req,res){
    var dataObj=req.body;
    //console.log(dataObj)
    fs.readFile(path.normalize(__dirname+'/../static/data.txt'),'utf-8',function(err,data){
        var list=JSON.parse(data.toString());
        if(dataObj.citeNum.indexOf('-')>-1){
            var dataArr=dataObj.citeNum.split('-');
            var childrenArr=list[dataArr[0]-1].children;
            childrenArr[dataArr[1]-1].content=dataObj.content;
        }else{
            list[dataObj.citeNum-1].content=dataObj.content;
        }
        fs.writeFile(path.normalize(__dirname+'/../static/data.txt'), JSON.stringify(list),function(err) {
            if (err) throw err;
            res.json({'code':'200','msg':'success'})
        });
    })
}