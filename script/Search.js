
module.exports={
	loadSearchHeader:function(){
		$("#header").load("html/search.html #searchHeader",function () {
			
		})
	},	
	loadSearchContent:function(){
		var that=this;
		$("#footer li").eq(1).addClass("active").siblings().removeClass("active");
		$("#content").load("html/search.html #searchContent",function(){	
			$(".list").each(function (index) {
				$(this).attr("lists","lists"+(index+1))
			})
			$(".list li").tap(function () {
				var lists=$(this).parents(".list").attr("lists");
				//console.log(classID)
				var List=require("./List");
				List.loadListHeader("search",lists);
				List.loadListContent("search",lists);
			})
			
			setTimeout(function () {
				$(".list-top").each(function () {
					var a1=$(".list-top").eq(0).offset().top;
					var a= $(this).offset().top;
					$(this).attr("top",a-a1);
				})
			},300)
			
			function timerFunction() {
				var b= $("section").scrollTop();
				var len=$(".list-top").length;
				for(var i=0;i<len;i++){
					var a=$(".list-top").eq(i).attr("top")*1;
					var c=a+$(".list-top").eq(i).siblings(".man").height()*1;
					var d=$(".list-top").eq(i).height();
//					console.log(d)
					if(b>=a&&b<=c){
						$(".list-top").eq(i).addClass("fixed")
					}
//					else if(b>c&&b<c+d){
//						$(".list-top").eq(i).css("bottom",b-c-d)
//					}
					else{
						$(".list-top").eq(i).removeClass("fixed");
					}
				}
			}			
			$("section").scroll(function () {
				timerFunction()
			})	
		})
	}
}