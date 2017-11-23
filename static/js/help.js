//初始化载入
pageA();
var dataArr=[];
function setIframeHeight(id){
    try{
        var iframe = document.getElementById(id);
        if(iframe.attachEvent){
            iframe.attachEvent("onload", function(){
                iframe.height =  iframe.contentWindow.document.documentElement.scrollHeight+100;
            });
            return;
        }else{
            iframe.onload = function(){
                iframe.height = iframe.contentDocument.body.scrollHeight+20;
            };
            return;                 
        }     
    }catch(e){
        throw new Error('setIframeHeight Error');
    }
}
/*setIframeHeight('external-frame');*/
//导航栏点击
$(document).on("click","#nav li",function(){
	var check=$(this).parent().next("dl").html();
	var ele=$(this).parent().next("dl");
	var num=parseInt($(this).attr('num'));
	if(check){
		$("dl").hide();
		$("#nav li span").addClass("icon-youjiantou").removeClass("icon-youjiantou-copy");
		ele.slideToggle();
		$(this).find("span").addClass("icon-youjiantou-copy").removeClass("icon-youjiantou");
        $(".iframeContent").html(dataArr[num-1].content);
	}else{
		$("dl").hide();
		$("#nav li span").addClass("icon-youjiantou").removeClass("icon-youjiantou-copy");
		/*$("#external-frame").attr("height","");
		setIframeHeight('external-frame');*/
		$(".iframeContent").html(dataArr[num-1].content);

	}
	$("#nav li").removeClass("select");
	$(this).addClass("select");
	var txt=$(this).text();
	$(".position").text(txt);
})
//二级导航选择
$(document).on("click","#nav dd",function(){
	$("#nav dd").removeClass("select");
	$(this).addClass("select");
	var txt=$(this).text();
	$(".position").text(txt);
	/*$("#external-frame").attr("height","");
	setIframeHeight('external-frame');*/
    var num=$(this).attr('num');
    var numArr=num.split('-');
    var children=dataArr[numArr[0]-1].children;
    $(".iframeContent").html(children[numArr[1]-1].content);
})

//搜索功能
$(document).on("click",".searchBtn",function(){
	var  val=$(".searchInput").val();
	var len=$(".content li").length;
	for(var i=0;i<len;i++){
		var txt=$(".content li").eq(i).text();
		if(txt.indexOf(val)>-1){
			$(".content li").eq(i).click();
			break;
		}
	}
	var lenDd=$(".content dd").length;
	for(var i=0;i<lenDd;i++){
		var txtDd=$(".content dd").eq(i).text();
		if(txtDd.indexOf(val)>-1){
			$(".content dd").eq(i).parent().parent().prev('a').find("li").click();
			$(".content dd").eq(i).click();
			break;
		}
	}
})


//返回顶部
 $(".back_top").click(function(){
 	var picN=1;
    var t=setInterval(function(){
        picN++;
        if(picN>3){
            picN=2;
        }
        $(".back_top img").attr("src","img/top"+picN+".png");
    },200);
    setTimeout(function(){
        $("html,body").animate({scrollTop:0},"slow",function(){
            setTimeout(function(){
                $(".back_top").animate({top:-1000},1000,function(){
                    clearInterval(t);
                    $(".back_top img").attr("src","img/top1.png");
                });
            },500) 
        });
    },1000)
});
$(window).scroll(function(){
	var top=$(window).scrollTop();
    if(top>50){
        $(".back_top").css({
            top: '80%',
        });
    	$(".back_top").show();
    }/*else{
        $(".fix").hide();
    }*/
})

function pageA(){
	$.ajax({
		url:'./data.txt',
		type:'get',
		dataType:'text',
        success:function(data){
            var list=JSON.parse(data);
            dataArr=list;
            var html="";
            //console.log(list)
			for(var i=0;i<list.length;i++){
				if(list[i].children){
                    html+='<a href="javascript:void(0)">'+
                        	'<li num="'+list[i].num+'">'+list[i].name+'<span class="iconfont icon-youjiantou"></span></li>'+
						  '</a><dl>';
                    var childrenArr=list[i].children;
                    for(var j=0;j<childrenArr.length;j++){
                        html+='<a href="javascript:void(0)" >'+
                            	'<dd num="'+childrenArr[j].num+'">'+childrenArr[j].name+'</dd>'+
							'</a>';
					}
                    html+='</dl>';
				}
			}
			$("#nav").html(html);
        }
	})
}