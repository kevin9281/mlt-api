-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2018-12-19 03:27:28
-- 服务器版本： 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `manluotuo`
--

-- --------------------------------------------------------

--
-- 表的结构 `cart`
--

CREATE TABLE `cart` (
  `iid` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `is_checked` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `cart`
--

INSERT INTO `cart` (`iid`, `uid`, `pid`, `count`, `is_checked`) VALUES
(72, 74, 1, 2, 0),
(74, 1, 1, 1, 0),
(75, 1, 2, 1, 0),
(76, 74, 2, 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `pid` int(11) NOT NULL,
  `family_id` int(11) DEFAULT NULL,
  `title` varchar(128) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `oldprice` decimal(10,2) DEFAULT NULL,
  `brand` varchar(64) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `goodPic` varchar(256) DEFAULT NULL,
  `detailPic` mediumtext,
  `indexPic` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`pid`, `family_id`, `title`, `price`, `oldprice`, `brand`, `stock`, `type`, `goodPic`, `detailPic`, `indexPic`) VALUES
(1, 1, '漫骆驼官方出品 少司命手办-《秦时明月》十周年纪念版手办 myethos 正版', '628.00', '628.00', 'myethos', 20, '现货628', 'http://127.0.0.1:3000/img/good-detail/01-1-big.jpg http://127.0.0.1:3000/img/good-detail/01-2-big.jpg http://127.0.0.1:3000/img/good-detail/01-3-big.jpg', 'http://127.0.0.1:3000/img/good-detail/01-detail-0.jpg http://127.0.0.1:3000/img/good-detail/01-detail-1.jpg http://127.0.0.1:3000/img/good-detail/01-detail-2.jpg http://127.0.0.1:3000/img/good-detail/01-detail-3.jpg http://127.0.0.1:3000/img/good-detail/01-detail-4.jpg http://127.0.0.1:3000/img/good-detail/01-detail-5.jpg http://127.0.0.1:3000/img/good-detail/01-detail-6.jpg http://127.0.0.1:3000/img/good-detail/01-detail-7.jpg http://127.0.0.1:3000/img/good-detail/01-detail-8.jpg http://127.0.0.1:3000/img/good-detail/01-detail-9.jpg', 'http://127.0.0.1:3000/img/product/pro1.jpg'),
(2, 2, '城户丈哥玛兽MegaHouse手办-《数码宝贝》Megahouse G.E.M 数码宝贝大冒险', '179.00', '399.00', '数码宝贝', 10, '现货179', 'http://127.0.0.1:3000/img/good-detail/02-1-big.jpg http://127.0.0.1:3000/img/good-detail/02-2-big.jpg http://127.0.0.1:3000/img/good-detail/02-3-big.jpg', 'http://127.0.0.1:3000/img/good-detail/02-detail-1.jpg http://127.0.0.1:3000/img/good-detail/02-detail-2.jpg http://127.0.0.1:3000/img/good-detail/02-detail-3.jpg http://127.0.0.1:3000/img/good-detail/02-detail-4.jpg http://127.0.0.1:3000/img/good-detail/02-detail-5.jpg http://127.0.0.1:3000/img/good-detail/02-detail-6.jpg http://127.0.0.1:3000/img/good-detail/02-detail-6.jpg http://127.0.0.1:3000/img/good-detail/02-detail-6.jpg http://127.0.0.1:3000/img/good-detail/02-detail-7.jpg http://127.0.0.1:3000/img/good-detail/02-detail-8.jpg', 'http://127.0.0.1:3000/img/product/pro2.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `xz_user`
--

CREATE TABLE `xz_user` (
  `uid` int(11) NOT NULL,
  `uname` varchar(32) DEFAULT NULL,
  `upwd` varchar(32) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `avatar` varchar(128) DEFAULT NULL,
  `user_name` varchar(32) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `xz_user`
--

INSERT INTO `xz_user` (`uid`, `uname`, `upwd`, `email`, `phone`, `avatar`, `user_name`, `gender`) VALUES
(1, 'dingding', '123456', 'ding@qq.com', '13501234567', 'img/avatar/default.png', '丁伟', 1),
(2, 'dangdang', '123456', 'dang@qq.com', '13501234568', 'img/avatar/default.png', '林当', 1),
(3, 'doudou', '123456', 'dou@qq.com', '13501234569', 'img/avatar/default.png', '窦志强', 1),
(4, 'yaya', '123456', 'ya@qq.com', '13501234560', 'img/avatar/default.png', '秦小雅', 0),
(74, 'lyyolyy', '2655814', '', '', NULL, '', 0),
(75, 'lyyolyy1', '2655814', '', '', NULL, '', 0),
(76, 'lyyolyy2', '123456', '1158781344@qq.com', '2655814', NULL, '丁伟20', 2),
(77, 'lyyolyy5', '123456', '', '', NULL, '', 1),
(78, '问问', '123456', '', '', NULL, '', 1),
(79, 'lyyolyy3', '123456', '1158781344@qq.com', NULL, NULL, NULL, 0),
(80, 'lyyolyy4', '123456', 'ding@qq.com', NULL, NULL, NULL, 0),
(81, 'lyyolyy123', '123456', '1158781344@qq.com', NULL, NULL, NULL, 0),
(82, 'hususu', '123456', 'dang@qq.com', NULL, NULL, NULL, 0),
(83, 'lyyolyy22', '123456', '1158781344@qq.com', NULL, NULL, NULL, 0),
(84, 'lyyolyy33', '123456', 'ding@qq.com', NULL, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`iid`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `xz_user`
--
ALTER TABLE `xz_user`
  ADD PRIMARY KEY (`uid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `cart`
--
ALTER TABLE `cart`
  MODIFY `iid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- 使用表AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `xz_user`
--
ALTER TABLE `xz_user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
