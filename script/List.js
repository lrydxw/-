module.exports={
	loadListHeader:function(type){
	   $("#header").load("html/list.html #listHeader",function(){
	   	$("#back").tap(function () {
	   		 if(type=='search'){
	   			var Search=require("./Search");
	   			Search.loadSearchHeader('search');
	   			Search.loadSearchContent("search");
	   	   }
	   		 else if(type=="buy"){
	   		 	var Buy=require("./Buy");
	   		 	Buy.loadBuyHeader();
	   		 	Buy.loadBuyContent();
	   		 }
	   	})	   	  
	   })
	},
	loadListContent:function(type,lists,type1){
		$("#content").load("html/list.html #listContent",function(){
			$(".change-listMain-info").html("");
			$.getJSON("lists.json",function(data1){
					var Toast=require("./Toast");
					//console.log(typeof data)
					if(data1=="0"){
						Toast.toast("暂无商品");
					}
					else{
						var data=data1[lists];
						//console.log(data)
						var len=data.length;
						$(".listMain-info").html("");
						for(var i=0;i<len;i++){
							var goodsID=data[i].goodsID;
							var goodsListImg=data[i].img;
							var goodsName=data[i].info;
							var price=data[i].price*1;
							var discount=data[i].discount*1;
							var newprice;
							if(discount==0){
								newprice=price.toFixed(2);
							}
							else{
								newprice=(price*discount/10).toFixed(2);
							}
							price=price.toFixed(2)
							$(".listMain-info").append('<li goodsID="'+goodsID+'">'+
								'<p><img src="'+goodsListImg+'" /></p>'+
								'<p>'+goodsName+'</p>'+
								'<p><span>1212</span><span>购物券</span><span>￥</span><span>店铺红包</span></p>'+
									
								'<p><span>￥'+newprice+'</span><del>￥'+price+'</del></p>'+
									
								'<p><span>月销'+Math.floor(Number(price)+Number(newprice))+'</span><span>包邮</span><span>热卖</span></p>'+
									
							'</li>');
							$(".change-listMain-info").append('<li goodsID="'+goodsID+'">'+
								'<div class="left"><img src="'+goodsListImg+'" /></div>'+
								'<div class="right">'+
									'<p>'+goodsName+'</p>'+
									'<p><span>1212</span><span>购物券</span><span>￥</span><span>店铺红包</span></p>'+
										
									'<p><span>￥'+newprice+'</span><del>￥'+price+'</del></p>'+
									'<p><span>月销115</span><span>包邮</span><span>热卖</span></p>'+
								'</div>'+
								
							'</li>')
							
						}
					}
					$(".listMain-info li").tap(function () {
						var goodsID=$(this).attr("goodsID");
						var img=$(this).find("img").attr("src");
						var goodsName=$(this).find("p").eq(1).html();
						var newprice=$(this).find("p").eq(3).find("span").html().substring(1)*1;
						var price=$(this).find("p").eq(3).find("del").html().substring(1)*1;
						var discount=Math.floor(10*newprice*1/price*1);
						var Detail=require("./Detail");
						Detail.loadDetailHeader('list',lists,type1);
						Detail.loadDetailContent(img,goodsName,price,discount);
						Detail.loadDetailFooter(img,goodsName,price,discount);
						$("#detailfooter").show()
					})
					$(".change-listMain-info li").tap(function () {
						var goodsID=$(this).attr("goodsID");
						var img=$(this).find("img").attr("src");
						var goodsName=$(this).find(".right p").eq(0).html()
						var newprice=$(this).find(".right p").eq(2).find("span").html().substring(1);
						var price=$(this).find(".right p").eq(2).find("del").html().substring(1)*1;
						var discount=Math.floor(10*newprice*1/price*1);					
						var Detail=require("./Detail");
						Detail.loadDetailHeader("list",lists,type1);
						Detail.loadDetailContent(img,goodsName,price,discount);
						Detail.loadDetailFooter(img,goodsName,price,discount);
						$("#detailfooter").show()
					})
			});
			
			
			
			
			
			var count=0;
			$("#changeList").on("tap",function(){
				count++;
				if(count%2!=0){
					$(".listMain-info").css("display","none")
					$(".change-listMain-info").css("display","block");
					$(".col").show();
					$(".row").hide()
					
				}else{
					$(".change-listMain-info").css("display","none")
					$(".listMain-info").css("display","flex")
				  	 $(".col").hide();
					$(".row").show()
				}
			});
            $(".back1").on("tap",function(){
             	if(type=="search"){
             		var Search=require("./Search");
             		Search.loadSearchHeader();
             		Search.loadSearchContent();
             	}
            })
		})
	}
}
