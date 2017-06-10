
module.exports = {
	//加载的首页的头部区域
	loadHomeHeader:function(){
		//load()方法去加载我们需要的内容
		$("#header").load("html/home.html #homeHeader",function(){
			//console.log("ok")
		})
	},
	//加载的首页的内容区域
	loadHomeContent:function(){		
		$("#content").load("html/home.html #homeContent",function(){
			$(".list_ul li").tap(function(){
				var $index=$(this).index();	
				$(this).addClass("list_act").siblings().removeClass("list_act");
				$(".list_product>div").eq($index).removeClass("hid").siblings().addClass("hid");		
				$.getJSON("lists.json",function(data1){						
						var lists;
						switch ($index){
							case 0:
								lists="lists3";
								break;
							case 1:
								lists="lists4";
								break;
							case 2:
								lists="lists5";
								break;
							default:
								lists="lists3";
								break;
						}
						//console.log(data1)
						var data=data1[lists];
						var len=data.length;
						//console.log(data);
						$(".list_pro").html("");
						for(var i=0;i<len;i++){
							var ImgSrc=data[i].img;
							var price=data[i].price;
							var discount=data[i].discount;
							var proName=data[i].info;
							var newPrice=0;
							if(discount=="0"){
								discount=""
								newPrice=price;
								price="";
							}else{
								newPrice=(price*discount/10).toFixed(2);
								discount=discount+"折";								
								price="￥"+price
							}
							$(".list_pro").append('<dl class="proItem">'+
								'<dt>'+
								'<img src="'+ImgSrc+'"/>'+
								'</dt>'+
								'<dd>'+
								'<p>'+
								'<i>￥'+newPrice+'</i>'+
								'<del>'+price+'</del>'+
								'<span>'+discount+'</span>'+
								'</p>'+
								'<span class="pro_spa">'+proName+'</span>'+
								'</dd>'+
							'</dl>');	
						}
						$(".proItem").on("tap",function(){
							var img=$(this).find("img").attr("src");
							var goodsName=$(this).find(".pro_spa").html();
							var price=$(this).find("del").html().substring(1)*1;
							var discount=$(this).find("dd p span").html().substring(0,1)*1;
							var Detail=require("./Detail");
								Detail.loadDetailHeader("home");
								Detail.loadDetailContent(img,goodsName,price,discount);
								Detail.loadDetailFooter(img,goodsName,price,discount);
								$("#detailfooter").show()
						})
					});
			});
			$(".list_ul li").eq(0).trigger("tap");
			var swiper=new Swiper(".swiper-container",{
				autoplay:3000,
				loop:true,
				autoplayDisableOnInteraction:false,
				pagination:'.swiper-pagination'
			});	
			//吸顶在手机端有BUG
//			setTimeout(function () {
//				var a=$(".list_ul").offset().top;
//				$(".list_ul").attr("top",a);				
//			},100);						
//			function timerFunction() {
//				var a= $("section").scrollTop();
//				var b1=parseFloat($("html").css("font-size"));
//				var b=b1*8.76-$(".list_ul").height();
//				if(a>b){
//					$(".list_ul").addClass("fixed");
//				}
//				else{
//					$(".list_ul").removeClass('fixed')
//				}
//			}			
//			$("section").scroll(function () {
//				timerFunction()
//			})			
		})		
		$("#indexfooter").show();
		$("#detailFooter").hide();
		$("#footer li").eq(0).addClass("active").siblings().removeClass("active");
	},
	loadHomeFooter:function(){
		//load()方法去加载我们需要的内容
		$("#footer").load("html/home.html #indexfooter",function(){
			//console.log("ok")
		})
	}
}
