//var str = "我是首页";
//module.exports = str;
var mySwiper, goodsID1;
module.exports = {
	loadDetailHeader: function(type, lists,type1) {
		$("#header").load("html/detail.html #detailHeader", function() {
			$("#back").on("tap", function() {
				if(type == "home") {
					var Home = require("./Home");
					Home.loadHomeHeader();
					Home.loadHomeContent();
				}
				else if(type=="list"){
					var List=require("./List");
					if(type1=="type1"){
						List.loadListHeader("buy",lists);
						List.loadListContent("buy",lists);	
					}
					else{
						List.loadListHeader("search",lists);
						List.loadListContent("search",lists);						
					}
					$("#indexfooter").show();
					$("#detailfooter").hide();
					
				}
				else if(type=='buy'){
					var Buy=require("./Buy");
					Buy.loadBuyHeader();
					Buy.loadBuyContent();
				}
			})
		})
	},

	loadDetailContent: function(img,goodsName,price,discount) {
		$("#content").load("html/detail.html #detailContent", function() {
					$("section").scrollTop(0)
					var html = '<img src="'+img+'"/>';
					$(".swiper-container").html(html);
					price=price.toFixed(2);
					if(discount == 0) {
						newprice = price.toFixed(2);
						price = ""
					} else {
						newprice = (price * discount / 10).toFixed(2);
						price = "￥" + price;
					}
					$(".proInfo").html('<p>' + goodsName + '</p>' +
						'<p>' +
						'<span>￥</span>' +
						'<b>' + newprice + '</b>' +
						'<span class="dprm"> 店铺热卖</span>' +
						'</p>' +
						'<p><del>' + price + '</del></p>')
					
					
					$(".proimg").find("img").attr("src",img);

					$(".list3").html(goodsName);
		})
	},
	loadDetailFooter: function(img,goodsName,price,discount) {
		$("#indexfooter").hide();
		$("#detailfooter").show();
		$("#detailfooter").load("html/detail.html #detailFooter", function() {
			var Toast=require("./Toast");
			$(".addcart").tap(function() {
				if(localStorage.getItem("userID")) {
					//console.log(JSON.parse(localStorage.getItem('cartList')))
					var userID = localStorage.getItem("userID");
					if(localStorage.getItem("cartList")&&localStorage.getItem("cartList")!="[]"){
						var cartListArr=JSON.parse(localStorage.getItem("cartList"));
						var len=cartListArr.length;
						for(var i=0;i<len;i++){
							//console.log(cartListArr[i].img)
							if(img==cartListArr[i].img){
								cartListArr[i].number=cartListArr[i].number*1+1;
								break;
							}
							else if(img!=cartListArr[i].img&&i==len-1){
								var cartObj={
									"img":img,
									"price":price,
									"discount":discount,
									"goodsName":goodsName,
									"number":1
								};
								cartListArr.push(cartObj);
							}
						}
						localStorage.setItem("cartList",JSON.stringify(cartListArr))
					}
					else{
						var cartListArr=[];
						var cartObj={
							"img":img,
							"price":price,
							"discount":discount,
							"goodsName":goodsName,
							"number":1
						};
						cartListArr.push(cartObj);
						//console.log(cartListArr);
						localStorage.setItem("cartList",JSON.stringify(cartListArr))						
					}
					Toast.toast("加入购物车成功")
				} else {
					var Login = require("./Login");
					Login.loadLoginHeader("detail",img,goodsName,price,discount);
					Login.loadLoginContent("detail",img,goodsName,price,discount);
					$("#detailfooter").hide();
					$("#indexfooter").show();
				}
			})
		})
	}
}