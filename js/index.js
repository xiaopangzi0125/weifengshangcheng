$(function(){
/*鼠标移入全部商品时显示nav部分*/
	$(".allclass").on("mouseenter",function(){
		$(".nav_hid").slideDown()
	})
	// if ($(".nav_hid").css("display")) {
	$(".nav_hid").on("mouseleave",function(){
		$(this).slideUp()
	})
	// }
	// if ($(".nav_hid").css("display")) {
	// 	$(".allclass").on("mouseleave",function(){
	// 		$(".nav_hid").slideUp()
	// 	})
	// }
		
/*用户登陆成功后首页显示信息*/
	$.cookie.json=true;
	var login_c=$.cookie("login")
	if (login_c) {
		$(".user_info span").text(login_c.username)
		$(".user_info").show()
		$(".init").hide()
	}
	//点击退出
	$("#exid").on("click",function(){
		console.log("111")
		$.removeCookie("login",{path:"/"})
	})

/*banne图*/
	var currentIndex=0,
		nextIndex=1,
		len=$("#banner ul").children().length,
		sircle=[],
		isruning=false;
			
	$(".preve, .next").on("selectstart", function(){
				return false;
			});		

	//自动切换
	var timer=setInterval(move,4000)
	//动态添加小圆点
	for (var i=0;i<len;i++) {
		var _div=document.createElement("div")
		$(".sircle").append(_div)
		_div.index=i;
		sircle.push(_div)
		if(i==0){
			_div.className="current"
		}
	}
	//点击小圆点切换图片
	$(".sircle").delegate("div","mouseenter",function(){
		if(this.className!=="current"){
			if(this.index!=currentIndex){
				nextIndex=this.index;
				move();
			}
		}
	})
	//点击上下翻页
	$(".preve").on("click",function(){
		nextIndex=currentIndex-1;
		if(nextIndex<0){
			nextIndex=4
		}
		move();
		isruning=true;
	})
	
	$(".next").on("click",function(){
		move();
		isruning=true;
	})
	
	//移入banner，停止翻页
	$("#banner").on("mouseenter",function(){
		clearInterval(timer);
	})
	//移出banner，继续翻页
	$("#banner").on("mouseleave",function(){
		timer=setInterval(move,4000);
	})
	//封装move函数
	function move(){
			if(isruning)
				return;
			$("#banner ul").children().eq(currentIndex).stop()
						   .fadeOut(1000,function(){isruning=false}).end()
						   .eq(nextIndex).stop().fadeIn(1000,function(){isruning=false});
			sircle[currentIndex].className="";
			sircle[nextIndex].className="current";
			
			currentIndex=nextIndex;
			nextIndex++;
			if(nextIndex>=len){
				nextIndex=0
			}
	}

/*禁止content_top内文字可被选中*/
	$(".words").on("selectstart",function(){
		return false;
	})

/*模板加载商品信息*/
	//异步请求服务器资源，每次取三个
	function load(_page){
		$.ajax({
			url:"php/get_products.php",
			type:"get",
			data:{
				page:_page
			},
			dataType:"json",
			success:function(datas){
				// datas.push(data)
				console.log(datas)
				var data={
					count:datas
				}
				var html="";
				html+=template("products_template",data)
				$(".row").append(html);
			}
		})
	}
	//init三张
	var _page=1;
	load(_page)
	//滚动超出，加载更多图片(每次三张)
	$(window).on("scroll",function(){
	var _top=$(".template:last").offset().top;
		var _scralltop=$(this).scrollTop();
		if (_scralltop>_top-$(".template").innerHeight()/2) {
			load(++_page)
		}
		// if (_page>8) {
		// 	return;
		// }
	})

/*保存点击的商品信息到cookie*/
	$(".row").on("click", "#tem", function() {
		$.removeCookie("product",{path:"/"})	
		console.log(this)
		product2={
			miaoshu:$(this).children(".miaoshu").text(),
			shihe:$(this).children(".shihe").text(),
			price:$(this).children(".price").text(),
			url:$(this).children(".url").attr("src"),
			pid:$(this).children(".pid").text()

		}
//		alert("product")
		$.cookie.json=true;
		var product=$.cookie("product") || [];
			product.push(product2)
			console.log(product)
		$.cookie("product",product,{expires:7,path:"/"})
		location="html/detail-1.html"
	});	

/*点击搜索按钮*/
	$("#searchInit").click(function(){
		$(this).hide();
		$(".nav").hide();
		$(".search").show(600);
		$("#search").focus();
	});
	$("#search").on('blur',function(){
		$(".nav").show(300);
		$(".search").hide(600);
		$("#searchInit").show();
		$("#search").val("")
	});
/*点击搜索*/	
	function search() {
			var _search=$("#search").val();
			$(".append").show()
			$.ajax({
				url:"php/search.php",
				type:"get",
				dataType:"json",
				data:{
					search:_search
				},
				success:function(data){
					// console.log(data)
					//如果存在搜索内容
					var html="";	
					if (data) {
						$(data).each(function(index, el) {
							html+="<div>"+el.miaoshu+"</div>";
						});
					}
					$(".append").empty().append(html)
					console.log(html)
				}
			})
		}
	$("#search").on('keyup',search);
	$(".icon-search").on('click',search);
	//失去焦点隐藏搜索内容
	$("#search").on("blur",function(){
		$(".append").hide()
	})
	$("#search").on("focus",function(){
		$(".append").show()
	})	
})	