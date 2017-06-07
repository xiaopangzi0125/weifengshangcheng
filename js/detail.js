$(function(){
/*放大镜*/
	//鼠标移入/移出 显示/隐藏
	$(".img-m").on('mouseenter', function() {
		$(".box").show();
		$(".img-l").show();
	}).on('mouseleave', function() {
		$(".box").hide();
		$(".img-l").hide();
	});

	$(".img-m").on("mousemove",function(e){
		console.log($(".box").outerWidth()/2)
		//小盒子移动，并设置其在文档中的位置
		var _left=e.pageX-$(".box").outerWidth()/2,
		    _top=e.pageY-$(".box").outerHeight()/2;
		$(".box").offset({left:_left,top:_top});
		var _left2=$(".box").position().left,
			_top2=$(".box").position().top;
		//判断是否超出边框
		if (_left2<0) {
			_left2=0
		}   
		if (_left2>=$(this).innerWidth()-$(".box").outerWidth()) {
			_left2=$(this).innerWidth()-$(".box").outerWidth()
		}
		if (_top2<0) {
			_top2=0
		}   
		if (_top2>=$(this).innerHeight()-$(".box").outerHeight()) {
			_top2=$(this).innerHeight()-$(".box").outerHeight()
		} 
		$(".box").css({left:_left2,top:_top2})
		//
		var c=$(".img-m").outerWidth()/$(".box").outerHeight()
		//大盒子图片的宽度
		$(".img-l img").css({left:-1*_left2*c,top:-1*_top2*c,width:c*$(".img-l").outerWidth()})
	})
	//切换小图片时，相应切换中图和大图
	var imgs=$(".img-s img"),
		imgm=$(".img-m img"),
		imgl=$(".img-l img");
		//为每个小图添加时间
	for (let i = 0; i < imgs.length; i++) {
		imgs.eq(i).on("click",function(){
			//中图变化
			for (var j = 0; j < imgm.length; j++) {
				imgm.eq(j).hide();
				imgs.eq(j).css({border:"2px solid #fff"})
			}
			imgm.eq(i).show()
			imgs.eq(i).css({border:"2px solid red"})
			//大图变化
			for (var j = 0; j < imgl.length; j++) {
				imgl.eq(j).hide();
			}
			imgl.eq(i).show()
		})
	}

/*吸顶效果*/
	var height=$(".intraduce").offset().top;
	$(window).on("scroll",function(){
		// console.log(height)
		// console.log($(".intraduce").offset().top)
		if ($(this).scrollTop()>height) {
			$(".intraduce-right ul").css({position:"fixed",top:0})
		}else{
			$(".intraduce-right ul").css({position:"relative"})
		}				
		//鼠标滑动楼梯效果
		$(".floor").each(function(index,element){
			var _top=$(".floor").eq(index).offset().top,
				wind_h=$(window).height();
			if (_top-wind_h/2<$(window).scrollTop()) {
				$(".intraduce-right li").eq(index).css({background:"red",color:"#fff"}).siblings("li").css({background:"#eee",color:"#000"})
			}
		})	
		//鼠标点击到相应楼层
		$(".intraduce-right ul").on("click","li",function(){
			var _index=$(this).index(),
				_top=$(".floor").eq(_index).offset().top;
			$("html,body").stop().animate({scrollTop:_top},200)	
			// console.log(_top)
		})
	})	

/*购物车飞翔效果*/
	$(function(){
		$(".button4").click(function(e){
		// var src2="";
		// $.cookie.json=true;
		// var p=$.cookie("product")
		// console.log(p[0].url)
		// src2+="../"+p[0].url;
		// console.log(src2)
			var $fly = $("<img src='../images/tem8.jpg' style='position:absolute;width:100px'>"),
				cartOffset = $(".cart").offset();

			$fly.fly({
				start : {
					top : e.pageY-$(window).scrollTop(),
					left : e.pageX
				},
				end : {
					top : cartOffset.top-$(window).scrollTop(),
					left : cartOffset.left,
					width : 0,
					height : 0
				}
			});
		})
	});	
	//固定头部
	// $(window).on("scroll",function(){
	// 		console.log($(this).scrollTop())
	// 		console.log($("#header").innerHeight())
	// 	if ($(this).scrollTop()>$("#header").innerHeight()) {
	// 		$("#header").css({position:"fixed",zIdexx:999})
	// 	}
	// })


/*点击立即购买，跳转至确认页*/
	$(".button3").click(function() {
		location="../html/confirm.html"
	});

/*点击+ - 增加/减少商品数量（0-99之间）*/
	$(".button1_1").click(function(){
		if (Number($(".text").val())>0) {
			$(".text").val(Number($(".text").val())-1)
		}
	})
	$(".button1_2").click(function(){
		if (Number($(".text").val())<99) {
			$(".text").val(Number($(".text").val())+1)
		}
	})

/*点击购物车,保存cookie*/
	$(".button4").click(function(){
		var _product_id=$(".product_id").text(),
			_product_name=$(".product_name").text(),
			_product_price=$(".product_price").text(),
			_product_count=Number($(".product_count").val()),
			_product_url=$(".url").attr("src");
			// console.log(_product_id)
		var _products={
			product_id:_product_id,
			product_name:_product_name,
			product_price:_product_price,
			product_count:_product_count,
			product_url:_product_url

		}
		$.cookie.json=true;
		var products=$.cookie("products")||[];
		var index=exit(_product_id,products);
		if (index===-1) {
			//存到本地cookie保存
			products.push(_products)
			//上传到数据库保存
			console.log(products)	
			$.ajax({
				url:"../php/cart.php",
				type:"get",
				dataType:"json",
				data:{
					action:"add",
					username:"test",
					pid:_product_id,
					pname:_product_name,
					price:_product_price,
					amount:_product_count
				},
				success:function(data){
					console.log(data)
				}
			})
		}else{
			//更新本地cookie
			products[index].product_count+=Number(_product_count)
			//更新数据库购物车信息
			$.ajax({
				url:"../php/cart.php",
				type:"get",
				dataType:"json",
				data:{
					action:"update",
					username:"test",
					pid:_product_id,
					amount:products[index].product_count
				},
				success:function(data){
					console.log(data)
				}
			})
		}
		$.cookie("products",products,{expires:7,path:"/"})

		//封装是否存在函数
		function exit(id,products){
			for (var i = 0; i < products.length; i++) {
				if (products[i].product_id===id) {
					return i;
				}
			}
				return -1;
		}
	})	

/*读取首页商品cookie（product），并填充至商品详情页面*/
	$.cookie.json=true;
	var product=$.cookie("product");
	console.log(product)
	$(".product_name").text(product[0].miaoshu)
	$(".product_price").text(product[0].price)
	$(".shihe").text(product[0].shihe)
	$(".url").attr({src:"../"+product[0].url})
	$(".product_id").text(product[0].pid)

})