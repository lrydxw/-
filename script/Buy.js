
module.exports = {
	loadBuyHeader:function(){
		$("#header").load("html/buy.html #buyHeader",function(){
			//console.log("ok")
		})
	},
	
	loadBuyContent:function(){
		$("#indexfooter").show();
		$("#detailFooter").hide();
		$("#indexfooter li").eq(2).addClass("active").siblings().removeClass("active");
		$("#content").load("html/buy.html #buyContent",function(){
			$(".buyImg img").each(function (index) {
					if(index==8){
						index=0
					}
					if(index==9){
						index=1
					}
					$(this).attr("lists","lists"+(index+1))
				})
			$(".buyImg img").tap(function(){
				
				var lists=$(this).attr("lists")
				var List=require("./List");
				List.loadListHeader("buy");
				List.loadListContent("buy",lists,'type1');
			});	
			
		});
	}
}