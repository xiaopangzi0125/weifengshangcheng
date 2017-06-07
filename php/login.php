

<?php
	$_username=$_POST["username"];
	$_password=$_POST["password"];

	$con=mysql_connect("localhost:3306","root","");
	if (!$con) {
		die("error:".mysql_error());
	}
	mysql_select_db("dragon",$con);

	//设置编码格式
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");

	//查询用户名是否存在
	$sql = "SELECT username,password FROM register";
	$result = mysql_query($sql, $con);
	$arr = array();
	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		// echo "用户名：". $row['username'] . " , 密码：" .$row['password'] . " , 等级： ". $row['level'] . "<br>";
		$arr[] = $row['username'].$row['password'] ; // 将当前行数据保存到数组中
	}
	if (in_array($_username.$_password,$arr)) {
		echo '{"status":1,"message":"success"}';
	}else{
		echo '{"status":0,"message":"账号或密码有误","user":{}}';
	}


	// //如果用户名不存在插入数据
	// $sql="INSERT INTO users (username,password,email) VALUES($_username,$_password,$_email)";
	// $result=mysql_query($sql,$con);
	// if ($result) {
	// 	echo "添加成功";
	// }else{
	// 	echo "添加失败";
	// }


	// mysql_close($con)
?>