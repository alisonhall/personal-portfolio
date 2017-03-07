-- phpMyAdmin SQL Dump
-- version 4.5.0.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 16, 2015 at 04:21 AM
-- Server version: 10.0.17-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `catalog`
--
CREATE DATABASE IF NOT EXISTS `catalog` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `catalog`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `cat_name` varchar(50) NOT NULL,
  `cat_desc` varchar(250) NOT NULL,
  `cat_img` varchar(50) NOT NULL,
  PRIMARY KEY (`cat_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`cat_name`, `cat_desc`, `cat_img`) VALUES
('Birthday', 'Birthday cards', 'birthday.png'),
('Christmas', 'Christmas Cards', 'christmas.png'),
('Easter', 'Easter cards', 'easter.png'),
('MothersDay', 'Mother''s Day cards', 'mothersDay.png');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_user` varchar(50) NOT NULL,
  `order_total` decimal(4,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_user`, `order_total`) VALUES
(3, 'a', '32.50'),
(4, 'aa', '0.00'),
(5, 'alison', '0.00'),
(6, 'q', '0.00'),
(7, 'zz', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE IF NOT EXISTS `order_details` (
  `orderD_id` int(11) NOT NULL AUTO_INCREMENT,
  `orderD_order_id` int(11) NOT NULL,
  `orderD_prod_id` int(11) NOT NULL,
  `orderD_quantity` int(11) NOT NULL,
  PRIMARY KEY (`orderD_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`orderD_id`, `orderD_order_id`, `orderD_prod_id`, `orderD_quantity`) VALUES
(19, 3, 0, 8),
(20, 3, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `prod_id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_name` varchar(50) NOT NULL,
  `prod_cat` varchar(50) NOT NULL,
  `prod_desc` varchar(250) NOT NULL,
  `prod_price` decimal(4,2) NOT NULL,
  `prod_stock` int(11) NOT NULL,
  `prod_image` varchar(50) NOT NULL,
  PRIMARY KEY (`prod_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`prod_id`, `prod_name`, `prod_cat`, `prod_desc`, `prod_price`, `prod_stock`, `prod_image`) VALUES
(0, 'Birthday waves', 'Birthday', 'This birthday card uses different layers of papers with a horizontal strip fastened over the top.', '3.50', 4, 'Birthday-Card1.jpg'),
(1, 'Birthday Stripes', 'Birthday', 'This birthday card is customizable by putting the name of the person. It has vertical strips of paper, a transparent blue section, and a ribbon.', '4.50', 3, 'Birthday-Card2.jpg'),
(2, 'Blue Flower', 'Birthday', 'This card has metallic brown paper as the background, with a fabric flower on top of the other layers.', '5.50', 1, 'Birthday-Card3.jpg'),
(3, 'Stripes and Leaves', 'Birthday', 'This card was made using a background of leaf impressions and strips of purple and gold paper crossing over the top.', '3.50', 8, 'Birthday-Card4.jpg'),
(4, 'Gold and Black Swirls', 'Christmas', 'For Christmas, this card has striped metallic and sparkly gold paper underneath, with black swirl cut-outs on top.', '4.00', 3, 'Christmas-Card1.jpg'),
(5, 'Purple with Snowflakes', 'Christmas', 'With purple stripes as the background, the silver metallic snowflakes are pasted diagonally on top.', '4.50', 9, 'Christmas-Card2.jpg'),
(6, 'Wire Chick', 'Easter', 'This easter card was made with layers of paper and a design of a chick made by moulding aluminum wire.', '6.00', 3, 'Easter-Card1.jpg'),
(7, 'Yellow Chick', 'Easter', 'This card doesn''t have a full front, but it does have a printed picture of a chick on top of cardstock and other papers.', '3.50', 5, 'Easter-Card2.jpg'),
(8, 'Rome and Leaves', 'MothersDay', 'This mother&#39;s day card includes paper which has a motif of the Coliseum on it, as well as real mini maple leaves.', '5.50', 2, 'MothersDay-Card1.jpg'),
(9, 'Butterflies and Tulips', 'MothersDay', 'The printed out design of the tulips and the associated borders are on top of paper where the butterflies are fuzzy.', '5.50', 3, 'MothersDay-Card2.jpg'),
(10, 'Tree', 'MothersDay', 'This card was made out of folded beautiful paper with a textured tree as a part of it.', '5.00', 1, 'MothersDay-Card3.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_fname` varchar(50) NOT NULL,
  `user_lname` varchar(50) NOT NULL,
  `user_username` varchar(50) NOT NULL,
  `user_password` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  UNIQUE KEY `user_username` (`user_username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_fname`, `user_lname`, `user_username`, `user_password`, `user_email`, `order_id`) VALUES
('Me', 'You', 'a', 'a', '1@1.com', 3),
('Alison', 'Hall', 'aa', 'aa', '1@example.com', 4),
('Alison', 'Hall', 'alison', 'aa', '1@example.com', 5),
('Never', 'Never', 'q', 'q', '2@example.com', 6),
('Squiggle', 'Puff', 'zz', 'zz', '1@example.com', 7);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
