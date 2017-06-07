$(function(){
/*点击继续购物，返回首页*/
	$(".back2").click(function() {
		location="../index.html"
	});

/*点击+ - 增加/减少商品数量（0-99之间）*/
	$(".cart_left").on('click', '.button1_1', function() {//减少
		console.log("111")
		if (Number($(this).next().val())>0) {
			$(this).next().val(Number($(this).next().val())-1)
		}
		var price=Number($(this).parents(".amount").prev().text()),
			amount=Number($(this).next().val());
		$(this).parents(".amount").next().children("._xiaoji").text(price*amount)
	}).on('click', '.button1_2', function() {//增加
		console.log("222")
		if (Number($(this).prev().val())<99) {
				$(this).prev().val(Number($(this).prev().val())+1)
		}
		var price=Number($(this).parents(".amount").prev().text()),
			amount=Number($(this).prev().val());
		$(this).parents(".amount").next().children("._xiaoji").text(price*amount)
	});

	// $(".cart_left").on('click', '._xiaoji', function() {
	// 	console.log("333")
	// 	$("._xiaoji").val($(".product_count").val()*$(".danjia").val())
	// })

/*获取商品cookie*/
	$.cookie.json=true;
	var products=$.cookie("products")
	// console.log(products[1].product_price)
	var data={
		_products:products
	}
	var html=template("cart_tem",data)
	$(html).insertBefore($(".clearing"))

/*点击全选，结算信息*/
	$("#all").click(function(){
		// console.log($("#all").prop("checked"))	
		if($("#all").prop("checked")) {
			$(".every").prop("checked",true)
			console.log("全选")
		/*方法一：提前将小计金额从cookie信息中遍历累加好，点击全选时显示（有问题：当前购物车页面增加减少时，小计/数量不会改变）*/
			// //商品总数量
			// var count=0;
			// for (var i = 0; i < products.length; i++) {
			// 	count+=Number(products[i].product_count)
			// }
			// $(".count").text(count)
			// //商品总价
			// var total=0;
			// for (var i = 0; i < products.length; i++) {
			// 	total+=products[i].product_price*products[i].product_count
			// }
			// $(".total").text(total)
			// $(".total").text($(".xiaoji").text())
		/*方法二：通过页面显示内容遍历累加*/
			//商品总数量
			var count=0;
			for (var i = 0; i < $(".text").length; i++) {
				count+=Number($(".text").eq(i).val())
			}
			$(".count").text(count)	
			//商品总价
			var total=0;
			for (var j = 0; j < $("._xiaoji").length; j++) {
				total+=Number($("._xiaoji").eq(j).text())
			}
			$(".total").text(total)
			//点击现在结算，跳转至结算页
			$(".clearing_right p:last").click(function(){
				location="confirm.html"
			})
		}else{
			$(".every").prop("checked",false)
			$(".count").text(0);
			$(".total").text(0);
		}	
	})

/*点击单选，结算信息*/
	$(".cart_left").on("click",".every",function(){
		if($(this).prop("checked")){
			var _index=$(this).index(".every")
			console.log(_index)
			$(".count").text($(".product_count").eq(_index).val());
			$(".total").text($("._xiaoji").eq(_index).text())
		}else{
			$(".count").text(0);
			$(".total").text(0);
		}
	})

/*点击现在结算,更新cookie*/
	$(".clear").click(function(){
		var _product_count=Number($(".product_count").val());
			console.log(_product_count)
		$.cookie.json=true;
		var products=$.cookie("products");
		// var index=exit(products,products);
		console.log(products)
		//更新本地cookie
		products[0].product_count=_product_count
		$.cookie("products",products,{expires:7,path:"/"})

		console.log($.cookie("products"))
		//更新数据库购物车信息
		console.log("不存在")	
		$.ajax({
			url:"../php/cart.php",
			type:"get",
			dataType:"json",
			data:{
				action:"update",
				username:"test",
				pid:products[0].product_id,
				amount:$(".product_count").val()
			},
			success:function(data){
				console.log(data)
			}
		})
	})	
		/*点击删除按钮，删除商品信息，同时删除cookie及数据库*/
		//确认删除
		$(".cart_left").on("click","#delate",function(){
			if (confirm("确定删除选定内容吗？")) {
				//更新cookie
				console.log($(this))
				var _index=$(this).index("#delate");
				console.log(_index)
				$.cookie.json=true;
				var pro=$.cookie("products")
				$("pro").remove($("pro").eq(_index))	
				$.cookie("products",pro,{expires:7,path:""})
				// $.removeCookie("products",{path:"/"})
				
				//删除页面内容
				$(this).parents(".cart_product").empty();
				//相应删除数据库
				$.cookie.json=true;
				var products=$.cookie("products"),
					_pid=products[0].product_id;
					console.log(_pid)
				$.ajax({
					url:"../php/cart.php",
					type:"get",
					dataType:"json",
					data:{
						action:"delete",
						pid:_pid
					},
					success:function(data){
						console.log(data)
					}
				})
			}	
		})


})