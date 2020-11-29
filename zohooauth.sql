-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2020 at 04:14 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zohooauth`
--

-- --------------------------------------------------------

--
-- Table structure for table `allocatorconfig`
--

CREATE TABLE `allocatorconfig` (
  `id` int(10) NOT NULL,
  `allocatorField` varchar(255) NOT NULL,
  `displayWeb` tinyint(1) NOT NULL,
  `displayPdf` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(10) NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `eventDescription` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `eventName`, `eventDescription`) VALUES
(1, 'search', 'When a user conducts a search'),
(2, 'downloadpdf', 'When a user downloads an allocator PDF');

-- --------------------------------------------------------

--
-- Table structure for table `oauthtokens`
--

CREATE TABLE `oauthtokens` (
  `useridentifier` varchar(255) NOT NULL,
  `accesstoken` varchar(255) NOT NULL,
  `refreshtoken` varchar(255) NOT NULL,
  `expirytime` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `oauthtokens`
--

INSERT INTO `oauthtokens` (`useridentifier`, `accesstoken`, `refreshtoken`, `expirytime`) VALUES
('tim@geminisolution.co.za', '1000.3b6163db9aa78d1a6cfb5fd6ba47a6df.d1f0f95ec4d3aa99760ca43b78733610', '1000.505aada559e201ad6f5dce4dd51440de.04f2f525862545f072843460792c0da6', 1604569451232),
('tim@geminisolution.co.za', '1000.3b6163db9aa78d1a6cfb5fd6ba47a6df.d1f0f95ec4d3aa99760ca43b78733610', '1000.0e14f70465aa8f363053e73c63137e18.6820d0b0ef286ab5747f947ad860016a', 1604569451232),
('tim@geminisolution.co.za', '1000.3b6163db9aa78d1a6cfb5fd6ba47a6df.d1f0f95ec4d3aa99760ca43b78733610', '1000.b5f3dea6f709d67cf668924393d61c57.a38f75cb3a20daaa87df4a7a0440670a', 1604569451232),
('tim@geminisolution.co.za', '1000.3b6163db9aa78d1a6cfb5fd6ba47a6df.d1f0f95ec4d3aa99760ca43b78733610', '1000.9068c2121ccdf40f481ba9a4068a4beb.9f691f75c381dc60c454cd9a31b4f0dc', 1604569451232),
('tim@geminisolution.co.za', '1000.3b6163db9aa78d1a6cfb5fd6ba47a6df.d1f0f95ec4d3aa99760ca43b78733610', '1000.9d254d09cc998b43b8913d427d886e80.5685332fffe5f1007e4d4db3196018e4', 1604569451232);

-- --------------------------------------------------------

--
-- Table structure for table `pdfconfig`
--

CREATE TABLE `pdfconfig` (
  `id` int(10) NOT NULL,
  `allocatorName` tinyint(1) NOT NULL,
  `allocatorStreet` tinyint(1) NOT NULL,
  `allocatorCity` int(10) NOT NULL,
  `allocatorPostCode` int(10) NOT NULL,
  `allocatorProvince` int(10) NOT NULL,
  `allocatorCountry` tinyint(1) NOT NULL,
  `allocatorPhone` int(10) DEFAULT NULL,
  `allocatorWebsite` int(10) DEFAULT NULL,
  `allocatorAccountType` int(10) DEFAULT NULL,
  `allocatorSummary` int(10) DEFAULT NULL,
  `allocatorAssetClass` int(10) NOT NULL,
  `allocatorCSClassification` tinyint(1) NOT NULL,
  `allocatorCSRequirements` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pdfconfig`
--

INSERT INTO `pdfconfig` (`id`, `allocatorName`, `allocatorStreet`, `allocatorCity`, `allocatorPostCode`, `allocatorProvince`, `allocatorCountry`, `allocatorPhone`, `allocatorWebsite`, `allocatorAccountType`, `allocatorSummary`, `allocatorAssetClass`, `allocatorCSClassification`, `allocatorCSRequirements`) VALUES
(1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `userevents`
--

CREATE TABLE `userevents` (
  `id` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `eventId` int(10) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `emailActive` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accountId` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `emailActive`, `firstName`, `lastName`, `phone`, `password`, `accountId`, `role`) VALUES
(93, 'admin@armswiss.com', '1', '', '', '', '$2a$08$iYT/xA/MUrjjfdcvo6V.UO2tz0SF0M8f1SoA/N.p..JLu7f1yFBxK', '', 'admin'),
(101, 'fractalsanta@gmail.com', '', '', '', '', '', '1185106000019416001', ''),
(102, '', '', '', '', '', '', '1185106000019416001', ''),
(107, 'fractalsanta@gmail.com', '', '', '', '', '', '1185106000019416001', ''),
(108, '', '', '', '', '', '', '1185106000019416001', ''),
(109, 'khomotso@geminisolution.co.za', '', '', '', '', '$2a$10$uYffI1G5gunBntM8cqHwAuSH8YUaR0CEE8kfLjEih6WEegXFHY6yK', '1185106000019416001', ''),
(111, 'fractalsanta@gmail.com', '', '', '', '', '', '1185106000019416001', ''),
(112, '', '', '', '', '', '', '1185106000019416001', ''),
(117, 'louw@geminisolution.co.za', '', 'Louw', 'Visagie', '5555555', '$2a$08$xGMbfqzaHrDHWYwzwJ.8GOb.mrqZI/ed7KCeakgv5NAjy.u9WRdk6', '1185106000019416001', '');

-- --------------------------------------------------------

--
-- Table structure for table `webconfig`
--

CREATE TABLE `webconfig` (
  `id` int(10) NOT NULL,
  `allocatorName` tinyint(1) NOT NULL,
  `allocatorStreet` tinyint(1) NOT NULL,
  `allocatorCity` int(10) NOT NULL,
  `allocatorPostCode` int(10) NOT NULL,
  `allocatorProvince` int(10) NOT NULL,
  `allocatorCountry` tinyint(1) NOT NULL,
  `allocatorPhone` int(10) DEFAULT NULL,
  `allocatorWebsite` int(10) DEFAULT NULL,
  `allocatorAccountType` int(10) DEFAULT NULL,
  `allocatorSummary` int(10) DEFAULT NULL,
  `allocatorAssetClass` int(10) NOT NULL,
  `allocatorCSClassification` tinyint(1) NOT NULL,
  `allocatorCSRequirements` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `webconfig`
--

INSERT INTO `webconfig` (`id`, `allocatorName`, `allocatorStreet`, `allocatorCity`, `allocatorPostCode`, `allocatorProvince`, `allocatorCountry`, `allocatorPhone`, `allocatorWebsite`, `allocatorAccountType`, `allocatorSummary`, `allocatorAssetClass`, `allocatorCSClassification`, `allocatorCSRequirements`) VALUES
(1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allocatorconfig`
--
ALTER TABLE `allocatorconfig`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pdfconfig`
--
ALTER TABLE `pdfconfig`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userevents`
--
ALTER TABLE `userevents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `webconfig`
--
ALTER TABLE `webconfig`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allocatorconfig`
--
ALTER TABLE `allocatorconfig`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userevents`
--
ALTER TABLE `userevents`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
