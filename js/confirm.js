$(function(){
/*点击新增收货地址*/	
	$(".teap_content button").on("click",function(){
		$(".cover").show()
		$(".adress").show()
	})
	$(".cancle").on("click",function(){
		$(".cover").hide()
		$(".adress").hide()
	})

/*点击支付、物流去，出现确认框*/
	$(".click_pay").click(function(){
		$(this).css({border:"2px solid #000"}).siblings(".click_pay").css({border:"2px solid #ddd"}).end().children('.arrow').show().end().siblings(".click_pay").children('.arrow').hide()
		// $(".arrow").show()
	})
	$(".click_express").click(function(){
		$(this).css({border:"2px solid #000"}).siblings(".click_express").css({border:"2px solid #ddd"}).end().children('.arrow').show().end().siblings(".click_express").children('.arrow').hide()
	})
	
	// $(".teap_content").on('click', '.cli', function() {
 //     	$(this).css({border:"2px solid #000"}).siblings(".click_pay").css({border:"2px solid #ddd"}).children('.arrow').show()
	// });
	// $(".teap_content").on('click', '.cli', function() {
 //     	$(this).css({border:"2px solid #000"}).siblings(".click_pay").css({border:"2px solid #ddd"}).children('.arrow').show()
	// });

/*点击返回购物车*/
	$(".back2").click(function(){
		location="cart.html"
	})

/*商品总价*/
	$.cookie.json=true;
	var products=$.cookie("products")	
	console.log(products)
	//遍历每个商品，获得总价
	var total=0;
	for (var i = 0; i < products.length; i++) {
		total+=products[i].product_price*products[i].product_count
	}
	$("#pro_total").text(total)
	//实付价格
	$("#total").text(total.toFixed(2))

/*地址三级级联*/
	$.getJSON('../data/addresses.json').done(function(data){
		resetData(data);
	})

	//重置json数据格式
		var adress={}
	function resetData(data){
		console.log(data)
		$(data.regions).each(function(index,provence){
			adress[provence.name]={};
			$(provence.regions).each(function(index,city){
				adress[provence.name][city.name]=city.regions
			})
		})
			console.log(adress)
			provenceInit();
	};

	//添加省份数据
	function provenceInit(){
		var html="";
		for(var provenceName in adress){
			html+="<option value='"+provenceName+"'>"+provenceName+"</option>"
		}
		$("#provence").append(html);
		cityInit();
	}

	//添加城市数据
	function cityInit(){
		var _provence=$("#provence").val()
		var html=""
		var cities=adress[_provence]
		// $(adress[_provence]).each(function(index,city){
			for(var cityName in cities){
				html+="<option value='"+cityName+"'>"+cityName+"</option>"
			}
			$("#city").empty().append(html);
		// })
		districtInit ()
	}

	//添加区县数据
	function districtInit () {
		var _provence=$("#provence").val()
		var _city=$("#city").val()
		var districts=adress[_provence][_city]
		var html=""
			districts.forEach(function(district){
				html += "<option value='"+ district.name +"'>"+ district.name +"</option>";
			})
			$("#district").empty().append(html);
		}

	//省份、城市、区县相应更换		
	$("#provence").on("change",function(){
		cityInit()
	})

	$("#city").on("change",function(){
		districtInit()
	})

/*点击确认按钮将信息保存到页面*/
	$("#comfirm").click(function(){
		var _name=$(".name").val(),
			_provence=$("#provence").val(),
			_city=$("#city").val(),
			_district=$("#district").val(),
			_more=$("#more").val(),
			_phone=$(".phone").val(),
			_user_adress="";
		_user_adress+=_name+","+_phone+","+	_provence+_city+_district+_more;
		$(".user_adress").append(_user_adress)
		$(".cover").hide()
		$(".adress").hide()
		$(".user_adress p").css({display:"inline-block"})
	})

/*点击提交按钮，温馨提示一下*/	
	$("#submit").click(function(){
		alert("感谢光顾<龙魂专业耳机商城>，支付系统暂未开放！你可以选择货到付款    ⌒ .  ⌒")
	})
})