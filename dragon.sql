-- phpMyAdmin SQL Dump
-- version 2.11.2.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 05 月 20 日 08:51
-- 服务器版本: 5.0.45
-- PHP 版本: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- 数据库: `dragon`
--

-- --------------------------------------------------------

--
-- 表的结构 `cart`
--

CREATE TABLE `cart` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `username` varchar(225) collate utf8_unicode_ci NOT NULL,
  `pid` varchar(225) collate utf8_unicode_ci NOT NULL,
  `pname` varchar(225) collate utf8_unicode_ci NOT NULL,
  `price` varchar(225) collate utf8_unicode_ci NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='购物车数据' AUTO_INCREMENT=550 ;

--
-- 导出表中的数据 `cart`
--

INSERT INTO `cart` (`id`, `username`, `pid`, `pname`, `price`, `amount`) VALUES
(131, 'test', 'IQ00506', '台湾Bone充电数据线 	', '29', 7),
(544, 'test', 'IP03525', '韩国OBLIQ透明边框防护壳', '29', 7),
(545, 'test', 'IQ00464 ', '芬兰GOLLA Original15寸苹果电脑背包', '298', 7),
(546, 'test', 'IF00391', 'MCDODO/麦多多 0.25mm软边3D防蓝光钢化膜 抗疲劳防辐射 for iPhone 7-白色', '38', 7),
(547, 'test', 'LS00262', '美国MECO镜头', '98', 7),
(548, 'test', 'IQ00506', '台湾Bone充电数据线 	', '29', 7),
(549, 'test', 'LS00328', 'GEARMAX 耳机防丢挂绳', '88', 7);

-- --------------------------------------------------------

--
-- 表的结构 `productsmsg`
--

CREATE TABLE `productsmsg` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `url` varchar(255) collate utf8_unicode_ci NOT NULL,
  `miaoshu` varchar(255) collate utf8_unicode_ci NOT NULL,
  `shihe` varchar(255) collate utf8_unicode_ci NOT NULL,
  `price` varchar(255) collate utf8_unicode_ci NOT NULL,
  `pid` varchar(255) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='所有商品信息' AUTO_INCREMENT=26 ;

--
-- 导出表中的数据 `productsmsg`
--

INSERT INTO `productsmsg` (`id`, `url`, `miaoshu`, `shihe`, `price`, `pid`) VALUES
(1, 'images/tem1', 'MCDODO 软边钢化膜', '适配7p', '29', 'IF00388'),
(2, 'images/tem2', 'GEARMAX 耳机防丢挂绳', 'AirPods 量身定制', '88', 'LS00328'),
(3, 'images/tem3', '台湾Rhino Shield保护框', 'iPhone 7 Plus', '168', 'IP03555'),
(4, 'images/tem4', 'VH 乙 苹果MFi认证数据线 ', '苹果Lightning接口支持设备', '59', 'IQ00542 '),
(5, 'images/tem5', '美国MECO镜头', '平板电脑， 智能手机', '98', 'LS00262'),
(6, 'images/tem6', '蓝牙遥控自拍杆', '智能手机', '298', 'LS00336'),
(7, 'images/tem7', '韩国OBLIQ透明边框防护壳', '适配7p', '29', 'IP03525'),
(13, 'images/tem8', '台湾Bone充电数据线 	', '适配7p', '29', 'IQ00506'),
(14, 'images/tem9', '日本NUANS 回环式 Lightning数据线	', 'iOS设备', '30', 'IQ00464'),
(15, 'images/tem10', '芬兰GOLLA Original15寸苹果电脑背包', 'MB00426', '298', 'IQ00464 '),
(16, 'images/tem11', 'BECKBERG/贝克贝格镶钻保护壳', '适配7p', '55', 'IP03538'),
(17, 'images/tem12', 'GEARMAX/吉玛仕13寸行者内胆包', '适配7p', '98', 'MB00427'),
(18, 'images/tem13', '1MORE 入耳式活塞耳机风尚版 3.5mm线控带麦	', '适配7p', '290', 'IE00404 '),
(19, 'images/tem14', '台湾SOLiDE Venus 维纳斯边框透明壳', '适配7p', '55', 'IP03476'),
(20, 'images/tem15', '台湾Bone Elite 时尚精英保护套', '适配7p', '89', 'IP03396'),
(21, 'images/tem16', 'MCDODO/麦多多双口USB移动电源 闪电快充-白色', '适配7p', '60', 'IC00545'),
(22, 'images/tem17', 'MCDODO/麦多多 车载出风口支架 	', '智能手机', '77', 'IK00054'),
(23, 'images/tem18', 'VMEILIFE/唯美生活 车充蓝牙耳机2合1	', '所有支持蓝牙的设备', '80', 'IK00063 '),
(24, 'images/tem19', '美国Mr.Beams 节能LED感应灯小夜灯', '适配7p', '56', 'LS00026'),
(25, 'images/tem20', 'MCDODO/麦多多 Type-C 3.1充电数据线', '适配7s', '249', 'IQ00530');

-- --------------------------------------------------------

--
-- 表的结构 `register`
--

CREATE TABLE `register` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `username` varchar(255) collate utf8_unicode_ci NOT NULL,
  `password` varchar(255) collate utf8_unicode_ci NOT NULL,
  `email` varchar(255) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户名注册' AUTO_INCREMENT=22 ;

--
-- 导出表中的数据 `register`
--

INSERT INTO `register` (`id`, `username`, `password`, `email`) VALUES
(16, 'htf', '6523170', '10119279855@qq.com'),
(18, 'test', '6523170', '10119279855@qq.com'),
(19, 'test3', '6523170', '10119279855@qq.com'),
(20, 'text5', '66666666', '10119279855@qq.com');
