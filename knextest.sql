-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 01 Jul 2016 pada 08.41
-- Versi Server: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `knextest`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `music_category`
--

CREATE TABLE `music_category` (
  `category` char(20) NOT NULL,
  `tanggal_waktu` datetime NOT NULL,
  `user` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `music_list`
--

CREATE TABLE `music_list` (
  `music_category` char(20) NOT NULL,
  `music_title` char(50) NOT NULL,
  `music_singer` char(50) NOT NULL,
  `album_image_filename` char(100) NOT NULL,
  `album_image_originalname` char(255) NOT NULL,
  `tanggal_waktu` datetime NOT NULL,
  `user` char(20) NOT NULL,
  `album_image_path` text NOT NULL,
  `youtube_video_id` char(50) NOT NULL,
  `view` int(12) NOT NULL,
  `like` int(12) NOT NULL,
  `lyric` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `music_list_like`
--

CREATE TABLE `music_list_like` (
  `music_title` char(50) NOT NULL,
  `music_singer` char(50) NOT NULL,
  `tanggal_waktu` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `music_list_view`
--

CREATE TABLE `music_list_view` (
  `music_title` char(50) NOT NULL,
  `music_singer` char(50) NOT NULL,
  `tanggal_waktu` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `username` char(20) NOT NULL,
  `password` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`username`, `password`) VALUES
('admin', 'admin');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
