module.exports = {
	loadHeader: function() {
		$("header").load("html/cart.html #cartheader", function() {
			$("#back").tap(function () {
				var Home=require("./Home");
				Home.loadHeader();
				Home.loadContent();
			})
			$("#toEdit").tap(function() {
				$(".sub").css("display", "inline-block");
				$(".add").css("display", "inline-block");
				$(this).css("visibility","hidden");
				$(".search").html("编辑");
				$("#toPay").hide();
				$("#toComplete").show();
			});
			$("#toComplete").tap(function() {
				$(".sub").hide();
				$(".add").hide();
				$(this).hide();
				$(".search").html("购物车");
				$("#toPay").show();
				$("#toEdit").css("visibility","visible");
			});
			$("#toPay").tap(function() {												
						//把购买记录存入本地
						var Toast=require("./Toast");
						var data=[];
						var len=$(".goodsList").length;						
						for(var i=0;i<len;i++){
							var $that=$(".goodsList").eq(i)
							var img=$that.find("img").attr("src");
							var goodsName=$that.find(".goodsName").html();
							var price=$that.find(".price span").html().substring(1);
							var number=$that.find(".number").html();
							var discount=$that.attr("discount");
							var obj={
								"img":img,
								"goodsName":goodsName,
								"price":price,
								"number":number,
								"discount":discount
							}
							data.push(obj)
						}
						//console.log(data)
						if(!localStorage.getItem("orderList")||localStorage.getItem("orderList")=="[]"){
							localStorage.setItem("orderList",JSON.stringify(data))
						}
						else{
							var order=JSON.parse(localStorage.getItem("orderList"));
							for(var i=0;i<data.length;i++){
								for(var j=0;j<order.length;j++){
									console.log(order.length)
									if(data[i].img==order[j].img){
										order[j].number=Number(order[j].number)+Number(data[i].number);
										break;
									}
									if((data[i].img!=order[j].img)&&(j==order.length-1)){
										order.push(data[i]);
										break;
									}
								}
							}				
							orderList = JSON.stringify(order);
							localStorage.setItem("orderList", orderList);
						}
						//var a=JSON.parse(localStorage.getItem("orderList"));
						//console.log(a)
						//删除数据库中商品
						localStorage.removeItem("cartList")
						$(".goodsList").remove();
						Toast.toast("结算成功")
						setTimeout(function () {
							module.exports.loadHeader();
							module.exports.loadContent();
						},300)
			})
		})
	},
	loadContent: function() {
		$("section").load("html/cart.html #cartcontent", function() {
			$(".goShopping").tap(function () {
				var Home=require("./Home");
				Home.loadHomeHeader();
				Home.loadHomeContent();
			});
			if(localStorage.getItem("userID")) {
				var userID = localStorage.getItem("userID");
					if(!localStorage.getItem("cartList")||localStorage.getItem("cartList")=="[]"){
						$("#toEdit").hide();
						$("#toPay").hide();
						$(".iconfont #back").show();
						$(".emptyCart").css("display","flex");
					}							
					else {		
						var data=JSON.parse(localStorage.getItem("cartList"));
						//console.log(data)
								var len = data.length;
								var html = "";
								for(var i = 0; i < len; i++) {
									var img = data[i].img;
									var goodsName = data[i].goodsName;
									var price = data[i].price * 1;
									var discount = data[i].discount * 1;
									var number = data[i].number * 1;
									var newprice;
									if(discount == 0) {
										newprice = price.toFixed(2);
									} else {
										newprice = (price * discount / 10).toFixed(2);
									}
									html += '<li class="goodsList" discount="'+discount+'">' +
										'<img class="goodsListImg" src="' + img + '"/>' +
										'<div class="goodsInfo">' +
										'<p class="goodsName">' + goodsName +
										'</p>'+
										'<p class="price">' +
										'单价: <span>￥' + newprice + '</span>' +
										'</p>' +
										'<p class="goodsCount">' +
										'数量: ' +
										'<button class="sub">-</button>' +
										'<span class="number" img="' + img + '">' + number + '</span>' +
										'<button class="add">+</button>' +
										'</p>' +
										'</div>' +
										'<div class="deteGoods" img="' + img + '">删除</div>' +
										'</li>'
								}
								$("#cartcontent").html(html);
								$(".goodsList").swipeLeft(function() {
									$(this).animate({
										"left": "-1.2rem"
									}, 200).siblings().animate({
										"left": "0rem"
									}, 300);
								});
								$(".goodsList").swipeRight(function() {
									$(this).animate({
										"left": "0rem"
									}, 200);
								});
								$("#toEdit").tap(function () {
									$(".goodsList").trigger("swipeRight")
								})
								//加减商品
								var Toast = require("./Toast");
								$(".sub").tap(function() {
									var number = $(this).siblings(".number").html() * 1;
									var img=$(this).siblings(".number").attr("img");
									//console.log(img)
									if(number == 1) {
										Toast.toast("数量不能小于1", 1000)
									} else {
										number--;
										$(this).siblings(".number").html(number);
										var cartListArr=JSON.parse(localStorage.getItem("cartList"));
										for(var i=0;i<cartListArr.length;i++){
											if(img==cartListArr[i].img){
												cartListArr[i].number=number
											}
										}
										localStorage.setItem("cartList",JSON.stringify(cartListArr));
									}
								});
								$(".add").tap(function() {
									var number = $(this).siblings(".number").html() * 1;
									var img=$(this).siblings(".number").attr("img");							
									
										number++;
										$(this).siblings(".number").html(number);
										var cartListArr=JSON.parse(localStorage.getItem("cartList"));
										for(var i=0;i<cartListArr.length;i++){
											if(img==cartListArr[i].img){
												cartListArr[i].number=number
											}
										}
										localStorage.setItem("cartList",JSON.stringify(cartListArr));
								});
								//删除商品
								$(".deteGoods").tap(function() {
									var img = $(this).attr("img");
									$(this).parents(".goodsList").remove();
									var cartListArr=JSON.parse(localStorage.getItem("cartList"));
									for(var i=0;i<cartListArr.length;i++){
										if(img==cartListArr[i].img){
											cartListArr.splice(i,1)
										}
									}
									localStorage.setItem("cartList",JSON.stringify(cartListArr));
									if($(".goodsList").length==0){
										var Cart = require("./Cart");
										Cart.loadHeader();
										Cart.loadContent();
									}
								})
							
						
					}

			} 
			else {
				var Login = require("./Login");
				Login.loadHeader("cart");
				Login.loadContent("cart");
			};
		})
	}
}