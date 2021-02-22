-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2021 at 04:08 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `darkcon`
--

-- --------------------------------------------------------

--
-- Table structure for table `challs`
--

CREATE TABLE `challs` (
  `id` int(11) NOT NULL,
  `category` varchar(30) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(300) NOT NULL,
  `author` varchar(30) NOT NULL,
  `points` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `challs`
--

INSERT INTO `challs` (`id`, `category`, `title`, `description`, `author`, `points`) VALUES
(1, 'Rev', 'Read', 'Reading is the best way to solve a challenge', '1GN1tE', 500),
(2, 'Rev', '(Not) Easy', 'You know what to do... More info inside :wink:\r\n', '1GN1tE', 500),
(3, 'Rev', 'ezpz', 'Some easy android for ya :)', 'karma', 500),
(4, 'Misc', 'Pixelify', 'Pixels don\'t reveal secrets, or do they?', '1GN1tE, RDxR10', 500),
(5, 'Misc', 'Camouflage', 'General: We\'ve got the hideouts. From here on out, hear out!\r\nYou: Roger! ', 'RDxR10', 500),
(6, 'Crypto', 'Take It Easy', 'None', 'ArM4d4', 500),
(7, 'Crypto', 'MITM', 'Bob Wants the secret code from the alice . After getting the secret code from alice, bob sends his secret code to alice. Can you find the secret codes of alice and bob?', 'manish', 500),
(8, 'Crypto', 'Tony And James', 'Attachments', 'r3yc0n1c', 500),
(9, 'Crypto', 'Disguised Wordlets', 'Order amidst the chaos, that\'s what you need to seek.\r\n\r\nNOTE : separate the words in the flag by underscores (lowercase)\r\nFormat : darkCON{flag}', 'RDxR10', 500),
(10, 'Pwn', 'Easy-ROP', 'Welcome to the world of pwn!!! This should be a good entry level warmup challenge !!', 'manish', 500),
(11, 'Pwn', 'warmup', 'warm up yourself and get a shell!', 'Bitfriends', 500),
(12, 'Web', 'Meme_Stash', 'White Wolf cloned this website for some memes while browsing some memes he stumbled upon the flag but now he is not able to find it can you help him', 'Karma', 500),
(13, 'Web', 'WTF PHP', 'Your php function didnt work? maybe some info will help you xD Note: flag is in /etc', 'Karma', 500),
(14, 'Web', 'Easy PHP', 'Please note....', 'Rosee', 500),
(15, 'Osint', 'The Reporter', 'Miss Lola beck has something on her social media account. You are Agent P. find the secret.', 'trish56', 500),
(16, 'Osint', 'Travel to the home', 'I Travelled from MAS to CBE at 10 Jan 2020 (Any direction) and i took a beautiful picture while travelling\r\nFind the Exact location (co-ordinates upto 3 decimal point) and approximate time while i took the pick\r\nFlag format will be {lat,long,time} for time it is 1 hour duration like (01-02)', 'Kick', 500),
(17, 'Forensics', 'Scattered Pieces', 'Some suspicious stuff going on the network can you figure it out ?', 'White_Wolf', 500),
(18, 'Forensics', 'Do you know them?', '\"Answer These Quesions: 1. last folder modified 2. last keyword searched 3. last link entered Flag format: darkCON{last folder modified_last keyword searched_last link entered}\r\n\"', 'White_Wolf', 500),
(19, 'Rev', 'CyberDark_0x01: ShitComp', '\"Goldhand:    Hey I want to play the new game `CyberDark`, it\'s so cool. But I have a problem... I want you to hack the game installer.\r\n\r\nV:            Here to staisfy ur needs\r\n\r\nGoldhand:    Ok I am giving you the Installer after changing it with my own compressor `ShitComp`... Crack the Installe', '1GN1tE', 500),
(20, 'Rev', 'CyberDark_0x02: Installer', '\"Goldhand:    So you have proven you worth.\r\n\r\nV:            Told Ya\r\n\r\nGoldHand:     Now send me the keys... nc <host> <port>\"', '1GN1tE', 500),
(21, 'Rev', 'TOO_MUCH', 'How about reversing 200 functions at once?? Try yourself!!!', 'Manish', 500),
(22, 'Misc', 'Web + Crypto', 'Made this website where you can read files Note: Flag at /etc/flag.txt', 'karma', 500),
(23, 'Crypto', 'PokePark - Raising New Generat', 'nc Connection ', 'r3yc0n1c', 500),
(24, 'Crypto', 'Rookie\'s_Choice_4_you', 'Attachments', 'r3yc0n1c', 500),
(25, 'Pwn', 'NO-Output', '\"Ok !!! This challenge doesn\'t give any output. Now try to get the shell.\r\n\r\nThe libc has tcache enabled and you don\'t require libc for this challenge at all. This challenge can be done without having libc. You don\'t need to guess or bruteforce libc.\"', 'manish', 0),
(26, 'Pwn', 'FS-2', 'I patched all the vulnerabilities. Now you can\'t exploit my service.', 'manish', 500),
(27, 'Pwn', 'wrong location', 'I think I am at the wrong location. We need to get home, to root !', 'Bitfriends', 500),
(28, 'Web', 'Capture the Meme', 'Made this meme generator for ya :) hope you like some memes Note: Flag at /etc/flag.txt', 'Karma', 500),
(30, 'Osint', 'Find her Boyfriend', '\"You know Lola, right? She met her boyfriend few days ago and after that he just vanished. She tried to contact him by every means but failed. The last thing she remembers is her bf texting someone.\r\nSubmit the flag in flag format.\"', 'trish56', 500),
(31, 'Forensics', 'Mr.Wolf Darkest Secret', 'Can you find Mr.Wolf\'s Darkest Secret he was trying to access some other system and wants to hide something from everyone', 'White_Wolf', 500),
(32, 'Rev', 'Fire in the androidddddddd', 'To decrypt something we need encrypted stuff', 'Karma', 500),
(33, 'Crypto', 'Risk Security Analyst Alice Vs', '\"La Casa De Tuple (L.C.D.T) is a Company in Spain which provides their \r\nown End-to-end encryption services and Alice got a job there. It was \r\nher first day and her boss told her to manage the **secrets** and \r\nencrypt the user data with their new End-to-end encryption system. \r\nYou are Eve and you', 'r3yc0n1c', 500),
(34, 'Pwn', 'house of the rising sun', 'There is a house in new orleans, they call the rising sun... Beautiful song, but now get that shell! Note that some libc functions might not work ;)', 'Bitfriends', 500),
(35, 'Web', 'DarkCON Challs', '\"A place where you can see all the challs of darkCON CTF using api but not the flag or can you @_@ ?\r\nPS :- Try to get the flag of this chall xD\"', 'Karma', 500),
(36, 'Osint', 'XXX - The Return of Mr. X', '\"Mr. X is a wanted criminal and he has no one in the world except his true love, Lola.\r\nNo one knows the real identity of Mr. X. FBI got some tip that he is related to the \r\nmastermind behind the recent attack. The Case Details has been attached here:\r\n\r\nGood Luck!\r\n\r\nNote: The flag of Find her Boyf', 'rey & 1gn1te', 500);

-- --------------------------------------------------------

--
-- Table structure for table `flags`
--

CREATE TABLE `flags` (
  `chall_id` int(11) NOT NULL,
  `chall_title` varchar(30) NOT NULL,
  `chall_flag` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `flags`
--

INSERT INTO `flags` (`chall_id`, `chall_title`, `chall_flag`) VALUES
(1, 'Read', 'darkCON{fake_flag}'),
(2, '(Not) Easy', 'darkCON{fake_flag}'),
(3, 'ezpz', 'darkCON{fake_flag}'),
(4, 'Pixelify', 'darkCON{fake_flag}'),
(5, 'Camouflage', 'darkCON{fake_flag}'),
(6, 'Take It Easy', 'darkCON{fake_flag}'),
(7, 'MITM', 'darkCON{fake_flag}'),
(8, 'Tony And James', 'darkCON{fake_flag}'),
(9, 'Disguised Wordlets', 'darkCON{fake_flag}'),
(10, 'Easy-ROP', 'darkCON{fake_flag}'),
(11, 'warmup', 'darkCON{fake_flag}'),
(12, 'Meme_Stash', 'darkCON{fake_flag}'),
(13, 'WTF PHP', 'darkCON{fake_flag}'),
(14, 'Easy PHP', 'darkCON{fake_flag}'),
(15, 'The Reporter', 'darkCON{fake_flag}'),
(16, 'Travel to the home', 'darkCON{fake_flag}'),
(17, 'Scattered Pieces', 'darkCON{fake_flag}'),
(18, 'Do you know them?', 'darkCON{fake_flag}'),
(19, 'CyberDark_0x01: ShitComp', 'darkCON{fake_flag}'),
(20, 'CyberDark_0x02: Installer', 'darkCON{fake_flag}'),
(21, 'TOO_MUCH', 'darkCON{fake_flag}'),
(22, 'Web + Crypto', 'darkCON{fake_flag}'),
(23, 'PokePark - Raising New Generat', 'darkCON{fake_flag}'),
(24, 'Rookies_Choice_4_you', 'darkCON{fake_flag}'),
(25, 'NO-Output', 'darkCON{fake_flag}'),
(26, 'FS-2', 'darkCON{fake_flag}'),
(27, 'wrong location', 'darkCON{fake_flag}'),
(28, 'Capture the Meme', 'darkCON{fake_flag}'),
(29, 'VKL_SQL', 'darkCON{fake_flag}'),
(30, 'Find her Boyfriend', 'darkCON{fake_flag}'),
(31, 'Mr.Wolf Darkest Secret', 'darkCON{fake_flag}'),
(32, 'Fire in the androidddddddd', 'darkCON{fake_flag}'),
(33, 'Risk Security Analyst Alice Vs', 'darkCON{fake_flag}'),
(34, 'house of the rising sun', 'darkCON{fake_flag}'),
(35, 'DarkCON Challs', 'darkCON{w0ww_y0u_re411y_f0und_m3}'),
(36, 'XXX - The Return of Mr. X', 'darkCON{fake_flag}');

-- --------------------------------------------------------

--
-- Table structure for table `hints`
--

CREATE TABLE `hints` (
  `chall_id` int(11) NOT NULL,
  `chall_title` varchar(30) NOT NULL,
  `take_hint` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hints`
--

INSERT INTO `hints` (`chall_id`, `chall_title`, `take_hint`) VALUES
(1, 'Read', 'want_hint? @_@'),
(2, '(Not) Easy', 'want_hint? @_@'),
(3, 'ezpz', 'want_hint? @_@'),
(4, 'Pixelify', 'want_hint? @_@'),
(5, 'Camouflage', 'want_hint? @_@'),
(6, 'Take It Easy', 'want_hint? @_@'),
(7, 'MITM', 'want_hint? @_@'),
(8, 'Tony And James', 'want_hint? @_@'),
(9, 'Disguised Wordlets', 'want_hint? @_@'),
(10, 'Easy-ROP', 'want_hint? @_@'),
(11, 'warmup', 'want_hint? @_@'),
(12, 'Meme_Stash', 'want_hint? @_@'),
(13, 'WTF PHP', 'want_hint? @_@'),
(14, 'Easy PHP', 'want_hint? @_@'),
(15, 'The Reporter', 'want_hint? @_@'),
(16, 'Travel to the home', 'want_hint? @_@'),
(17, 'Scattered Pieces', 'want_hint? @_@'),
(18, 'Do you know them?', 'want_hint? @_@'),
(19, 'CyberDark_0x01: ShitComp', 'want_hint? @_@'),
(20, 'CyberDark_0x02: Installer', 'want_hint? @_@'),
(21, 'TOO_MUCH', 'want_hint? @_@'),
(22, 'Web + Crypto', 'want_hint? @_@'),
(23, 'PokePark - Raising New Generat', 'want_hint? @_@'),
(24, 'Rookies_Choice_4_you', 'want_hint? @_@'),
(25, 'NO-Output', 'want_hint? @_@'),
(26, 'FS-2', 'want_hint? @_@'),
(27, 'wrong location', 'want_hint? @_@'),
(28, 'Capture the Meme', 'want_hint? @_@'),
(29, 'VKL_SQL', 'want_hint? @_@'),
(30, 'Find her Boyfriend', 'want_hint? @_@'),
(31, 'Mr.Wolf Darkest Secret', 'want_hint? @_@'),
(32, 'Fire in the androidddddddd', 'want_hint? @_@'),
(33, 'Risk Security Analyst Alice Vs', 'want_hint? @_@'),
(34, 'house of the rising sun', 'want_hint? @_@'),
(35, 'DarkCON Challs', 'want_hint? @_@'),
(36, 'XXX - The Return of Mr. X', 'want_hint? @_@');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `username` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'guest', 'karma9874'),
(2, 'admin', 'is_this_visible_to_you?');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `challs`
--
ALTER TABLE `challs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flags`
--
ALTER TABLE `flags`
  ADD PRIMARY KEY (`chall_id`);

--
-- Indexes for table `hints`
--
ALTER TABLE `hints`
  ADD PRIMARY KEY (`chall_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challs`
--
ALTER TABLE `challs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
