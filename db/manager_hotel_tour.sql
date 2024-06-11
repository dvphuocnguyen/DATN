-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2024 at 07:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `manager_hotel_tour`
--

-- --------------------------------------------------------

--
-- Table structure for table `areas`
--

CREATE TABLE `areas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `thumb` varchar(255) DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `description` text DEFAULT NULL,
  `district_name` varchar(60) NOT NULL,
  `province_code` varchar(30) NOT NULL,
  `province_name` varchar(60) NOT NULL,
  `ward_code` varchar(30) NOT NULL,
  `ward_name` varchar(60) NOT NULL,
  `location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`location`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `district_code` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `areas`
--

INSERT INTO `areas` (`id`, `name`, `slug`, `address`, `thumb`, `images`, `description`, `district_name`, `province_code`, `province_name`, `ward_code`, `ward_name`, `location`, `created_at`, `updated_at`, `district_code`) VALUES
(1, 'Vũng Tàu', 'vung-tau', '111', 'http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/jbwneb7xbtf39iyxab2k.jpg', '[\"booking-hotel/vwffznjmh5rjneiuo5j7\",\"booking-hotel/luzvt4ex6yppzklnrlrq\",\"booking-hotel/yrgmehv0qdij3dherx2p\",\"booking-hotel/hwd35vhpzuermyualvww\",\"booking-hotel/c2e6a5ttra5mjwajlqaj\",\"booking-hotel/z5ajhecfiszklsyivtrz\"]', 'Giới thiệu về Vũng Tàu\nBạn cảm thấy mệt mỏi sau một thời gian làm việc, học tập và muốn đi du lịch để thư giãn cùng với gia đình, bạn bè. Bạn tưởng tượng mình sẽ ngồi trên bờ cát đón ánh bình minh, đắm mình trong làn nước biển mát lạnh và ăn những món hải sản tươi sống hay đi dạo trong công viên biển về đêm, một cách thú vị. Nhưng bạn không có nhiều thời gian, không muốn tiêu nhiều tiền. Đừng nghĩ ngợi nhiều. Vũng Tàu sẽ là một sự lựa chọn tuyệt vời cho bạn.\n\nImage title\n\nBiển Vũng Tàu là một trong những lựa chọn số một của khách du lịch, bởi vị trí thuận lợi cách TP.HCM khoảng 125km, với bãi tắm trải dài, núi non hùng vĩ, các điểm du lich tuyệt đẹp, ẩm thực phong phú, đa dạng. Đặc biệt là hải sản tươi sống rất phù hợp với những kỳ nghỉ dưỡng cuối tuần cùng người thân hay picnic cùng bạn bè.\n\nNằm nhô hẳn ra khỏi đất liền như một dải đất, từ nơi đây, người ta có thể nhìn biển Đông cả khi trời mọc lẫn lúc hoàng hôn. Bên cạnh những giá trị cảnh quan thiên nhiên, Vũng Tàu còn là miền đất có truyền thống văn hóa lịch sử lâu đời.\n\nBà Rịa – Vũng Tàu thuộc vùng khí hậu nhiệt đới gió mùa, một năm chia hai mùa rõ rệt: \n\nMùa mưa bắt đầu từ tháng 5 đến tháng 10, thời gian này có gió mùa Tây Nam\n\nMùa khô bắt đầu từ tháng 11 đến tháng 4 năm sau, thời gian này có gió mùa Đông Bắc.\n\nNhiệt độ trung bình hàng năm là 27°C, tháng thấp nhất khoảng 24,8°C, tháng cao nhất khoảng 28,6°C.Image title\n\nNÊN DU LỊCH VŨNG TÀU MÙA NÀO?\n\nỞ Vũng Tàu quanh năm là mùa du lịch vì nhiệt độ không khi nào quá lạnh hay quá nóng. Hoạt động du lịch chính khi đến Vũng Tàu là tắm biển nên bạn cần theo dõi bản tin dự báo thời tiết để tránh đi du lịch vào thời điểm có mưa bão. Ngoài ra, vào ngày cuối tuần và các dịp Lễ tết, Vũng Tàu thu hút rất đông khách du lịch, giá cả các dịch vụ đều tăng cao. Để có kỳ nghỉ Vũng Tàu tuyệt vời nhất, tốt hơn bạn nên tránh những khoảng thời gian đó.', 'Thành phố Vũng Tàu', '77', 'Tỉnh Bà Rịa - Vũng Tàu', '26506', 'Phường 1', NULL, '2024-06-05 03:02:24', '2024-06-05 09:58:27', '747'),
(2, 'Cần Thơ', 'can-tho', '111', 'http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/qzbmekpmu05faojid6ws.jpg', '[\"booking-hotel/zp1r4nuotwvyp1e4ahqv\",\"booking-hotel/agcvpalaql8scefm1hvq\",\"booking-hotel/vbakoqnyobzwk7ygtqrf\",\"booking-hotel/xed5g2uzmz2vc37mfvre\",\"booking-hotel/kqefkkhg62wfqfctjnuk\",\"booking-hotel/rnwdjmiwkfsvlll6z8xs\"]', 'Cần Thơ Photo 4\nCần Thơ Photo 5\nCần Thơ Photo 6++3 ảnh\nGiới thiệu về Cần Thơ\nMệt mỏi với cảnh thành phố hoa lệ đầy khói bụi, bạn muốn chạy trốn khỏi những tòa nhà cao tầng? Hãy đến với Cần Thơ - một đô thị miền sông nước quanh năm được phù sa bồi đắp, với vườn cây trái bạt ngàn, đồng ruộng bao la. Hãy đến và trải nghiệm một nét riêng của vùng đất Tây Đô trù phú này.\nCần Thơ là một thành phố năng động trực thuộc trung ương cách Sài Gòn khoảng 170km, nằm bên con sông Hậu hiền hòa. Nhắc đến Cần Thơ người ta không thể không nhắc đến bến Ninh Kiều, chợ nổi Cái Răng. Ở Cần Thơ kênh rạch được xem như đường sá, bởi hệ thống kênh rạch chằng chịt, cuộc sống của người dân gắn liền với sông nước, tạo nên những nét văn hóa du lịch rất riêng biệt và độc đáo.\nNgoài ra, không thể bỏ qua bãi biển nhân tạo Cần Thơ để có thể thưởng thức một cách trọn vẹn vẻ đẹp lung linh về đêm của cây cầu dây văng có nhịp chính dài nhất tại khu vực Đông Nam Á. \nĐược mệnh danh là “Cần Thơ mùa nào cũng đẹp” nên đi du lịch vào Cần Thơ vào mùa nào cũng thuận tiện.\n\nMùa mưa thường từ tháng 5 đến tháng 11, mùa khô từ tháng 12 đến tháng 4.\nMùa hè cây trái trĩu quả.\nRằm tháng 4 và tháng Chạp âm lịch có lễ Thượng Điền và Hạ Điền tại đình Bình Thủy.\nĐặc biệt vào khoảng tháng 8 đến tháng 10 là mùa nước nổi rất thích hợp để tham quan những ngôi nhà lênh đênh trên sông, tham quan Chợ Nổi.', 'Quận Ninh Kiều', '92', 'Thành phố Cần Thơ', '31144', 'Phường Xuân Khánh', NULL, '2024-06-05 03:55:28', '2024-06-05 09:59:16', '916'),
(3, 'Hồ Chí Minh', 'ho-chi-minh', '111', 'booking-hotel/l3rb89bc8m7z6frk4krr', '[\"booking-hotel/swp1spya2m3p4fiz5bmi\",\"booking-hotel/dpz469hwda8g4kibdycs\",\"booking-hotel/lrhtxm8l7vwnjbodvppo\",\"booking-hotel/o4o7qiqavpam4sjuwcso\",\"booking-hotel/ofhz8komiwudnkxzarpq\",\"booking-hotel/jkerbqd2vx9vnqvnwegs\"]', 'Giới thiệu Hồ Chí Minh', 'Quận 10', '79', 'Thành phố Hồ Chí Minh', '27205', 'Phường 03', NULL, '2024-06-05 09:46:36', '2024-06-05 09:46:36', '771'),
(4, 'An Giang', 'an-giang', '111', 'booking-hotel/d6mol6lgtxr3tn5davn7', '[\"booking-hotel/nimqqkqsoglxknx2gv6r\",\"booking-hotel/ghkstoay4srhtdod5ztc\",\"booking-hotel/k2grkkd1ervuszepjdfl\",\"booking-hotel/m1wepiol7brewdgcokgx\",\"booking-hotel/ya9w9nrhvpabown7sqvl\",\"booking-hotel/ipxzejdwbeknsqzumanz\",\"booking-hotel/kw5gqf2xul3sm4btx0ni\"]', 'Giới thiệu về An Giang', 'Thành phố Châu Đốc', '89', 'Tỉnh An Giang', '30325', 'Phường Núi Sam', NULL, '2024-06-05 09:50:38', '2024-06-05 09:50:38', '884'),
(5, 'Hà Nội', 'ha-noi', '111', 'booking-hotel/tk5p08riuwnhflwrish9', '[\"booking-hotel/qpua02zmewecu98xoqkg\",\"booking-hotel/u9nryfiwjrwwvrfbygxt\",\"booking-hotel/l7qtbjfdz7xfjortsyih\",\"booking-hotel/ht9ppredf8zrrib1yd8m\",\"booking-hotel/h2fy3dlrfehvcgjo6ve3\",\"booking-hotel/zgi89ikue37yw0jaf3ts\",\"booking-hotel/ji0ngn9fvvuvbj0naqpd\",\"booking-hotel/jl3bdo0argb3jcsasvz3\"]', 'Giới thiệu về Hà Nội\nNếu bạn là người hoài cổ, yêu thích những gì xưa cũ và man mác buồn, Hà Nội với những con đường rợp bóng cây, với những con phố hàng phường thân thuộc, với những bác bán nước chè xanh thơm lừng khắp mọi ngõ ngách… là nơi dành riêng cho bạn.\nHà Nội không ồn áo, náo nhiệt như Sài Gòn hoa lệ, không quá cổ kính như xứ Huế mộng mơ nhưng lại mang một phong vị rất khác, nhẹ nhàng, sâu lắng. Có dịp ghé thăm Thủ đô, bạn đừng quên dành nhiều thời gian khám phá văn hóa, kinh tế tại vùng đất trung tâm của cả nước này. Khu Phố Cổ 36 phố phường, Hoàng thành Thăng Long, Lăng Bác, Văn Miếu - Quốc Tử Giám… là những địa điểm biểu trưng cho Hà Nội ngàn năm văn hiến và cũng là điểm du lịch đặc sắc bạn chớ nên bỏ lỡ.\nNgười Hà Nội rất tự hào về Thủ đô của mình, nếu bạn đã một lần đến đây, sẽ hiểu lý do vì sao họ yêu vùng đất này đến thế. Bởi câu chữ cũng không thể lột tả hết được vẻ đẹp của Hà Nội, nhất là vẻ đẹp đã từng xuất hiện trong những ca khúc trữ tình như “Hà Nội mùa lá bay”, “Hà Nội mùi hoa sữa”, “Nồng nàn Hà Nội”…\nĐể tận hưởng vẻ đẹp lãng mạn của Hà Nội, bạn nên đến vào mùa thu vào khoảng tháng 8 đến tháng 11. Mùa thu Hà Nội vô cùng đẹp, đã được vô số thi sĩ lấy làm cảm hứng sáng tác nên những vần thơ bất hủ với mùi hương hoa sữa ngạt ngào, với những con đường ngập lá vàng rơi và những cơn gió heo may se se lạnh… \nNgoài ra, bạn cũng có thể đến vào mùa đông và mùa xuân. Mùa đông bạn sẽ được tận hưởng cảm giác lạnh rét buốt đến lê lòng. Mùa xuân thì khí hậu dịu mát hơn với sắc xanh tràn ngập phố phường. Chớ nên đến Hà Nội vào mùa hè để không gặp phải cái nóng oi nồng, bức bối.\n\n====\n\nNguồn ảnh: TripHunter & Internet', 'Quận Đống Đa', '01', 'Thành phố Hà Nội', '00232', 'Phường Phương Mai', NULL, '2024-06-05 10:22:10', '2024-06-05 10:22:10', '006');

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `bill_id` varchar(32) NOT NULL,
  `customer_fullname` varchar(80) DEFAULT NULL,
  `customer_email` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `booking_for` enum('ME','CUSTOMER','','') NOT NULL DEFAULT 'ME',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `total_night` int(11) NOT NULL,
  `status` enum('UNPAID','PAID','OTHER','STARTED_USE','ENDED_USE','CANCEL') DEFAULT 'UNPAID',
  `note` text DEFAULT NULL,
  `payment` enum('OFFLINE','ONLINE') DEFAULT 'OFFLINE',
  `voucher` varchar(50) DEFAULT NULL,
  `total_price` float NOT NULL,
  `time_destination` varchar(40) DEFAULT '13:00 – 14:00',
  `user_id` varchar(32) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`bill_id`, `customer_fullname`, `customer_email`, `email`, `booking_for`, `start_date`, `end_date`, `total_night`, `status`, `note`, `payment`, `voucher`, `total_price`, `time_destination`, `user_id`, `created_at`) VALUES
('2de19a04868c', NULL, NULL, 'ginga550504@gmail.com', 'ME', '2024-06-08', '2024-06-11', 3, 'CANCEL', NULL, 'ONLINE', NULL, 4444440, '13:00 – 14:00', 'fc98bbeda29b42df9a5b54bbaef0029c', '2024-06-07 16:55:11'),
('31247282b7144ebbaade42957e0cca29', NULL, NULL, 'ginga550504@gmail.com', 'ME', '2024-06-06', '2024-06-06', 1, 'PAID', NULL, 'ONLINE', NULL, 500000, '13:00 – 14:00', 'fc98bbeda29b42df9a5b54bbaef0029c', '2024-06-06 03:04:00'),
('548db67ed79f4100b2aac0069a2e88dd', NULL, NULL, 'ginga550504@gmail.com', 'ME', '2024-06-04', '2024-06-04', 1, 'CANCEL', NULL, 'OFFLINE', NULL, 360000, '13:00 – 14:00', '5f2980484ec043768ccf9470e7d1c70e', '2024-06-04 08:33:18'),
('65e3439e9f6140b4917369e3a6040a18', NULL, NULL, 'test@gmail.com', 'ME', '2023-06-15', '2023-06-15', 1, 'ENDED_USE', NULL, 'OFFLINE', NULL, 360000, '13:00 – 14:00', '5b6072ce53e645b4a286d40b53132f94', '2023-06-15 04:32:48'),
('7828d6047ff3', NULL, NULL, 'ginga550504@gmail.com', 'ME', '2024-06-08', '2024-06-11', 3, 'CANCEL', NULL, 'ONLINE', NULL, 4444440, '13:00 – 14:00', 'fc98bbeda29b42df9a5b54bbaef0029c', '2024-06-06 18:21:10'),
('801fb0d2e02c', NULL, NULL, 'ginga550504@gmail.com', 'ME', '2024-06-09', '2024-06-12', 3, 'CANCEL', NULL, 'ONLINE', NULL, 4444440, '13:00 – 14:00', 'fc98bbeda29b42df9a5b54bbaef0029c', '2024-06-07 17:09:17'),
('addda9b906cc', NULL, NULL, 'ginga550504@gmail.com', 'ME', '2024-06-08', '2024-06-11', 3, 'PAID', NULL, 'ONLINE', NULL, 4444440, '13:00 – 14:00', 'fc98bbeda29b42df9a5b54bbaef0029c', '2024-06-07 15:50:21'),
('bbfc28e8a3374232844618448e76b4c1', NULL, NULL, 'test@gmail.com', 'ME', '2023-06-15', '2023-06-15', 1, 'CANCEL', NULL, 'ONLINE', NULL, 360000, '08:00 – 09:00', '5b6072ce53e645b4a286d40b53132f94', '2023-06-15 04:34:12'),
('cd46ea723ab9', NULL, NULL, 'ginga550504@gmail.com', 'ME', '2024-06-08', '2024-06-09', 1, 'ENDED_USE', NULL, 'ONLINE', NULL, 5444440, '13:00 – 14:00', 'fc98bbeda29b42df9a5b54bbaef0029c', '2024-06-06 17:04:41'),
('cfb929184a934c98bd77d9dfbd434ede', NULL, NULL, 'ginga550505@gmail.com', 'ME', '2024-06-07', '2024-06-07', 1, 'PAID', NULL, 'ONLINE', NULL, 1122220, '13:00 – 14:00', '4282c3fa6bf941f588df1068c7de39d1', '2024-06-07 14:30:34'),
('d44a3437f39a', NULL, NULL, 'ginga550504@gmail.com', 'ME', '2024-06-08', '2024-06-11', 3, 'PAID', NULL, 'ONLINE', NULL, 8888890, '13:00 – 14:00', '4282c3fa6bf941f588df1068c7de39d1', '2024-06-07 14:35:01'),
('fa1595b717de', NULL, NULL, 'ginga550504@gmail.com', 'ME', '2024-06-08', '2024-06-11', 3, 'CANCEL', NULL, 'ONLINE', NULL, 4444440, '13:00 – 14:00', 'fc98bbeda29b42df9a5b54bbaef0029c', '2024-06-07 16:47:36'),
('fe61bb78441d', NULL, NULL, 'ginga550504@gmail.com', 'ME', '2024-06-08', '2024-06-11', 3, 'ENDED_USE', NULL, 'ONLINE', NULL, 4444440, '13:00 – 14:00', 'fc98bbeda29b42df9a5b54bbaef0029c', '2024-06-06 18:04:42');

-- --------------------------------------------------------

--
-- Table structure for table `bill_details`
--

CREATE TABLE `bill_details` (
  `bill_id` varchar(32) NOT NULL,
  `floor_id` varchar(32) NOT NULL,
  `room_id` varchar(32) NOT NULL,
  `price` int(11) DEFAULT NULL CHECK (`price` > 10),
  `room_quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bill_details`
--

INSERT INTO `bill_details` (`bill_id`, `floor_id`, `room_id`, `price`, `room_quantity`, `created_at`, `updated_at`) VALUES
('2de19a04868c', '91fe579a41c7497f8fb5381660394715', '9633adb50eab4ba8931862fe2727fc95', 1111111, 1, '2024-06-07 16:55:11', '2024-06-07 16:55:11'),
('31247282b7144ebbaade42957e0cca29', 'a8a0e4c48ee54c89bd83d94c7cd808df', '183c3cb894bc423faf77841bae018f6e', 500000, 1, '2024-06-06 03:04:00', '2024-06-06 03:04:00'),
('548db67ed79f4100b2aac0069a2e88dd', 'dde8c9d5fb3a416db5c3a976bfeb2b13', '553510d5925c43bb8ad1e56490334c71', 360000, 1, '2024-06-04 08:33:18', '2024-06-04 08:33:18'),
('65e3439e9f6140b4917369e3a6040a18', 'dde8c9d5fb3a416db5c3a976bfeb2b13', '553510d5925c43bb8ad1e56490334c71', 360000, 1, '2023-06-15 04:32:48', '2023-06-15 04:32:48'),
('7828d6047ff3', '91fe579a41c7497f8fb5381660394715', '9633adb50eab4ba8931862fe2727fc95', 1111111, 1, '2024-06-06 18:21:10', '2024-06-06 18:21:10'),
('801fb0d2e02c', '91fe579a41c7497f8fb5381660394715', '9633adb50eab4ba8931862fe2727fc95', 1111111, 1, '2024-06-07 17:09:17', '2024-06-07 17:09:17'),
('addda9b906cc', '91fe579a41c7497f8fb5381660394715', '9633adb50eab4ba8931862fe2727fc95', 1111111, 1, '2024-06-07 15:50:21', '2024-06-07 15:50:21'),
('bbfc28e8a3374232844618448e76b4c1', 'dde8c9d5fb3a416db5c3a976bfeb2b13', '553510d5925c43bb8ad1e56490334c71', 360000, 1, '2023-06-15 04:34:12', '2023-06-15 04:34:12'),
('cd46ea723ab9', '59244fff30a448e7a767feda5a0b28b1', '7ed23bfdf90546c092b2b665cecbb038', 2222222, 1, '2024-06-06 17:04:41', '2024-06-06 17:04:41'),
('cfb929184a934c98bd77d9dfbd434ede', '91fe579a41c7497f8fb5381660394715', '9633adb50eab4ba8931862fe2727fc95', 1111111, 1, '2024-06-07 14:30:34', '2024-06-07 14:30:34'),
('d44a3437f39a', '59244fff30a448e7a767feda5a0b28b1', '7ed23bfdf90546c092b2b665cecbb038', 2222222, 1, '2024-06-07 14:35:01', '2024-06-07 14:35:01'),
('fa1595b717de', '91fe579a41c7497f8fb5381660394715', '9633adb50eab4ba8931862fe2727fc95', 1111111, 1, '2024-06-07 16:47:36', '2024-06-07 16:47:36'),
('fe61bb78441d', '91fe579a41c7497f8fb5381660394715', '9633adb50eab4ba8931862fe2727fc95', 1111111, 1, '2024-06-06 18:04:42', '2024-06-06 18:04:42');

-- --------------------------------------------------------

--
-- Table structure for table `bookings_trip`
--

CREATE TABLE `bookings_trip` (
  `id` varchar(12) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  `trip_id` varchar(12) NOT NULL,
  `phone` varchar(32) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(32) NOT NULL,
  `address` varchar(255) NOT NULL,
  `location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `fee` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`fee`)),
  `status` enum('pending','confirmed','canceled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings_trip`
--

INSERT INTO `bookings_trip` (`id`, `user_id`, `trip_id`, `phone`, `fullName`, `email`, `address`, `location`, `fee`, `status`, `created_at`, `updated_at`) VALUES
('2de19a04868c', 'fc98bbeda29b42df9a5b54bbaef0029c', '8c68b3b4545c', '0218212123', 'Admin Nguyễn', 'ginga550504@gmail.com', 'Hà Nội', NULL, '{\"total_price\":5944444,\"total_day\":4,\"start_date\":\"2024-06-08T16:55:03.300Z\",\"end_date\":\"2024-06-11T16:55:03.300Z\",\"trip_fee\":1500000,\"hotel_fee\":4444444}', 'canceled', '2024-06-07 16:55:11', '2024-06-07 17:09:04'),
('7828d6047ff3', 'fc98bbeda29b42df9a5b54bbaef0029c', '8c68b3b4545c', '0218212123', 'Nguyễn Văn A', 'ginga550504@gmail.com', '113, Phạm Ngũ Lão', NULL, '{\"total_price\":5944444,\"total_day\":4,\"start_date\":\"2024-06-07T18:21:02.173Z\",\"end_date\":\"2024-06-10T18:21:02.173Z\",\"trip_fee\":1500000,\"hotel_fee\":4444444}', 'canceled', '2024-06-06 18:21:10', '2024-06-07 14:04:12'),
('801fb0d2e02c', 'fc98bbeda29b42df9a5b54bbaef0029c', '8c68b3b4545c', '0218212123', 'Admin Nguyễn', 'ginga550504@gmail.com', 'Hà Nội', NULL, '{\"total_price\":5944444,\"total_day\":4,\"start_date\":\"2024-06-08T17:09:07.840Z\",\"end_date\":\"2024-06-11T17:09:07.840Z\",\"trip_fee\":1500000,\"hotel_fee\":4444444}', 'canceled', '2024-06-07 17:09:17', '2024-06-09 15:18:17'),
('addda9b906cc', 'fc98bbeda29b42df9a5b54bbaef0029c', '8c68b3b4545c', '0218212123', 'Admin Nguyễn', 'ginga550504@gmail.com', 'Hà Nội', NULL, '{\"total_price\":5944444,\"total_day\":4,\"start_date\":\"2024-06-08T15:49:31.443Z\",\"end_date\":\"2024-06-11T15:49:31.443Z\",\"trip_fee\":1500000,\"hotel_fee\":4444444}', 'confirmed', '2024-06-07 15:50:21', '2024-06-07 16:47:16'),
('cd46ea723ab9', 'fc98bbeda29b42df9a5b54bbaef0029c', 'fcd7b6beb0e9', '0218212123', 'Nguyễn Văn A', 'ginga550504@gmail.com', '113, Phạm Ngũ Lão', NULL, '{\"total_price\":5444444,\"total_day\":2,\"start_date\":\"2024-06-07T17:02:19.602Z\",\"end_date\":\"2024-06-08T17:02:19.602Z\",\"trip_fee\":1000000,\"hotel_fee\":4444444}', 'confirmed', '2024-06-06 17:04:41', '2024-06-07 14:04:15'),
('d44a3437f39a', '4282c3fa6bf941f588df1068c7de39d1', '9ba2e7ccb0a7', '0121212312', 'Văn Đồng A Nguyễn', 'ginga550504@gmail.com', '113, Phạm Ngũ Lão', NULL, '{\"total_price\":9888888,\"total_day\":4,\"start_date\":\"2024-06-08T14:34:37.050Z\",\"end_date\":\"2024-06-11T14:34:37.050Z\",\"trip_fee\":1000000,\"hotel_fee\":8888888}', 'confirmed', '2024-06-07 14:35:01', '2024-06-07 14:39:27'),
('fa1595b717de', 'fc98bbeda29b42df9a5b54bbaef0029c', '8c68b3b4545c', '0218212123', 'Admin Nguyễn', 'ginga550504@gmail.com', '113, Phạm Ngũ Lão', NULL, '{\"total_price\":5944444,\"total_day\":4,\"start_date\":\"2024-06-08T16:47:28.701Z\",\"end_date\":\"2024-06-11T16:47:28.701Z\",\"trip_fee\":1500000,\"hotel_fee\":4444444}', 'canceled', '2024-06-07 16:47:36', '2024-06-07 16:54:59'),
('fe61bb78441d', 'fc98bbeda29b42df9a5b54bbaef0029c', '8c68b3b4545c', '0218212123', 'Nguyễn Văn A', 'ginga550504@gmail.com', 'Mĩ Tho', NULL, '{\"total_price\":5944444,\"total_day\":4,\"start_date\":\"2024-06-07T18:04:33.244Z\",\"end_date\":\"2024-06-10T18:04:33.244Z\",\"trip_fee\":1500000,\"hotel_fee\":4444444}', 'confirmed', '2024-06-06 18:04:42', '2024-06-07 14:04:17');

-- --------------------------------------------------------

--
-- Table structure for table `device_types`
--

CREATE TABLE `device_types` (
  `dt_id` varchar(32) NOT NULL,
  `dt_name` varchar(50) NOT NULL,
  `dt_desc` text NOT NULL,
  `role` enum('ADMIN','HOTEL','USER') DEFAULT 'ADMIN',
  `user_id` varchar(32) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `device_types`
--

INSERT INTO `device_types` (`dt_id`, `dt_name`, `dt_desc`, `role`, `user_id`, `created_at`, `updated_at`) VALUES
('395086e175f749a096025de30cc9648c', 'Ghế một', 'Dùng để ngồi một người', 'ADMIN', 'fc98bbeda29b42df9a5b54bbaef0029c', '2023-03-03 13:46:26', '2023-03-03 13:46:26'),
('63d7e62f10644683b9f2f8051caec4db', 'Bàn một 3', 'dùng để ăn uống nha dùng để ăn uống nha dùng để ăn uống nha dùng để ăn uống nha', 'ADMIN', 'fc98bbeda29b42df9a5b54bbaef0029c', '2023-03-02 10:27:32', '2023-03-02 10:33:38');

-- --------------------------------------------------------

--
-- Table structure for table `floors`
--

CREATE TABLE `floors` (
  `floor_id` varchar(32) NOT NULL,
  `floor_name` varchar(255) NOT NULL,
  `floor_type` varchar(255) NOT NULL,
  `hotel_id` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `floors`
--

INSERT INTO `floors` (`floor_id`, `floor_name`, `floor_type`, `hotel_id`) VALUES
('1b9cbfb58ce44ceb83ed4cceb3eec8a7', 'Tầng 3', 'Bình thường', 'b86f9aa063ab4e57833333c903b0248a'),
('40dbbb0ecf46435fa5f754a3e7fd9db7', 'Tầng 4', 'Thượng lưu', 'b86f9aa063ab4e57833333c903b0248a'),
('59244fff30a448e7a767feda5a0b28b1', 'Tầng 1', 'T1', 'd91abdcbfa7944e684f3efba8e0924ca'),
('8dfe3ea0000346eb9385fe756c9169ed', 'Tầng  11', 'TP1', '5ae3c6fce66b419cb9120e5b45fe5e24'),
('91fe579a41c7497f8fb5381660394715', 'Tầng 1', 'T1', '37b32facfcfd4dd09e9fef1edcc60d5e'),
('9cdc79300450410aab19259834d5fdcb', 'Tầng 2', 'Tầng bình thường', '79981cf429254e06bb311dee7a92e7e6'),
('a8a0e4c48ee54c89bd83d94c7cd808df', 'Tầng 1', 'T1', '0d98fb11fddb4d4ca02ac3b26a38c12a'),
('b27af104ba5b465685d4554e989ea12e', 'Tầng 5', 'Tầng VIP', 'b86f9aa063ab4e57833333c903b0248a'),
('b94d280973d047d9a993b5838e0b2e56', 'Tầng 1', 'Tầng bình thường', 'b86f9aa063ab4e57833333c903b0248a'),
('c3c8c059018c4ba8ab1847492d8e5612', 'Tầng 1', 'TKS1', 'c865704402d041449e8da24f65954d78'),
('daf175702daa44cea54c8a1e552f031b', 'Tầng 2', 'Tầng bình thường', 'b86f9aa063ab4e57833333c903b0248a'),
('dde8c9d5fb3a416db5c3a976bfeb2b13', 'Tầng 1', 'Bình thường', '79981cf429254e06bb311dee7a92e7e6'),
('ecf440e257f648858a943ca2162b2be1', 'Tầng 1', 'T1', '02b92a38104842ea9ea9fe9646bf6f94');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `hotel_id` varchar(32) NOT NULL,
  `owner_id` varchar(32) DEFAULT NULL,
  `tax` int(11) DEFAULT 0 COMMENT '%',
  `hotel_name` varchar(50) NOT NULL,
  `hotel_desc` text NOT NULL,
  `hotel_address` varchar(255) NOT NULL,
  `hotel_title` text DEFAULT NULL,
  `hotel_image` text DEFAULT NULL,
  `file_name_img` varchar(100) NOT NULL,
  `district_code` varchar(30) NOT NULL,
  `district_name` varchar(60) NOT NULL,
  `provice_code` varchar(30) NOT NULL,
  `provice_name` varchar(60) NOT NULL,
  `ward_code` varchar(30) NOT NULL,
  `ward_name` varchar(60) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `hotel_rating` float DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`hotel_id`, `owner_id`, `tax`, `hotel_name`, `hotel_desc`, `hotel_address`, `hotel_title`, `hotel_image`, `file_name_img`, `district_code`, `district_name`, `provice_code`, `provice_name`, `ward_code`, `ward_name`, `slug`, `hotel_rating`, `created_at`, `updated_at`) VALUES
('02b92a38104842ea9ea9fe9646bf6f94', NULL, 1, 'Khách sạn Vĩnh Phúc', 'Giới thiệu về khách sạn Vĩnh Phúc', '21/A', NULL, 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677917303/booking-hotel/kn0yxu7lmay5ftrxfybl.jpg', 'booking-hotel/kn0yxu7lmay5ftrxfybl', '001', 'Quận Ba Đình', '01', 'Thành phố Hà Nội', '00010', 'Phường Nguyễn Trung Trực', 'khach-san-vinh-phuc', 0, '2023-03-02 07:08:22', '2023-03-02 07:08:22'),
('0d98fb11fddb4d4ca02ac3b26a38c12a', NULL, 0, 'Khách sạn HCM', 'Giới thiệu về khách sạn HCM', '21/A', NULL, 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677918052/booking-hotel/axm7o3lsbg0nqpowg2z9.jpg', 'booking-hotel/axm7o3lsbg0nqpowg2z9', '774', 'Quận 5', '79', 'Thành phố Hồ Chí Minh', '27328', 'Phường 11', 'khach-san-hcm', 0, '2023-03-04 08:20:51', '2023-03-04 08:20:51'),
('1e074dc83a1e4a239dfddc86fa6c1a03', NULL, 2, 'Khách  sạn Hà ', 'Situated in Hanoi and with Ha Noi Railway station reachable within 600 metres, Cua Nam Hotel Ho Guom features concierge services, allergy-free rooms, a shared lounge, free WiFi and a terrace. The property is close to several well-known attractions, 1.3 km from Thang Long Water Puppet Theater, 1.3 km from Trang Tien Plaza and 700 metres from Vietnam Fine Arts Museum. Private parking is available on site.\r\nAll rooms are fitted with air conditioning, a flat-screen TV with satellite channels, a fridge, a kettle, a bidet, free toiletries and a desk. Featuring a private bathroom with a shower and a hairdryer, some units at the hotel also feature a city view. At Cua Nam Hotel Ho Guom the rooms are fitted with bed linen and towels.\r\n\r\nNon-stop advice is available at the reception, where staff speak English and Vietnamese.\r\n\r\nPopular points of interest near the accommodation include Hanoi Temple of Literature, Imperial Citadel and St. Joseph Cathedral. The nearest airport is Noi Bai International, 24 km from Cua Nam Hotel Ho Guom, and the property offers a paid airport shuttle service.\r\n\r\nĐây là khu vực ở Hà Nội mà khách yêu thích, theo các đánh giá độc lập.', '113/A', NULL, 'https://res.cloudinary.com/dtsq971i7/image/upload/v1682037633/booking-hotel/sfhv3efgzlg7oiyutlca.jpg', 'booking-hotel/sfhv3efgzlg7oiyutlca', '273', 'Huyện Đan Phượng', '01', 'Thành phố Hà Nội', '09799', 'Xã Liên Hồng', 'khach-san-ha', 0, '2023-04-21 00:40:33', '2023-04-21 00:40:33'),
('37b32facfcfd4dd09e9fef1edcc60d5e', NULL, 1, 'Khách Sạn 1 Cần thơ', 'Giới thiệu về khách sạn 1 Cần Thơ, xanh, sach, dep', '21/a', NULL, 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677912978/booking-hotel/jgud72dxz0qk2ctm41tz.jpg', 'booking-hotel/jgud72dxz0qk2ctm41tz', '926', 'Huyện Phong Điền', '92', 'Thành phố Cần Thơ', '31303', 'Xã Giai Xuân', 'khach-san-1-can-tho', 0, '2023-03-03 16:56:18', '2023-03-03 16:56:18'),
('5ae3c6fce66b419cb9120e5b45fe5e24', NULL, 1, 'Khách sạn Kim Đồng', 'Giới  thiệu về Khách sạn Kim Đồng', '222C', NULL, 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949686/booking-hotel/rqptemdcuxu1s9b18l8s.jpg', 'booking-hotel/rqptemdcuxu1s9b18l8s', '888', 'Huyện Phú Tân', '89', 'Tỉnh An Giang', '30436', 'Xã Phú An', 'khach-san-kim-dong', 0, '2023-03-04 03:08:07', '2023-03-04 03:08:07'),
('67ba0e3f0fca420886a1ae45584a9834', NULL, 1, 'Khách sạn ở Thanh Hóa', 'Giới thiệu về khách sạn của Thanh Hóa', '111B', NULL, 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677917172/booking-hotel/vecjkpuvq49hzmugablh.jpg', 'booking-hotel/vecjkpuvq49hzmugablh', '754', 'Thị xã Phú Mỹ', '77', 'Tỉnh Bà Rịa - Vũng Tàu', '26707', 'Xã Tân Hoà', 'khach-san-o-thanh-hoa', 0, '2023-03-03 18:06:11', '2023-03-03 18:06:11'),
('79981cf429254e06bb311dee7a92e7e6', NULL, 0, 'MID NIGHT', 'Set in Can Tho, less than 1 km from Vincom Plaza Hung Vuong, MID NIGHT offers accommodation with a terrace, free private parking and a bar. This 2-star hotel offers room service and a 24-hour front desk. The property is non-smoking and is situated 2.3 km from Vincom Plaza Xuan Khanh.\r\n\r\nThe units come with air conditioning, a fridge, a minibar, a kettle, a shower, free toiletries and a desk. At the hotel, all rooms are equipped with a private bathroom with a hairdryer and slippers.\r\n\r\nThe area is popular for cycling, and bike hire is available at this 2-star hotel.\r\n\r\nNinh Kieu Pier is 2.5 km from MID NIGHT, while Can Tho Museum is 2.3 km away. The nearest airport is Can Tho International Airport, 9 km from the accommodation.\r\n\r\nMID NIGHT đã chào đón khách Booking.com từ 18 tháng 12 2022.', '89 Đường Huỳnh Thúc Kháng', NULL, 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677903834/booking-hotel/dhvvted5c5gsfbcje0km.jpg', 'booking-hotel/dhvvted5c5gsfbcje0km', '916', 'Quận Ninh Kiều', '92', 'Thành phố Cần Thơ', '31126', 'Phường An Nghiệp', 'mid-night', 0, '2023-03-04 04:23:53', '2023-03-04 04:23:53'),
('b86f9aa063ab4e57833333c903b0248a', NULL, 0, 'Maison Vui Homestay', 'Tọa lạc tại thành phố Hội An, cách Hội quán Triều Châu 500 m, Maison Vui Homestay có sân hiên, phòng nghỉ không gây dị ứng và WiFi miễn phí. Chỗ nghỉ nằm cách các điểm tham quan như Hội quán Hải Nam, Quan Công Miếu và Hội quán Phúc Kiến một quãng ngắn. Chỗ nghỉ có lễ tân 24 giờ, sảnh khách chung và dịch vụ thu đổi ngoại tệ cho khách.\r\n\r\nNhà khách cung cấp phòng nghỉ gắn máy điều hòa với bàn làm việc, ấm đun nước, tủ lạnh, két an toàn, TV màn hình phẳng và phòng tắm riêng với vòi sen. Tại Maison Vui Homestay, các phòng được trang bị ga trải giường và khăn tắm.\r\n\r\nĐi xe đạp là hoạt động phổ biến trong khu vực và du khách có thể thuê xe đạp tai chỗ nghỉ.\r\n\r\nMaison Vui Homestay nằm gần các điểm tham quan nổi tiếng như Bảo tàng Lịch sử Hội An, Hội quán Quảng Đông và Chùa Cầu Nhật Bản. Sân bay gần nhất là sân bay quốc tế Đà Nẵng, nằm trong bán kính 23 km từ nhà khách, và chỗ nghỉ cung cấp dịch vụ đưa đón sân bay với một khoản phụ phí.\r\n\r\nCác cặp đôi đặc biệt thích địa điểm này — họ cho điểm 9,4 cho kỳ nghỉ dành cho 2 người.', '21/A', NULL, 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677898830/booking-hotel/lkds51hool2wimdwdkzd.jpg', 'booking-hotel/lkds51hool2wimdwdkzd', '467', 'Huyện Đa Krông', '45', 'Tỉnh Quảng Trị', '19576', 'Xã Ba Nang', 'maison-vui-homestay', 0, '2023-03-01 08:30:27', '2023-03-01 08:30:27'),
('c865704402d041449e8da24f65954d78', 'd111cf3138f6484aa6d7e0e80cece7e4', 0, 'Khacsh sanj cua test nha', 'Gioi thieu ve khach san cua test', '145/3', NULL, 'https://res.cloudinary.com/dtsq971i7/image/upload/v1678764960/booking-hotel/ifvyb8s2fziheva092qf.jpg', 'booking-hotel/ifvyb8s2fziheva092qf', '753', 'Huyện Đất Đỏ', '77', 'Tỉnh Bà Rịa - Vũng Tàu', '26698', 'Xã Láng Dài', 'khacsh-sanj-cua-test-nha', 0, '2023-03-14 03:36:00', '2023-03-14 03:36:00'),
('d91abdcbfa7944e684f3efba8e0924ca', NULL, 1, 'Khách Sạn Điện Biên', 'Giới thiệu về Khách Sạn Điện Biên', '1AAA', NULL, 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677917400/booking-hotel/qzapz18fqmliyqtoozwe.jpg', 'booking-hotel/qzapz18fqmliyqtoozwe', '748', 'Thành phố Bà Rịa', '77', 'Tỉnh Bà Rịa - Vũng Tàu', '26572', 'Xã Hoà Long', 'khach-san-dien-bien', 0, '2023-03-03 04:10:00', '2023-03-03 04:10:00');

-- --------------------------------------------------------

--
-- Table structure for table `hotel_images`
--

CREATE TABLE `hotel_images` (
  `h_image_id` varchar(32) NOT NULL,
  `hotel_id` varchar(32) NOT NULL,
  `h_image_value` text DEFAULT NULL,
  `file_name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotel_images`
--

INSERT INTO `hotel_images` (`h_image_id`, `hotel_id`, `h_image_value`, `file_name`) VALUES
('125e67fea0ce4123b600603234cdbe17', '5ae3c6fce66b419cb9120e5b45fe5e24', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949686/booking-hotel/ma9lxqrvd7mbsrz9nwll.jpg', 'booking-hotel/ma9lxqrvd7mbsrz9nwll'),
('1f2dd522b3db4b398fb7b02c78d3b2ac', '1e074dc83a1e4a239dfddc86fa6c1a03', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1682037633/booking-hotel/ces9eyiouvwlso8lcxfx.jpg', 'booking-hotel/ces9eyiouvwlso8lcxfx'),
('27bc29a9176544f0b546225a23cf71eb', '79981cf429254e06bb311dee7a92e7e6', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677903834/booking-hotel/cprdcbl6l86iivegn5mm.jpg', 'booking-hotel/cprdcbl6l86iivegn5mm'),
('33616e7c38c94764a0a444f49ae83c7a', '02b92a38104842ea9ea9fe9646bf6f94', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677917303/booking-hotel/xogolxxsm8wgx0nt8fsf.jpg', 'booking-hotel/xogolxxsm8wgx0nt8fsf'),
('433d584742fd4b4fbbc2e7fd12d9a298', '67ba0e3f0fca420886a1ae45584a9834', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677917172/booking-hotel/bqql6m2tzqbqf7ipw53e.jpg', 'booking-hotel/bqql6m2tzqbqf7ipw53e'),
('436236b7ca5c48898684a88b03c34c0d', '1e074dc83a1e4a239dfddc86fa6c1a03', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1682037633/booking-hotel/cb0ipd9i4vd4y9anatwe.jpg', 'booking-hotel/cb0ipd9i4vd4y9anatwe'),
('47c8477d92c841da9db06e404c00628c', 'c865704402d041449e8da24f65954d78', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1678764961/booking-hotel/nujokp0hqvxddrzagzsv.jpg', 'booking-hotel/nujokp0hqvxddrzagzsv'),
('51e096a77369480f82b8a7f30b2fd274', '79981cf429254e06bb311dee7a92e7e6', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677903834/booking-hotel/qqpkgcd564yudxscyk7u.jpg', 'booking-hotel/qqpkgcd564yudxscyk7u'),
('52dfe3cc6b9f4b6a88eef1a34611a034', '79981cf429254e06bb311dee7a92e7e6', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677903834/booking-hotel/liznytqozudmtcixjsus.jpg', 'booking-hotel/liznytqozudmtcixjsus'),
('5abb2df9a12e47878f080458d45140a3', '37b32facfcfd4dd09e9fef1edcc60d5e', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677912978/booking-hotel/fiffelymz1lfrq6ayayl.jpg', 'booking-hotel/fiffelymz1lfrq6ayayl'),
('694c5dc34c614c50bd3686c705547716', '79981cf429254e06bb311dee7a92e7e6', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677903834/booking-hotel/tunmfpfrx3u1jq55k0xy.jpg', 'booking-hotel/tunmfpfrx3u1jq55k0xy'),
('6e0af921c6ff4b0280ff95c0db8c13bd', '0d98fb11fddb4d4ca02ac3b26a38c12a', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677918052/booking-hotel/unxbdbw8uvxywbu6p7xf.jpg', 'booking-hotel/unxbdbw8uvxywbu6p7xf'),
('6e1788dddac54d17a7883e8a11059341', '5ae3c6fce66b419cb9120e5b45fe5e24', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949686/booking-hotel/hn2ssc8yl8oohdnakh7j.jpg', 'booking-hotel/hn2ssc8yl8oohdnakh7j'),
('70287ba580f14033ac4d2024b1d4acdb', 'b86f9aa063ab4e57833333c903b0248a', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677684625/booking-hotel/hhijpqrvwr19d9tuuh6u.jpg', 'booking-hotel/hhijpqrvwr19d9tuuh6u'),
('75fc0871b2584b50a81a6a45e60f2f43', '37b32facfcfd4dd09e9fef1edcc60d5e', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677912978/booking-hotel/vmave0dlda6ygi9adcy8.jpg', 'booking-hotel/vmave0dlda6ygi9adcy8'),
('7c032868c1614728ad79e67c399a089f', '67ba0e3f0fca420886a1ae45584a9834', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677917171/booking-hotel/ivzcprpgfzoyved3kkqx.jpg', 'booking-hotel/ivzcprpgfzoyved3kkqx'),
('81ecbf7b555f48b8aece951d3b5e810c', 'b86f9aa063ab4e57833333c903b0248a', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677684625/booking-hotel/vc6rlzqv7ahm03nlcxa9.jpg', 'booking-hotel/vc6rlzqv7ahm03nlcxa9'),
('84ec3609b5194e589bf6650d13915f97', '0d98fb11fddb4d4ca02ac3b26a38c12a', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677918052/booking-hotel/bw7eqdpk2odecn2pojdm.jpg', 'booking-hotel/bw7eqdpk2odecn2pojdm'),
('891fc1615ac040219a1eb3e16db8b88b', '79981cf429254e06bb311dee7a92e7e6', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677903834/booking-hotel/ncmwzibkm4z7wptqyuoq.jpg', 'booking-hotel/ncmwzibkm4z7wptqyuoq'),
('8aad7edbdc384186aa2a9b109b9dc40d', 'd91abdcbfa7944e684f3efba8e0924ca', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677917401/booking-hotel/wy9o1g0lqb9dcvohfvfw.jpg', 'booking-hotel/wy9o1g0lqb9dcvohfvfw'),
('93890960df154df7999b8d43dcf757e7', 'b86f9aa063ab4e57833333c903b0248a', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677684625/booking-hotel/xhaciiz6wkrcazjlpljm.jpg', 'booking-hotel/xhaciiz6wkrcazjlpljm'),
('968323b7caf8479ba458afb277b332ac', '37b32facfcfd4dd09e9fef1edcc60d5e', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677912978/booking-hotel/nynyewwdtdb6nnfex4q0.jpg', 'booking-hotel/nynyewwdtdb6nnfex4q0'),
('a1932832db2749118de261f565c03746', '5ae3c6fce66b419cb9120e5b45fe5e24', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949686/booking-hotel/n59o5zy9wsxxuf9lt0uo.jpg', 'booking-hotel/n59o5zy9wsxxuf9lt0uo'),
('a516db3b9e6d41e0825a6ecc2af90fe9', 'd91abdcbfa7944e684f3efba8e0924ca', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677917401/booking-hotel/i4mlroltlrbvvddvkjck.jpg', 'booking-hotel/i4mlroltlrbvvddvkjck'),
('a7cdf5e8dc6d4e6fb821d35c29dbb918', '02b92a38104842ea9ea9fe9646bf6f94', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677917303/booking-hotel/rfnxrtcy4hyaebfaffxa.jpg', 'booking-hotel/rfnxrtcy4hyaebfaffxa'),
('b1264025d0da4717b8e1a90f6d01e8ba', '1e074dc83a1e4a239dfddc86fa6c1a03', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1682037633/booking-hotel/rjymldsmzfvfh3k6mkys.jpg', 'booking-hotel/rjymldsmzfvfh3k6mkys'),
('b6d0c0d2181e41e1912058dd464bc09c', '67ba0e3f0fca420886a1ae45584a9834', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677917171/booking-hotel/ls3uph7nai8yqs6sso0s.jpg', 'booking-hotel/ls3uph7nai8yqs6sso0s'),
('baf8700a62e144f88aef619a29ea2b82', '79981cf429254e06bb311dee7a92e7e6', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677903834/booking-hotel/vusuzw3nqqdv5qxbrhpm.jpg', 'booking-hotel/vusuzw3nqqdv5qxbrhpm'),
('bfb3b52006db4797b0c8eca726b62d83', 'b86f9aa063ab4e57833333c903b0248a', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677684625/booking-hotel/idqphmqgaz8ubutdlf1x.jpg', 'booking-hotel/idqphmqgaz8ubutdlf1x'),
('ca0d17d963b643878755d86f344b22eb', '1e074dc83a1e4a239dfddc86fa6c1a03', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1682037633/booking-hotel/skln4affw2zfnffufvcy.jpg', 'booking-hotel/skln4affw2zfnffufvcy'),
('e41b38ef81ef4b468db1cc0e53065bbe', 'b86f9aa063ab4e57833333c903b0248a', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677684626/booking-hotel/pupmmjzy0hrxc1jwfn3c.jpg', 'booking-hotel/pupmmjzy0hrxc1jwfn3c'),
('e47e6f97aa5b473da2237f3f9d67fa38', '0d98fb11fddb4d4ca02ac3b26a38c12a', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677918052/booking-hotel/tpxg0hy7t2jxa7uyrc0u.jpg', 'booking-hotel/tpxg0hy7t2jxa7uyrc0u'),
('ecf424b955764586b0856f8d9f3b5e7d', '1e074dc83a1e4a239dfddc86fa6c1a03', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1682037633/booking-hotel/jplfwg8gojxnffhledh6.jpg', 'booking-hotel/jplfwg8gojxnffhledh6');

-- --------------------------------------------------------

--
-- Table structure for table `hotel_tags`
--

CREATE TABLE `hotel_tags` (
  `tag_id` varchar(32) NOT NULL,
  `tag_key` varchar(10) NOT NULL,
  `tag_value` varchar(100) NOT NULL,
  `hotel_id` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotel_tags`
--

INSERT INTO `hotel_tags` (`tag_id`, `tag_key`, `tag_value`, `hotel_id`) VALUES
('05e7979e97204fe58e8055f5cee03c4b', 'tag', 'Nhìn ra thành phố', '67ba0e3f0fca420886a1ae45584a9834'),
('09754b42b93d4c8f8f2b2b92343c4c3a', 'tag', 'Sân vườn', '0d98fb11fddb4d4ca02ac3b26a38c12a'),
('0d10db0dfe9b4f51ac6368c93cb1a712', 'tag', 'Wi-Fi miễn phí', 'd91abdcbfa7944e684f3efba8e0924ca'),
('0e64d99416184a8881e2da2ba3dc88fd', 'tag', 'Chỗ đỗ xe miễn phí', '79981cf429254e06bb311dee7a92e7e6'),
('15c3a90172424679b6441f3596609e03', 'tag', 'Hồ bơi', 'b86f9aa063ab4e57833333c903b0248a'),
('160c630f502942bab97d79f62944aa4c', 'tag', 'Dịch vụ phòng', '1e074dc83a1e4a239dfddc86fa6c1a03'),
('16a9ff4ceb6642faa1999fa4c416f89c', 'tag', 'Hồ bơi', '37b32facfcfd4dd09e9fef1edcc60d5e'),
('1c8cbdb945ef40ae8afa0d231367d970', 'tag', 'Sân vườn', 'd91abdcbfa7944e684f3efba8e0924ca'),
('1e81a931884649ca9c94ecb3f207d485', 'tag', 'Máy giặt', '67ba0e3f0fca420886a1ae45584a9834'),
('245f50c7d082470e870520dda352b757', 'tag', 'Bếp', 'd91abdcbfa7944e684f3efba8e0924ca'),
('2e66c1814f9c473ca020cfeaa83d5218', 'tag', 'Tiện nghi BBQ', '02b92a38104842ea9ea9fe9646bf6f94'),
('35bae31a3c8d4d53b9147412ae2779ee', 'tag', 'Phòng không hút thuốc', '1e074dc83a1e4a239dfddc86fa6c1a03'),
('4139189eab7c4d01a27e695abd263d65', 'tag', 'Tiện nghi BBQ', 'c865704402d041449e8da24f65954d78'),
('47d14f7768564d3aa4b97e54f1070d04', 'tag', 'Nhìn ra thành phố', '02b92a38104842ea9ea9fe9646bf6f94'),
('49972204b02c4a7d89ae0679497d833f', 'tag', 'Nhìn ra thành phố', '1e074dc83a1e4a239dfddc86fa6c1a03'),
('528a2ca11731446e9195ca1b042edf00', 'tag', 'Bếp', '1e074dc83a1e4a239dfddc86fa6c1a03'),
('53814a6c99ce4992bb36c549fc6e82d0', 'tag', 'Bếp', 'b86f9aa063ab4e57833333c903b0248a'),
('5b28c4da585f42bfa6b9c7d5e6ef43d4', 'tag', 'Nhìn ra thành phố', '0d98fb11fddb4d4ca02ac3b26a38c12a'),
('62f176ccc290430aa8594b3e9c6e5517', 'tag', 'Sân hiên', 'd91abdcbfa7944e684f3efba8e0924ca'),
('66c21fabb7b34b44b6c551f42d221a6c', 'tag', 'Sân vườn', '67ba0e3f0fca420886a1ae45584a9834'),
('6b778910e9474dfe9b644de5ea21ef9a', 'tag', 'Nhìn ra thành phố', 'c865704402d041449e8da24f65954d78'),
('6ffdbefb0baf417d8782f90256915213', 'tag', 'Wi-Fi miễn phí', 'b86f9aa063ab4e57833333c903b0248a'),
('71d51facedea41489e8402134356f410', 'tag', 'Sân vườn', '37b32facfcfd4dd09e9fef1edcc60d5e'),
('7258fc4603c64e80be734346e6ce2fad', 'tag', 'Tiện nghi cho khách khuyết tật', '79981cf429254e06bb311dee7a92e7e6'),
('744423bf00284defab173b19c7f862ea', 'tag', 'Bếp', '67ba0e3f0fca420886a1ae45584a9834'),
('7e2bea63330747da8ee36c428faefb4b', 'tag', 'Tiện nghi BBQ', 'b86f9aa063ab4e57833333c903b0248a'),
('7ef81633888f42dc81e3bc0049977ff8', 'tag', 'Tiện nghi BBQ', '67ba0e3f0fca420886a1ae45584a9834'),
('8883734bf6a947b0bb89cfd9af1661d2', 'tag', 'Sân hiên', 'b86f9aa063ab4e57833333c903b0248a'),
('8c383784c2374ff9b97686b7e61d2a71', 'tag', 'Nhìn ra thành phố', 'b86f9aa063ab4e57833333c903b0248a'),
('9f1ea5735f7b4d96a79fdd1fd6aa7c87', 'tag', 'Sân vườn', 'b86f9aa063ab4e57833333c903b0248a'),
('a43451be90ce4cbaa99cb9d30c4d0a25', 'tag', 'Dịch vụ phòng', '79981cf429254e06bb311dee7a92e7e6'),
('a550cff51dc54b40bf395c43cb8d034b', 'tag', 'Wi-Fi miễn phí', '1e074dc83a1e4a239dfddc86fa6c1a03'),
('b0a4c282ea53443892dbf02cade46ff6', 'tag', 'Nhìn ra thành phố', '37b32facfcfd4dd09e9fef1edcc60d5e'),
('b42d235d417b434e8efc02250f7cf908', 'tag', 'Phòng không hút thuốc', '79981cf429254e06bb311dee7a92e7e6'),
('c5e095e3fc684d7ab2351911b0198de2', 'tag', 'Bếp', '0d98fb11fddb4d4ca02ac3b26a38c12a'),
('cf6260ecec8e4fb1bf99afe112f75409', 'tag', 'Wi-Fi miễn phí', '67ba0e3f0fca420886a1ae45584a9834'),
('d03ba71b894f48149211dc5116d8cf93', 'tag', 'Bếp', '02b92a38104842ea9ea9fe9646bf6f94'),
('d770e4c4ee8f4bc7863307916fd8df2a', 'tag', 'Chỗ đỗ xe miễn phí', '1e074dc83a1e4a239dfddc86fa6c1a03'),
('db377a48877b4534b39cadc91f022a86', 'tag', 'Quầy bar', '79981cf429254e06bb311dee7a92e7e6'),
('e2ff03745738440281c4a9f7dd344b20', 'tag', 'Tiện nghi BBQ', '0d98fb11fddb4d4ca02ac3b26a38c12a'),
('e3694162b47d490fb6ae5cb6ceef16f1', 'tag', 'Tiện nghi BBQ', '5ae3c6fce66b419cb9120e5b45fe5e24'),
('efdabf0af77946d28b926745b24dd4c0', 'tag', 'Máy giặt', 'b86f9aa063ab4e57833333c903b0248a'),
('f8022a6b21ae4cbe97212cfb84afdbca', 'tag', 'Nhìn ra thành phố', '5ae3c6fce66b419cb9120e5b45fe5e24');

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `district_name` varchar(60) DEFAULT NULL,
  `province_code` varchar(30) DEFAULT NULL,
  `province_name` varchar(60) DEFAULT NULL,
  `ward_code` varchar(30) DEFAULT NULL,
  `ward_name` varchar(60) DEFAULT NULL,
  `location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`location`)),
  `address` text DEFAULT NULL,
  `images` longtext DEFAULT NULL,
  `thumb` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `area_id` int(11) NOT NULL,
  `district_code` varchar(60) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `places`
--

INSERT INTO `places` (`id`, `name`, `description`, `district_name`, `province_code`, `province_name`, `ward_code`, `ward_name`, `location`, `address`, `images`, `thumb`, `area_id`, `district_code`, `slug`) VALUES
(1, 'Vũng Tàu địa điểm lân cận 2', 'Giới thiệu Vũng Tàu địa điểm lân cận 1', 'Thành phố Vũng Tàu', '77', 'Tỉnh Bà Rịa - Vũng Tàu', '26506', 'Phường 1', NULL, '1133', '[\"booking-hotel/ejite3fmgtloal84am39\",\"booking-hotel/ukchqqbu0dumrrckgmd7\",\"booking-hotel/r1idcer3hp3ncc5sqtwa\",\"booking-hotel/tq7e3ogsphhx0xfgelic\"]', 'booking-hotel/omljizctrnfw3atoztlf', 1, '747', 'vung-tau-dia-diem-lan-can-2'),
(2, 'Vũng Tàu địa điểm lân cận 3', 'Giới thiệu Vũng Tàu địa điểm lân cận 3', 'Thành phố Vũng Tàu', '77', 'Tỉnh Bà Rịa - Vũng Tàu', '26506', 'Phường 1', NULL, '11s', '[\"booking-hotel/xpdatusog2eqi6wdgnfn\",\"booking-hotel/xcy1w1jo3s4s4ssnqbhz\",\"booking-hotel/j5vhzbyceqbwigczlckl\",\"booking-hotel/uxrjrxw5mjvmdhifbnpf\"]', 'http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ioipmrpmudcjsa7g7owk.jpg', 1, '747', 'vung-tau-dia-diem-lan-can-3'),
(3, 'Vũng Tàu địa điểm lân cận 1', 'Giới thiệu Vũng Tàu địa điểm lân cận 1', 'Thành phố Vũng Tàu', '77', 'Tỉnh Bà Rịa - Vũng Tàu', '26536', 'Phường 10', NULL, '111', '[\"booking-hotel/ppg6drupmnvupkzdx8tj\",\"booking-hotel/bogcuwkbdlevl6w3gu9b\",\"booking-hotel/z8bgctlnpk9xpniik5gi\",\"booking-hotel/orcrncszvbmnlhrebkoo\"]', 'booking-hotel/ilvutsuowel9wvq41bbq', 1, '747', 'vung-tau-dia-diem-lan-can-1'),
(4, 'Vũng Tàu địa điểm lân cận 4', 'Giới thiệu Vũng Tàu địa điểm lân cận 4', 'Huyện Đất Đỏ', '77', 'Tỉnh Bà Rịa - Vũng Tàu', '26695', 'Xã Long Tân', NULL, '2222', '[\"booking-hotel/fenyieka4mqma8d2bujh\",\"booking-hotel/ymkbbwulxhe5px3tyomd\",\"booking-hotel/v8sm6fbsinuhgvdizaj7\",\"booking-hotel/e8jrtsuhppodjf9b2oot\"]', 'booking-hotel/ju8whmey2mdbjma3osfl', 1, '753', 'vung-tau-dia-diem-lan-can-4'),
(5, 'Vũng Tàu địa điểm lân cận 5', 'Giới thiệu Vũng Tàu địa điểm lân cận 5', 'Thành phố Vũng Tàu', '77', 'Tỉnh Bà Rịa - Vũng Tàu', '26509', 'Phường 2', NULL, '222', '[\"booking-hotel/qteqlnh3pbsw5uf13bkm\",\"booking-hotel/ejbv1r0odbptmyle17ao\",\"booking-hotel/xr52xqreb3jirh52udf7\",\"booking-hotel/lp8v5rawbmleujy2bmga\"]', 'booking-hotel/msjzzqoljjbryj3klisl', 1, '747', 'vung-tau-dia-diem-lan-can-5'),
(6, 'Cần Thơ địa điểm lân cận 1', 'Giới thiệu Cần Thơ địa điểm lân cận 1', 'Huyện Thới Lai', '92', 'Thành phố Cần Thơ', '31285', 'Xã Thới Tân', NULL, '222', '[\"booking-hotel/v5bsgsirbhdy0c2oul3k\",\"booking-hotel/gafiudxk4ijpzayeszfo\",\"booking-hotel/dvl44zgtck0a3rvjiusz\",\"booking-hotel/arjm0igbtck4kdje5b19\"]', 'booking-hotel/b9a1ew9znmna2gegivhi', 2, '927', 'can-tho-dia-diem-lan-can-1'),
(7, 'Cần Thơ địa điểm lân cận 2', 'Giới thiệu Cần Thơ địa điểm lân cận 2', 'Quận Ninh Kiều', '92', 'Thành phố Cần Thơ', '31141', 'Phường An Phú', NULL, '222', '[\"booking-hotel/abvqviawsuqz3twuvj2j\",\"booking-hotel/qqfxlomadty7riqgwha9\",\"booking-hotel/grldqbzykzdrwnyd4ejm\",\"booking-hotel/qnhpjvwnmaie9y0actdi\"]', 'booking-hotel/ayexwyh8rja4w5xe0jsv', 2, '916', 'can-tho-dia-diem-lan-can-2'),
(8, 'Cần Thơ địa điểm lân cận 3', 'Giới thiệu Cần Thơ địa điểm lân cận 3', 'Quận Ninh Kiều', '92', 'Thành phố Cần Thơ', '31117', 'Phường Cái Khế', NULL, '222', '[\"booking-hotel/m5xnggenf8src4mrfpuk\",\"booking-hotel/dezwv06rd2dauxog8wo1\",\"booking-hotel/cnczo1l5dylcxbm4zl2o\",\"booking-hotel/xdwhyuxxjyjqjaiwdbbc\"]', 'http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/mnnvby8ktc9yfck9yk0p.jpg', 2, '916', 'can-tho-dia-diem-lan-can-3'),
(9, 'Cần Thơ địa điểm lân cận 4', 'Giới thiệu Cần Thơ địa điểm lân cận 4', 'Quận Ô Môn', '92', 'Thành phố Cần Thơ', '31154', 'Phường Thới Hòa', NULL, '222', '[\"booking-hotel/wccz3gkdxqzf4l0fdm3e\",\"booking-hotel/upbqaqei76zzqxx6qwzr\",\"booking-hotel/wi8asnnrcj5aiaruybhk\",\"booking-hotel/bhhwtwcynwnrr6qp7tpa\"]', 'booking-hotel/eyjzzpgrvjrmsmk35mqr', 2, '917', 'can-tho-dia-diem-lan-can-4'),
(10, 'Cần Thơ địa điểm lân cận 5', 'Giới thiệu Cần Thơ địa điểm lân cận 5', 'Quận Ninh Kiều', '92', 'Thành phố Cần Thơ', '31117', 'Phường Cái Khế', NULL, '2222', '[\"booking-hotel/zwuliwyfpba7tocb06l5\",\"booking-hotel/qkvg24qxlnxwaer3ful1\",\"booking-hotel/sfnsmovijkdmpcr33n7j\",\"booking-hotel/abnxrg2r6vrttoqqtkdx\"]', 'booking-hotel/khj4qqmycrudvgghu1kx', 2, '916', 'can-tho-dia-diem-lan-can-5'),
(11, 'Hà Nội địa điểm lân cận 1', 'Giới thiệu Hà Nội địa điểm lân cận 1', 'Quận Đống Đa', '01', 'Thành phố Hà Nội', '00187', 'Phường Láng Thượng', NULL, '22', '[\"booking-hotel/qdsx1exwtnbmaog4ogyh\",\"booking-hotel/tu9xzphjoevq4p78alib\",\"booking-hotel/n41wb2nnx0ahskwkdemz\",\"booking-hotel/clqsgsumbuwyszbzuqh2\"]', 'booking-hotel/vqpfrpah3ykh02aicxuv', 5, '006', 'ha-noi-dia-diem-lan-can-1'),
(12, 'Hà Nội địa điểm lân cận 2', 'Giới thiệu Hà Nội địa điểm lân cận 2', 'Quận Đống Đa', '01', 'Thành phố Hà Nội', '00190', 'Phường Ô Chợ Dừa', NULL, '222', '[\"booking-hotel/hvskhs0bfg5rrgggfgkh\",\"booking-hotel/q3f9amoujtfbgwcioln1\",\"booking-hotel/arafmpx9u8lyof1ves8p\",\"booking-hotel/ttzcktb545bwkgqgbots\"]', 'booking-hotel/smbck0mxuwnq4ahyar0n', 5, '006', 'ha-noi-dia-diem-lan-can-2'),
(13, 'Hà Nội địa điểm lân cận 3', 'Giới thiệu Hà Nội địa điểm lân cận 3', 'Quận Đống Đa', '01', 'Thành phố Hà Nội', '00232', 'Phường Phương Mai', NULL, '222', '[\"booking-hotel/rardsjkqmmxy9nd57usl\",\"booking-hotel/rm51hineipejpmbgs4uj\",\"booking-hotel/gezkrsrehh0usiott2zb\",\"booking-hotel/cs1ruk0naplvx6cbyv1g\"]', 'booking-hotel/frgdnvyjlzk9plqvfl4m', 5, '006', 'ha-noi-dia-diem-lan-can-3'),
(14, 'Hà Nội địa điểm lân cận 4', 'Giới thiệu Hà Nội địa điểm lân cận 4', 'Quận Hai Bà Trưng', '01', 'Thành phố Hà Nội', '00265', 'Phường Đống Mác', NULL, '2221', '[\"booking-hotel/i62blwpiey3vjj7krcge\",\"booking-hotel/uowicfk4sff0cdmihng9\",\"booking-hotel/tnulx59zuez2rh151v6w\",\"booking-hotel/sdnzb0fqzcuvgr2sv4z5\"]', 'booking-hotel/lldfsi3w9vwlewanysyr', 5, '007', 'ha-noi-dia-diem-lan-can-4'),
(15, 'Hà Nội địa điểm lân cận 5', 'Giới thiệu Hà Nội địa điểm lân cận 5', 'Quận Đống Đa', '01', 'Thành phố Hà Nội', '00199', 'Phường Láng Hạ', NULL, '111', '[\"booking-hotel/cse51yveoj5tfesiyref\",\"booking-hotel/a4zsahhvvibihuesbavm\",\"booking-hotel/api7rjunucb63bgm1dlz\",\"booking-hotel/ggguwvxtosg9sfziwwni\"]', 'booking-hotel/aki7ashswvurqrfoxe5m', 5, '006', 'ha-noi-dia-diem-lan-can-5'),
(16, 'Hồ Chí Minh địa điểm lân cận 1', 'Giới thiệu Hồ Chí Minh địa điểm lân cận 1', 'Quận 10', '79', 'Thành phố Hồ Chí Minh', '27205', 'Phường 03', NULL, '222', '[\"booking-hotel/yv9bkajxwynxwbr5pj8d\",\"booking-hotel/iauoendiqktgausvat0s\",\"booking-hotel/x6sgtmny3onm7jnliupb\",\"booking-hotel/jad9jy0xahyveukmqc8y\"]', 'booking-hotel/inafkzkuox9txlngwkwn', 3, '771', 'ho-chi-minh-dia-diem-lan-can-1'),
(17, 'Hồ Chí Minh địa điểm lân cận 2', 'Giới thiệu Hồ Chí Minh địa điểm lân cận 2', 'Quận 10', '79', 'Thành phố Hồ Chí Minh', '27193', 'Phường 04', NULL, '222', '[\"booking-hotel/dxzcnp7dxuyhbuowbhi5\",\"booking-hotel/symz6apx7bwpsnamdbkx\",\"booking-hotel/slvs8qpl906ilmh6aaao\",\"booking-hotel/vji5gdw8ph3jeaawnqrv\"]', 'booking-hotel/utmrpmakgdskfvbdkike', 3, '771', 'ho-chi-minh-dia-diem-lan-can-2'),
(18, 'Hồ Chí Minh địa điểm lân cận 3', 'Giới thiệu Hồ Chí Minh địa điểm lân cận 3', 'Quận 10', '79', 'Thành phố Hồ Chí Minh', '27202', 'Phường 06', NULL, '222', '[\"booking-hotel/m6m70r4tohcawjce8jfh\",\"booking-hotel/pswvip1mvsxity7nilhm\",\"booking-hotel/nfitsauohcgruublpqig\",\"booking-hotel/iojo5vt3kychhfzdexcp\"]', 'booking-hotel/geohlfbgtnpos2sm9u2r', 3, '771', 'ho-chi-minh-dia-diem-lan-can-3'),
(19, 'Hồ Chí Minh địa điểm lân cận 4', 'Giới thiệu Hồ Chí Minh địa điểm lân cận 4', 'Quận 2', '79', 'Thành phố Hồ Chí Minh', '27094', 'Phường Bình An', NULL, '2222', '[\"booking-hotel/bfjevnogwaj4addc6vqq\",\"booking-hotel/fbkmapul1kkdysyil7br\",\"booking-hotel/mrxrl3rnjd4vcvdvwi4c\",\"booking-hotel/bdfj9ftkftibxabws7hd\"]', 'booking-hotel/v1crtpo0rnexpvb1ltwa', 3, '769', 'ho-chi-minh-dia-diem-lan-can-4'),
(20, 'Hồ Chí Minh địa điểm lân cận 5', 'Giới thiệu Hồ Chí Minh địa điểm lân cận 5', 'Quận 7', '79', 'Thành phố Hồ Chí Minh', '27481', 'Phường Tân Quy', NULL, '222', '[\"booking-hotel/hm2etpoejrwpa4jynkgt\",\"booking-hotel/lsjumsieyyozln9d2cys\",\"booking-hotel/al1gz5ffaoi2ytnltw1i\",\"booking-hotel/sgnwvtohdjwvlcpdcjnr\"]', 'booking-hotel/ii2povvnqlidwoozffwp', 3, '778', 'ho-chi-minh-dia-diem-lan-can-5'),
(21, 'An Giang địa điểm lân cận 1', 'Giới thiệu  An Giang địa điểm lân cận 1', 'Thành phố Châu Đốc', '89', 'Tỉnh An Giang', '30325', 'Phường Núi Sam', NULL, '222', '[\"booking-hotel/u6cvnrtpouqmnd8fxrae\",\"booking-hotel/qpzcxvjjwbuzbru7zgef\",\"booking-hotel/dfvku10wszqvzzansqdk\",\"booking-hotel/dw5cvf6yvj3xmnssa7l0\"]', 'http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/fp7pitn7ugchehm53ydu.jpg', 4, '884', 'an-giang-dia-diem-lan-can-1'),
(22, 'An Giang địa điểm lân cận 2', 'Giới thiệu An Giang địa điểm lân cận 2', 'Thành phố Châu Đốc', '89', 'Tỉnh An Giang', '30316', 'Phường Châu Phú B', NULL, '221', '[\"booking-hotel/qfldacaqvomoxpncmmcv\",\"booking-hotel/ciamgpj3czu2keiuj71x\",\"booking-hotel/qcjpbvc3uaqd41z36dsq\",\"booking-hotel/mu5a6zaech67md5wkkd7\"]', 'booking-hotel/igu4ssd8x3uyv2akonac', 4, '884', 'an-giang-dia-diem-lan-can-2'),
(23, 'An Giang địa điểm lân cận 3', 'Giới thiệu An Giang địa điểm lân cận 3', 'Thành phố Châu Đốc', '89', 'Tỉnh An Giang', '30331', 'Xã Vĩnh Tế', NULL, '211', '[\"booking-hotel/j7fjpriqrx5ohxpktakc\",\"booking-hotel/cksxtrctxln1d9to1wok\",\"booking-hotel/orri0c3ku8sb6laznatx\",\"booking-hotel/souol92dw5x96ahguiby\"]', 'booking-hotel/atnlx0owvhrlecmumz6f', 4, '884', 'an-giang-dia-diem-lan-can-3'),
(24, 'An Giang địa điểm lân cận 4', 'Giới thiệu An Giang địa điểm lân cận 4', 'Huyện Chợ Mới', '89', 'Tỉnh An Giang', '30676', 'Xã Hòa Bình', NULL, '333', '[\"booking-hotel/uudejghetyonzmrtrons\",\"booking-hotel/ivuwecpgafrj28qgnfq9\",\"booking-hotel/sylytsmdzqwoaepbggqp\",\"booking-hotel/e6nfshnq9l48cf93dr3w\"]', 'booking-hotel/lcyc77k3zhezkf8enrwn', 4, '893', 'an-giang-dia-diem-lan-can-4'),
(25, 'An Giang địa điểm lân cận 5', 'Giới thiệu An Giang địa điểm lân cận 5', 'Thành phố Châu Đốc', '89', 'Tỉnh An Giang', '30322', 'Phường Vĩnh Mỹ', NULL, '222', '[\"booking-hotel/f2a6eafy3dicgeejlvti\",\"booking-hotel/bsafbezxou7ckjqdrhr1\",\"booking-hotel/fuvyfsg3mgm2o8dly7hf\",\"booking-hotel/fhyeleg6i8wprx2carrw\"]', 'booking-hotel/krb5qbubvjbutuzbis35', 4, '884', 'an-giang-dia-diem-lan-can-5');

-- --------------------------------------------------------

--
-- Table structure for table `reviews_trips`
--

CREATE TABLE `reviews_trips` (
  `id` int(11) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  `trip_id` varchar(12) NOT NULL,
  `comment` varchar(32) NOT NULL,
  `score` int(11) NOT NULL CHECK (1 <= `score` <= 5),
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews_trips`
--

INSERT INTO `reviews_trips` (`id`, `user_id`, `trip_id`, `comment`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'fc98bbeda29b42df9a5b54bbaef0029c', '8c68b3b4545c', 'Tôi  thấy chuyến đi này rất  thú', 5, 1, '2024-06-09 16:13:12', '2024-06-09 16:49:27'),
(2, 'fc98bbeda29b42df9a5b54bbaef0029c', '8c68b3b4545c', 'Cũng tuyệt vời lắm', 3, 1, '2024-06-09 16:17:09', '2024-06-09 16:51:46'),
(3, 'fc98bbeda29b42df9a5b54bbaef0029c', '9ba2e7ccb0a7', 'Chuyến  đi  tạm được hahaha', 3, 1, '2024-06-09 16:50:32', '2024-06-09 16:51:40');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_id` varchar(32) NOT NULL,
  `floor_id` varchar(32) NOT NULL,
  `rt_id` varchar(32) NOT NULL,
  `status_id` varchar(32) NOT NULL,
  `hotel_id` varchar(32) NOT NULL,
  `room_name` varchar(50) NOT NULL,
  `room_desc` text DEFAULT '',
  `room_thumb` text NOT NULL,
  `file_name_img` text NOT NULL,
  `max_people` int(11) NOT NULL,
  `room_quantity` int(11) NOT NULL,
  `room_booking` int(11) DEFAULT 0,
  `avaiable` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_id`, `floor_id`, `rt_id`, `status_id`, `hotel_id`, `room_name`, `room_desc`, `room_thumb`, `file_name_img`, `max_people`, `room_quantity`, `room_booking`, `avaiable`, `created_at`, `updated_at`) VALUES
('0bfe2b86c911419c930f2daafeeb4e5f', 'b27af104ba5b465685d4554e989ea12e', '87d6893b053f47d3bc9475f8f56dc79e', 'e6e4019134dd413db95a0af6b8027162', 'b86f9aa063ab4e57833333c903b0248a', 'test', 'test', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677898810/booking-hotel/mknkbrjxw0xosuzqvh7j.jpg', 'booking-hotel/mknkbrjxw0xosuzqvh7j', 2, 5, 0, 1, '2023-02-27 06:06:03', '2023-03-06 04:55:31'),
('12b83be1a61646cb970430cf6f69c719', '8dfe3ea0000346eb9385fe756c9169ed', '87d6893b053f47d3bc9475f8f56dc79e', 'e6e4019134dd413db95a0af6b8027162', '5ae3c6fce66b419cb9120e5b45fe5e24', 'Phòng đơn 2 người', 'Phòng dành cho 1 người', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949745/booking-hotel/cwjrtynn1jgbp9mamwhd.jpg', 'booking-hotel/cwjrtynn1jgbp9mamwhd', 2, 5, 2, 1, '2023-03-04 10:09:06', '2023-04-15 04:01:44'),
('183c3cb894bc423faf77841bae018f6e', 'a8a0e4c48ee54c89bd83d94c7cd808df', '415b53927acf406ea20331cbe088b444', 'e6e4019134dd413db95a0af6b8027162', '0d98fb11fddb4d4ca02ac3b26a38c12a', 'Phòng đơn', 'Phòng đơn giới thiệu', 'https://res.cloudinary.com/dvkfmyycd/image/upload/v1717595940/booking-hotel/q8pbybgd1qcf9fbmfnjv.jpg', 'booking-hotel/q8pbybgd1qcf9fbmfnjv', 3, 10, 1, 1, '2024-06-05 13:58:38', '2024-06-06 03:04:00'),
('553510d5925c43bb8ad1e56490334c71', 'dde8c9d5fb3a416db5c3a976bfeb2b13', '704240830ffc4f48835f94c51861b702', 'e6e4019134dd413db95a0af6b8027162', '79981cf429254e06bb311dee7a92e7e6', 'Phòng Superior Giường Đôi', 'Phòng sạch đẹp thoáng mát', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677904373/booking-hotel/m7aqxkrgcuzqnxohqqbg.jpg', 'booking-hotel/m7aqxkrgcuzqnxohqqbg', 2, 5, 0, 1, '2023-03-03 14:32:53', '2024-06-05 13:56:31'),
('7a9053e6046148208298dacbeee7add0', 'ecf440e257f648858a943ca2162b2be1', '87d6893b053f47d3bc9475f8f56dc79e', 'e6e4019134dd413db95a0af6b8027162', '02b92a38104842ea9ea9fe9646bf6f94', 'Phòng 1 người', 'Dành cho 1 người', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677947369/booking-hotel/fnl318rcp70c5rqohae6.jpg', 'booking-hotel/fnl318rcp70c5rqohae6', 1, 6, 0, 1, '2023-03-04 02:29:29', '2023-03-05 21:55:31'),
('7ed23bfdf90546c092b2b665cecbb038', '59244fff30a448e7a767feda5a0b28b1', '87d6893b053f47d3bc9475f8f56dc79e', 'e6e4019134dd413db95a0af6b8027162', 'd91abdcbfa7944e684f3efba8e0924ca', 'Phòng 1 người', 'Phòng dành cho 1 người', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949288/booking-hotel/zs4na9ae8xwgx79k8btc.jpg', 'booking-hotel/zs4na9ae8xwgx79k8btc', 1, 5, 1, 1, '2023-03-04 17:01:28', '2024-06-07 14:35:01'),
('9633adb50eab4ba8931862fe2727fc95', '91fe579a41c7497f8fb5381660394715', '87d6893b053f47d3bc9475f8f56dc79e', 'e6e4019134dd413db95a0af6b8027162', '37b32facfcfd4dd09e9fef1edcc60d5e', 'Phòng Đơn', 'Phòng dành cho 1 người', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677918204/booking-hotel/cjyjycq4613ubdumercz.jpg', 'booking-hotel/cjyjycq4613ubdumercz', 1, 6, 6, 0, '2023-03-03 04:23:23', '2024-06-07 17:09:17'),
('97d68ce7401d49939a359187c3d179c4', 'b94d280973d047d9a993b5838e0b2e56', '87d6893b053f47d3bc9475f8f56dc79e', 'e6e4019134dd413db95a0af6b8027162', 'b86f9aa063ab4e57833333c903b0248a', 'Phòng 1 người', 'Đây là phòng chỉ dành cho một người', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677859252/booking-hotel/wvogkt7ueglttjabj3zp.jpg', 'booking-hotel/wvogkt7ueglttjabj3zp', 1, 5, 0, 1, '2023-03-03 02:00:53', '2023-03-06 04:55:31');

-- --------------------------------------------------------

--
-- Table structure for table `room_images`
--

CREATE TABLE `room_images` (
  `r_image_id` varchar(32) NOT NULL,
  `r_image_value` text NOT NULL,
  `file_name` text NOT NULL,
  `room_id` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_images`
--

INSERT INTO `room_images` (`r_image_id`, `r_image_value`, `file_name`, `room_id`) VALUES
('09bd08535ad742e2adfb963cfb53ffa9', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677855959/booking-hotel/y7kcbpscxsmeebugdzvo.jpg', 'booking-hotel/y7kcbpscxsmeebugdzvo', '0bfe2b86c911419c930f2daafeeb4e5f'),
('0a5a80e66b744408a5237ba07869044e', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677918204/booking-hotel/qaezacy12gjue6zimewa.jpg', 'booking-hotel/qaezacy12gjue6zimewa', '9633adb50eab4ba8931862fe2727fc95'),
('0bc2361dd58e404aa4a1ae8ac03cd40a', 'https://res.cloudinary.com/dvkfmyycd/image/upload/v1717595936/booking-hotel/q745ywezklpwqxb80ftm.jpg', 'booking-hotel/q745ywezklpwqxb80ftm', '183c3cb894bc423faf77841bae018f6e'),
('2e5a410367c74ee38896f28baf48112d', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949288/booking-hotel/obir3ubypqmwaldm0rkj.jpg', 'booking-hotel/obir3ubypqmwaldm0rkj', '7ed23bfdf90546c092b2b665cecbb038'),
('3180dbcbbe3545549fcc8501083639dd', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949745/booking-hotel/mxsthvggbiyezdokhdtc.jpg', 'booking-hotel/mxsthvggbiyezdokhdtc', '12b83be1a61646cb970430cf6f69c719'),
('389e2b445440456da940ea7418c50553', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677918204/booking-hotel/ldhxrntvx4h6xfknd5yi.jpg', 'booking-hotel/ldhxrntvx4h6xfknd5yi', '9633adb50eab4ba8931862fe2727fc95'),
('3d8161e9bae34355aeb34f4d2e82d2ea', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677859252/booking-hotel/s4lml5vnknnamywuokkh.jpg', 'booking-hotel/s4lml5vnknnamywuokkh', '97d68ce7401d49939a359187c3d179c4'),
('481df7f6324540f0b0711ba2e786487b', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677904373/booking-hotel/mdegto9ign0ma9nxqxkn.jpg', 'booking-hotel/mdegto9ign0ma9nxqxkn', '553510d5925c43bb8ad1e56490334c71'),
('521e4828e9f04369aa0123c6bf3adb0a', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949745/booking-hotel/kopdcq4jwq1goinvybjv.jpg', 'booking-hotel/kopdcq4jwq1goinvybjv', '12b83be1a61646cb970430cf6f69c719'),
('5ae07d7edfb74219ab718f40342d8ad6', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677859252/booking-hotel/endc91pes8t7ohyiyb0i.jpg', 'booking-hotel/endc91pes8t7ohyiyb0i', '97d68ce7401d49939a359187c3d179c4'),
('644153b8d1d9436cafeba00254ecfc79', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677904373/booking-hotel/kk4niexdmzkmjze7daox.jpg', 'booking-hotel/kk4niexdmzkmjze7daox', '553510d5925c43bb8ad1e56490334c71'),
('6a38ebbf16eb45c290a66b5b282595b5', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949288/booking-hotel/nto2oxczoepbtd85qbvh.jpg', 'booking-hotel/nto2oxczoepbtd85qbvh', '7ed23bfdf90546c092b2b665cecbb038'),
('7c3c3ea90f7848eb9fecb66c858d461c', 'https://res.cloudinary.com/dvkfmyycd/image/upload/v1717595936/booking-hotel/xaguhxh4mgzqtchwojql.jpg', 'booking-hotel/xaguhxh4mgzqtchwojql', '183c3cb894bc423faf77841bae018f6e'),
('802db8e7cb1d4423a8a1769598f7dead', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677904374/booking-hotel/hh8tjmkuqeaa21crbzno.jpg', 'booking-hotel/hh8tjmkuqeaa21crbzno', '553510d5925c43bb8ad1e56490334c71'),
('903e4d81fc3a4bf48109c754fb482c89', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677855961/booking-hotel/diizpuvi9in6lje1vahc.jpg', 'booking-hotel/diizpuvi9in6lje1vahc', '0bfe2b86c911419c930f2daafeeb4e5f'),
('9ba624713b414893961fcdc4cb68eb8e', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677904373/booking-hotel/ygbcjwaenppyr7y7rppz.jpg', 'booking-hotel/ygbcjwaenppyr7y7rppz', '553510d5925c43bb8ad1e56490334c71'),
('9ea9c7363940461f952f340ce9040ee9', 'https://res.cloudinary.com/dvkfmyycd/image/upload/v1717595936/booking-hotel/hvcppwixcsjqyt5keirv.jpg', 'booking-hotel/hvcppwixcsjqyt5keirv', '183c3cb894bc423faf77841bae018f6e'),
('a8d17376a731460d8e2edcfb810198bc', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677947369/booking-hotel/x4zwmyme0flqj10fkut6.jpg', 'booking-hotel/x4zwmyme0flqj10fkut6', '7a9053e6046148208298dacbeee7add0'),
('b96880ee1af042d1b2958154470461d5', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677904373/booking-hotel/vmf34sfcjcs2fstkyymk.jpg', 'booking-hotel/vmf34sfcjcs2fstkyymk', '553510d5925c43bb8ad1e56490334c71'),
('be0a1f2f1a0c44a2a1d5c34d29f0f4c1', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677904374/booking-hotel/ok4vgp3osfkey3axrbic.jpg', 'booking-hotel/ok4vgp3osfkey3axrbic', '553510d5925c43bb8ad1e56490334c71'),
('be9e6cc6b7be4ffd98c11af906f44d9d', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949745/booking-hotel/dmcfrxh4wplwjt8iavft.jpg', 'booking-hotel/dmcfrxh4wplwjt8iavft', '12b83be1a61646cb970430cf6f69c719'),
('cf571e03083d48ab983518e6d430ebdb', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677947369/booking-hotel/c9fc5vls7j2kfgxsqexh.jpg', 'booking-hotel/c9fc5vls7j2kfgxsqexh', '7a9053e6046148208298dacbeee7add0'),
('cfa34ecdec534136bf4111a754452d75', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677918204/booking-hotel/znyokihjdez92xcmnneb.jpg', 'booking-hotel/znyokihjdez92xcmnneb', '9633adb50eab4ba8931862fe2727fc95'),
('dd7b0b195d98486799c0fee27ba54f23', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677855961/booking-hotel/rakuiuj29ptso9tffeqr.jpg', 'booking-hotel/rakuiuj29ptso9tffeqr', '0bfe2b86c911419c930f2daafeeb4e5f'),
('e3efdc032dc84032999ed8afec20ee38', 'https://res.cloudinary.com/dtsq971i7/image/upload/v1677949288/booking-hotel/ou4gfewywdedwqlt2kra.jpg', 'booking-hotel/ou4gfewywdedwqlt2kra', '7ed23bfdf90546c092b2b665cecbb038'),
('f04907da15df4e25bf64877dde00792d', 'https://res.cloudinary.com/dvkfmyycd/image/upload/v1717595936/booking-hotel/x902qvylrb3ng7rbvd8d.jpg', 'booking-hotel/x902qvylrb3ng7rbvd8d', '183c3cb894bc423faf77841bae018f6e');

-- --------------------------------------------------------

--
-- Table structure for table `room_prices`
--

CREATE TABLE `room_prices` (
  `floor_id` varchar(32) NOT NULL,
  `room_id` varchar(32) NOT NULL,
  `price` int(11) DEFAULT NULL CHECK (`price` > 10),
  `date_time` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `discount` tinyint(1) DEFAULT 0,
  `percent_discount` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_prices`
--

INSERT INTO `room_prices` (`floor_id`, `room_id`, `price`, `date_time`, `discount`, `percent_discount`) VALUES
('b27af104ba5b465685d4554e989ea12e', '0bfe2b86c911419c930f2daafeeb4e5f', 11111112, '2023-03-03 22:36:35', 1, 20),
('8dfe3ea0000346eb9385fe756c9169ed', '12b83be1a61646cb970430cf6f69c719', 1000000, '2023-03-05 00:09:06', 1, 1),
('a8a0e4c48ee54c89bd83d94c7cd808df', '183c3cb894bc423faf77841bae018f6e', 500000, '2024-06-05 20:58:38', 0, 0),
('dde8c9d5fb3a416db5c3a976bfeb2b13', '553510d5925c43bb8ad1e56490334c71', 400000, '2023-03-09 11:55:51', 1, 10),
('ecf440e257f648858a943ca2162b2be1', '7a9053e6046148208298dacbeee7add0', 222222, '2023-03-04 23:29:29', 0, 0),
('59244fff30a448e7a767feda5a0b28b1', '7ed23bfdf90546c092b2b665cecbb038', 2222222, '2023-03-05 00:01:28', 1, 10),
('91fe579a41c7497f8fb5381660394715', '9633adb50eab4ba8931862fe2727fc95', 1111111, '2023-03-04 15:23:23', 0, 0),
('b94d280973d047d9a993b5838e0b2e56', '97d68ce7401d49939a359187c3d179c4', 200000, '2023-03-03 23:00:53', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `room_types`
--

CREATE TABLE `room_types` (
  `rt_id` varchar(32) NOT NULL,
  `rt_name` varchar(50) NOT NULL,
  `rt_type` varchar(20) NOT NULL,
  `rt_desc` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_types`
--

INSERT INTO `room_types` (`rt_id`, `rt_name`, `rt_type`, `rt_desc`) VALUES
('415b53927acf406ea20331cbe088b444', 'Phòng tiêu chuẩn có giường King', 'PT1', '1 giường đôi lớn'),
('5f40a30c35dc4a678a084495d188e4ab', 'Phòng 3 người có bồn tắm', 'PL31L1BL', '1 giường đôi và 1 giường đôi cực lớn'),
('704240830ffc4f48835f94c51861b702', 'Phòng 2 người', 'PL2', 'Dành cho 2 người và 1 trẻ nhỏ'),
('87d6893b053f47d3bc9475f8f56dc79e', 'Phòng 1 người', 'P1', 'Danh cho 1 người dung nhất'),
('a31d41355f454fca942dbd1754aa50e9', 'Phòng 4 người', 'PL24', '2 giường đôi'),
('deb7218077834e0686d341ef2361c0fb', 'Phòng Deluxe 4 Người', 'PD4-2BL', '2 giường đôi cực lớn ');

-- --------------------------------------------------------

--
-- Table structure for table `seesions`
--

CREATE TABLE `seesions` (
  `user_id` varchar(32) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `seesions`
--

INSERT INTO `seesions` (`user_id`, `refresh_token`, `created_at`, `updated_at`) VALUES
('fc98bbeda29b42df9a5b54bbaef0029c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiJmYzk4YmJlZGEyOWI0MmRmOWE1YjU0YmJhZWYwMDI5YyJ9LCJpYXQiOjE3MTc3Nzg4MjcsImV4cCI6MTcxODM4MzYyN30.dqS0IzbKf7EIpCmpTdp5iR2ZzA5vaxCBRXhVYKKOvcw', '2024-06-07 16:47:07', '2024-06-07 16:47:07');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` varchar(32) NOT NULL,
  `service_name` varchar(50) NOT NULL,
  `service_desc` varchar(50) DEFAULT '',
  `service_price` int(11) NOT NULL CHECK (`service_price` > 10),
  `hotel_id` varchar(32) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `status_id` varchar(32) NOT NULL,
  `type` varchar(10) NOT NULL,
  `desc` varchar(100) NOT NULL,
  `key` varchar(5) NOT NULL,
  `value` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`status_id`, `type`, `desc`, `key`, `value`) VALUES
('7547cac7c71148fd937f562e875acbf8', 'KH', 'Trạng thái không hiển thị sau khi tạo', 'KH1', 'HIDE'),
('e6e4019134dd413db95a0af6b8027162', 'KH', 'Trạng thái hiển thị sau khi tạo', 'KH2', 'SHOW');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `user_id` varchar(32) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `bill_id` varchar(32) NOT NULL COMMENT 'bill của đơn thanh toán',
  `order_id` varchar(255) NOT NULL COMMENT 'mã vnp_TxnRef',
  `vnp_command` varchar(255) NOT NULL DEFAULT 'pay',
  `vnp_response_code_refund` varchar(2) DEFAULT NULL,
  `vnp_message_refund` varchar(255) DEFAULT NULL,
  `amount` bigint(20) UNSIGNED NOT NULL COMMENT 'Tổng tiền',
  `status` varchar(255) NOT NULL COMMENT 'trạng thái của giao dịch',
  `transaction_id` varchar(255) DEFAULT NULL COMMENT 'ID giao dịch được VNPay trả về sau khi xử lý thanh toán.',
  `bank_code` varchar(255) DEFAULT NULL COMMENT 'Mã của ngân hàng đã xử lý thanh toán.',
  `pay_date` datetime DEFAULT NULL COMMENT 'Ngày và thời gian thanh toán được xử lý.',
  `response_code` varchar(255) DEFAULT NULL COMMENT 'Mã phản hồi do VNPay trả về.',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `bill_id`, `order_id`, `vnp_command`, `vnp_response_code_refund`, `vnp_message_refund`, `amount`, `status`, `transaction_id`, `bank_code`, `pay_date`, `response_code`, `created_at`, `updated_at`) VALUES
(22, 'bbfc28e8a3374232844618448e76b4c1', '20230615113411', 'pay', NULL, NULL, 360000, 'SUCCESS', '14039497', 'NCB', '2023-06-15 11:34:42', '00', '2023-06-15 04:34:12', '2023-06-15 04:34:54'),
(23, '31247282b7144ebbaade42957e0cca29', '20240606100359', 'pay', NULL, NULL, 500000, 'SUCCESS', '14445985', 'NCB', '2024-06-06 10:04:55', '00', '2024-06-06 03:04:00', '2024-06-06 03:04:40'),
(26, 'cd46ea723ab9', '20240607000441', 'pay', NULL, NULL, 5444444, 'SUCCESS', '14447429', 'NCB', '2024-06-07 00:05:41', '00', '2024-06-06 17:04:41', '2024-06-06 17:06:00'),
(27, 'fe61bb78441d', '20240607010442', 'pay', NULL, NULL, 5944444, 'SUCCESS', '14447458', 'NCB', '2024-06-07 01:05:39', '00', '2024-06-06 18:04:42', '2024-06-06 18:05:26'),
(28, '7828d6047ff3', '20240607012110', 'pay', NULL, NULL, 5944444, 'SUCCESS', '14447467', 'NCB', '2024-06-07 01:21:59', '00', '2024-06-06 18:21:10', '2024-06-06 18:21:43'),
(29, 'cfb929184a934c98bd77d9dfbd434ede', '20240607213033', 'pay', NULL, NULL, 1122222, 'SUCCESS', '14448905', 'NCB', '2024-06-07 21:31:53', '00', '2024-06-07 14:30:34', '2024-06-07 14:31:38'),
(30, 'd44a3437f39a', '20240607213501', 'pay', NULL, NULL, 9888888, 'SUCCESS', '14448912', 'NCB', '2024-06-07 21:35:57', '00', '2024-06-07 14:35:01', '2024-06-07 14:35:39'),
(31, 'addda9b906cc', '20240607225021', 'pay', NULL, NULL, 5944444, 'PENDING', NULL, NULL, NULL, NULL, '2024-06-07 15:50:21', '2024-06-07 15:50:21'),
(32, 'fa1595b717de', '20240607234736', 'pay', NULL, NULL, 5944444, 'PENDING', NULL, NULL, NULL, NULL, '2024-06-07 16:47:36', '2024-06-07 16:47:36'),
(33, '2de19a04868c', '20240607235511', 'pay', NULL, NULL, 5944444, 'PENDING', NULL, NULL, NULL, NULL, '2024-06-07 16:55:11', '2024-06-07 16:55:11'),
(34, '801fb0d2e02c', '20240608000917', 'pay', NULL, NULL, 5944444, 'SUCCESS', '14449095', 'NCB', '2024-06-08 00:10:19', '00', '2024-06-07 17:09:17', '2024-06-07 17:09:59');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` varchar(12) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_day` int(11) DEFAULT 2 COMMENT 'tong so ngay',
  `destination_id` int(11) NOT NULL COMMENT 'diem den',
  `description` text NOT NULL COMMENT 'mo ta, gioi thieu',
  `trip_fee` int(11) DEFAULT NULL COMMENT 'gia chuyen di',
  `hotel_fee` int(11) DEFAULT 0,
  `user_id` varchar(32) DEFAULT NULL COMMENT 'danh cho user',
  `hotel_id` varchar(32) DEFAULT NULL COMMENT 'khach san danh cho chuyen di',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `cost_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cost_details`)),
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `name`, `total_day`, `destination_id`, `description`, `trip_fee`, `hotel_fee`, `user_id`, `hotel_id`, `created_at`, `updated_at`, `cost_details`, `metadata`) VALUES
('776ddf2046c6', '3 ngày đi Vũng Tàu từ Cần  Thơ', 3, 1, 'Giới thiệu chuyến đi 3 ngày đi Vũng Tàu từ Cần  Thơ', 16400000, 0, '4282c3fa6bf941f588df1068c7de39d1', NULL, '2024-06-07 14:32:59', '2024-06-07 14:33:56', '{\"move\":{\"cost\":\"600000\",\"quantityPeople\":3},\"shopping\":{\"cost\":\"800000\",\"quantityPeople\":7},\"ticket\":{\"cost\":0,\"quantityPeople\":0},\"foodDrinks\":{\"cost\":\"3000000\",\"quantityPeople\":3}}', '{\"start_date\":\"2024-06-07T14:32:50.792Z\",\"end_date\":\"2024-06-09T14:32:50.792Z\",\"start\":\"Cần  Thơ\",\"children\":0,\"adult\":1}'),
('7fbc12e3f2b8', '3 ngày đi Hồ Chí Minh từ Cần thơ', 3, 3, 'Giới thiệu chuyến đi 3 ngày đi Hồ Chí Minh từ Cần thơ', 0, 0, 'fc98bbeda29b42df9a5b54bbaef0029c', NULL, '2024-06-07 13:54:27', '2024-06-07 13:54:27', '{\"move\":{\"cost\":0,\"quantityPeople\":0},\"shopping\":{\"cost\":0,\"quantityPeople\":0},\"ticket\":{\"cost\":0,\"quantityPeople\":0},\"foodDrinks\":{\"cost\":0,\"quantityPeople\":0}}', '{\"start_date\":\"2024-06-07T13:54:20.898Z\",\"end_date\":\"2024-06-09T13:54:20.898Z\",\"start\":\"Cần thơ\",\"children\":0,\"adult\":1}'),
('8c68b3b4545c', 'Cần Thơ 4N3Đ update', 4, 2, 'Giới thiệu Cần Thơ 4N3Đ update', 1500000, 4444444, NULL, '37b32facfcfd4dd09e9fef1edcc60d5e', '2024-06-05 16:16:40', '2024-06-06 15:43:09', NULL, NULL),
('9ba2e7ccb0a7', 'Vũng Tàu 4N3Đ', 4, 1, 'Giới thiệu Vũng Tàu 4N3Đ', 1000000, 8888888, NULL, 'd91abdcbfa7944e684f3efba8e0924ca', '2024-06-07 14:23:13', '2024-06-07 14:23:13', NULL, NULL),
('fcd7b6beb0e9', 'Vũng Tàu 2N1Đ', 2, 1, 'Giới thiệu Vũng Tàu 2N1Đ', 1000000, 4444444, NULL, 'd91abdcbfa7944e684f3efba8e0924ca', '2024-06-05 16:09:09', '2024-06-06 15:42:21', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trip_details`
--

CREATE TABLE `trip_details` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `order_day` int(11) DEFAULT 1 COMMENT 'sap xep ngay. VD: ngay 1',
  `trip_id` varchar(12) NOT NULL,
  `places` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '[]' CHECK (json_valid(`places`)),
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trip_details`
--

INSERT INTO `trip_details` (`id`, `name`, `order_day`, `trip_id`, `places`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Ngày 1', 1, 'fcd7b6beb0e9', '[{\"id\":627404291402.5464,\"place_id\":5,\"place\":{\"id\":5,\"name\":\"Vũng Tàu địa điểm lân cận 5\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 5\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26509\",\"ward_name\":\"Phường 2\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/qteqlnh3pbsw5uf13bkm.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ejbv1r0odbptmyle17ao.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xr52xqreb3jirh52udf7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/lp8v5rawbmleujy2bmga.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/msjzzqoljjbryj3klisl.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-5\"},\"order_place\":1},{\"id\":1332861425224.7903,\"place_id\":3,\"place\":{\"id\":3,\"name\":\"Vũng Tàu địa điểm lân cận 1\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26536\",\"ward_name\":\"Phường 10\",\"location\":null,\"address\":\"111\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ppg6drupmnvupkzdx8tj.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bogcuwkbdlevl6w3gu9b.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/z8bgctlnpk9xpniik5gi.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/orcrncszvbmnlhrebkoo.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ilvutsuowel9wvq41bbq.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-1\"},\"order_place\":1332861425224.7903}]', 'Giới thiệu về ngày 1', '2024-06-05 16:09:09', '2024-06-05 16:09:09'),
(2, 'Ngày 2', 2, 'fcd7b6beb0e9', '[{\"id\":494287472718.4028,\"place_id\":1,\"place\":{\"id\":1,\"name\":\"Vũng Tàu địa điểm lân cận 2\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26506\",\"ward_name\":\"Phường 1\",\"location\":null,\"address\":\"1133\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ejite3fmgtloal84am39.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ukchqqbu0dumrrckgmd7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/r1idcer3hp3ncc5sqtwa.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/tq7e3ogsphhx0xfgelic.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/omljizctrnfw3atoztlf.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-2\"},\"order_place\":1},{\"id\":32661777880.801266,\"place_id\":3,\"place\":{\"id\":3,\"name\":\"Vũng Tàu địa điểm lân cận 1\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26536\",\"ward_name\":\"Phường 10\",\"location\":null,\"address\":\"111\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ppg6drupmnvupkzdx8tj.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bogcuwkbdlevl6w3gu9b.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/z8bgctlnpk9xpniik5gi.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/orcrncszvbmnlhrebkoo.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ilvutsuowel9wvq41bbq.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-1\"},\"order_place\":32661777880.801266}]', 'Giới thiệu về ngày 2', '2024-06-05 16:09:09', '2024-06-05 16:09:09'),
(4, 'Ngày 1', 1, '8c68b3b4545c', '[{\"id\":553951344693.5986,\"place_id\":10,\"place\":{\"id\":10,\"name\":\"Cần Thơ địa điểm lân cận 5\",\"description\":\"Giới thiệu Cần Thơ địa điểm lân cận 5\",\"district_name\":\"Quận Ninh Kiều\",\"province_code\":\"92\",\"province_name\":\"Thành phố Cần Thơ\",\"ward_code\":\"31117\",\"ward_name\":\"Phường Cái Khế\",\"location\":null,\"address\":\"2222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/zwuliwyfpba7tocb06l5.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/qkvg24qxlnxwaer3ful1.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/sfnsmovijkdmpcr33n7j.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/abnxrg2r6vrttoqqtkdx.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/khj4qqmycrudvgghu1kx.jpg\",\"area_id\":2,\"district_code\":\"916\",\"slug\":\"can-tho-dia-diem-lan-can-5\"},\"order_place\":1}]', 'Giới thiệu về ngày 1', '2024-06-05 16:16:40', '2024-06-05 16:16:40'),
(5, 'Ngày 2', 2, '8c68b3b4545c', '[{\"id\":696644913406.5167,\"place_id\":6,\"place\":{\"id\":6,\"name\":\"Cần Thơ địa điểm lân cận 1\",\"description\":\"Giới thiệu Cần Thơ địa điểm lân cận 1\",\"district_name\":\"Huyện Thới Lai\",\"province_code\":\"92\",\"province_name\":\"Thành phố Cần Thơ\",\"ward_code\":\"31285\",\"ward_name\":\"Xã Thới Tân\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/v5bsgsirbhdy0c2oul3k.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/gafiudxk4ijpzayeszfo.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/dvl44zgtck0a3rvjiusz.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/arjm0igbtck4kdje5b19.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/b9a1ew9znmna2gegivhi.jpg\",\"area_id\":2,\"district_code\":\"927\",\"slug\":\"can-tho-dia-diem-lan-can-1\"},\"order_place\":1}]', 'Giới thiệu về ngày 2', '2024-06-05 16:16:40', '2024-06-05 16:16:40'),
(10, 'Ngày 3', 3, '8c68b3b4545c', '[{\"id\":1251171283561049,\"place_id\":8,\"place\":{\"id\":8,\"name\":\"Cần Thơ địa điểm lân cận 3\",\"description\":\"Giới thiệu Cần Thơ địa điểm lân cận 3\",\"district_name\":\"Quận Ninh Kiều\",\"province_code\":\"92\",\"province_name\":\"Thành phố Cần Thơ\",\"ward_code\":\"31117\",\"ward_name\":\"Phường Cái Khế\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/m5xnggenf8src4mrfpuk.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/dezwv06rd2dauxog8wo1.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/cnczo1l5dylcxbm4zl2o.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xdwhyuxxjyjqjaiwdbbc.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/mnnvby8ktc9yfck9yk0p.jpg\",\"area_id\":2,\"district_code\":\"916\",\"slug\":\"can-tho-dia-diem-lan-can-3\"},\"order_place\":1}]', 'Giới thiệu về ngày 3', '2024-06-06 08:30:01', '2024-06-06 08:30:01'),
(12, 'Ngày 4', 4, '8c68b3b4545c', '[{\"id\":1137048972518523,\"place_id\":9,\"place\":{\"id\":9,\"name\":\"Cần Thơ địa điểm lân cận 4\",\"description\":\"Giới thiệu Cần Thơ địa điểm lân cận 4\",\"district_name\":\"Quận Ô Môn\",\"province_code\":\"92\",\"province_name\":\"Thành phố Cần Thơ\",\"ward_code\":\"31154\",\"ward_name\":\"Phường Thới Hòa\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/wccz3gkdxqzf4l0fdm3e.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/upbqaqei76zzqxx6qwzr.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/wi8asnnrcj5aiaruybhk.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bhhwtwcynwnrr6qp7tpa.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/eyjzzpgrvjrmsmk35mqr.jpg\",\"area_id\":2,\"district_code\":\"917\",\"slug\":\"can-tho-dia-diem-lan-can-4\"},\"order_place\":1}]', 'Giới thiệu về ngày 4', '2024-06-06 15:41:53', '2024-06-06 15:41:53'),
(40, 'Ngày 1', 1, '7fbc12e3f2b8', '[{\"id\":910835389041188,\"place_id\":16,\"place\":{\"id\":16,\"name\":\"Hồ Chí Minh địa điểm lân cận 1\",\"description\":\"Giới thiệu Hồ Chí Minh địa điểm lân cận 1\",\"district_name\":\"Quận 10\",\"province_code\":\"79\",\"province_name\":\"Thành phố Hồ Chí Minh\",\"ward_code\":\"27205\",\"ward_name\":\"Phường 03\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/yv9bkajxwynxwbr5pj8d.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/iauoendiqktgausvat0s.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/x6sgtmny3onm7jnliupb.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/jad9jy0xahyveukmqc8y.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/inafkzkuox9txlngwkwn.jpg\",\"area_id\":3,\"district_code\":\"771\",\"slug\":\"ho-chi-minh-dia-diem-lan-can-1\"},\"order_place\":910835389041188,\"timeline\":\"8 h\"},{\"id\":741930402798452,\"place_id\":18,\"place\":{\"id\":18,\"name\":\"Hồ Chí Minh địa điểm lân cận 3\",\"description\":\"Giới thiệu Hồ Chí Minh địa điểm lân cận 3\",\"district_name\":\"Quận 10\",\"province_code\":\"79\",\"province_name\":\"Thành phố Hồ Chí Minh\",\"ward_code\":\"27202\",\"ward_name\":\"Phường 06\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/m6m70r4tohcawjce8jfh.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/pswvip1mvsxity7nilhm.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/nfitsauohcgruublpqig.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/iojo5vt3kychhfzdexcp.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/geohlfbgtnpos2sm9u2r.jpg\",\"area_id\":3,\"district_code\":\"771\",\"slug\":\"ho-chi-minh-dia-diem-lan-can-3\"},\"order_place\":741930402798452,\"timeline\":\"10 h\"}]', 'Giới thiệu về ngày 1', '2024-06-07 13:54:27', '2024-06-07 13:59:02'),
(41, 'Ngày 2', 2, '7fbc12e3f2b8', '[{\"id\":1545322098183760,\"place_id\":18,\"place\":{\"id\":18,\"name\":\"Hồ Chí Minh địa điểm lân cận 3\",\"description\":\"Giới thiệu Hồ Chí Minh địa điểm lân cận 3\",\"district_name\":\"Quận 10\",\"province_code\":\"79\",\"province_name\":\"Thành phố Hồ Chí Minh\",\"ward_code\":\"27202\",\"ward_name\":\"Phường 06\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/m6m70r4tohcawjce8jfh.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/pswvip1mvsxity7nilhm.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/nfitsauohcgruublpqig.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/iojo5vt3kychhfzdexcp.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/geohlfbgtnpos2sm9u2r.jpg\",\"area_id\":3,\"district_code\":\"771\",\"slug\":\"ho-chi-minh-dia-diem-lan-can-3\"},\"order_place\":1545322098183760,\"timeline\":\"20h\"},{\"id\":94463973116487,\"place_id\":19,\"place\":{\"id\":19,\"name\":\"Hồ Chí Minh địa điểm lân cận 4\",\"description\":\"Giới thiệu Hồ Chí Minh địa điểm lân cận 4\",\"district_name\":\"Quận 2\",\"province_code\":\"79\",\"province_name\":\"Thành phố Hồ Chí Minh\",\"ward_code\":\"27094\",\"ward_name\":\"Phường Bình An\",\"location\":null,\"address\":\"2222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bfjevnogwaj4addc6vqq.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/fbkmapul1kkdysyil7br.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/mrxrl3rnjd4vcvdvwi4c.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bdfj9ftkftibxabws7hd.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/v1crtpo0rnexpvb1ltwa.jpg\",\"area_id\":3,\"district_code\":\"769\",\"slug\":\"ho-chi-minh-dia-diem-lan-can-4\"},\"order_place\":94463973116487,\"timeline\":\"21h\"},{\"id\":1033615896138166,\"place_id\":20,\"place\":{\"id\":20,\"name\":\"Hồ Chí Minh địa điểm lân cận 5\",\"description\":\"Giới thiệu Hồ Chí Minh địa điểm lân cận 5\",\"district_name\":\"Quận 7\",\"province_code\":\"79\",\"province_name\":\"Thành phố Hồ Chí Minh\",\"ward_code\":\"27481\",\"ward_name\":\"Phường Tân Quy\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/hm2etpoejrwpa4jynkgt.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/lsjumsieyyozln9d2cys.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/al1gz5ffaoi2ytnltw1i.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/sgnwvtohdjwvlcpdcjnr.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ii2povvnqlidwoozffwp.jpg\",\"area_id\":3,\"district_code\":\"778\",\"slug\":\"ho-chi-minh-dia-diem-lan-can-5\"},\"order_place\":1033615896138166,\"timeline\":\"22h\"}]', 'Giới thiệu về ngày 2', '2024-06-07 13:54:27', '2024-06-07 13:57:32'),
(42, 'Ngày 33', 3, '7fbc12e3f2b8', '[{\"id\":1482105439143445,\"place_id\":16,\"place\":{\"id\":16,\"name\":\"Hồ Chí Minh địa điểm lân cận 1\",\"description\":\"Giới thiệu Hồ Chí Minh địa điểm lân cận 1\",\"district_name\":\"Quận 10\",\"province_code\":\"79\",\"province_name\":\"Thành phố Hồ Chí Minh\",\"ward_code\":\"27205\",\"ward_name\":\"Phường 03\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/yv9bkajxwynxwbr5pj8d.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/iauoendiqktgausvat0s.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/x6sgtmny3onm7jnliupb.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/jad9jy0xahyveukmqc8y.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/inafkzkuox9txlngwkwn.jpg\",\"area_id\":3,\"district_code\":\"771\",\"slug\":\"ho-chi-minh-dia-diem-lan-can-1\"},\"order_place\":1482105439143445,\"timeline\":\"8 h\"},{\"id\":412638011221767,\"place_id\":18,\"place\":{\"id\":18,\"name\":\"Hồ Chí Minh địa điểm lân cận 3\",\"description\":\"Giới thiệu Hồ Chí Minh địa điểm lân cận 3\",\"district_name\":\"Quận 10\",\"province_code\":\"79\",\"province_name\":\"Thành phố Hồ Chí Minh\",\"ward_code\":\"27202\",\"ward_name\":\"Phường 06\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/m6m70r4tohcawjce8jfh.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/pswvip1mvsxity7nilhm.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/nfitsauohcgruublpqig.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/iojo5vt3kychhfzdexcp.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/geohlfbgtnpos2sm9u2r.jpg\",\"area_id\":3,\"district_code\":\"771\",\"slug\":\"ho-chi-minh-dia-diem-lan-can-3\"},\"order_place\":412638011221767,\"timeline\":\"10 h\"},{\"id\":173279739954359,\"place_id\":19,\"place\":{\"id\":19,\"name\":\"Hồ Chí Minh địa điểm lân cận 4\",\"description\":\"Giới thiệu Hồ Chí Minh địa điểm lân cận 4\",\"district_name\":\"Quận 2\",\"province_code\":\"79\",\"province_name\":\"Thành phố Hồ Chí Minh\",\"ward_code\":\"27094\",\"ward_name\":\"Phường Bình An\",\"location\":null,\"address\":\"2222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bfjevnogwaj4addc6vqq.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/fbkmapul1kkdysyil7br.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/mrxrl3rnjd4vcvdvwi4c.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bdfj9ftkftibxabws7hd.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/v1crtpo0rnexpvb1ltwa.jpg\",\"area_id\":3,\"district_code\":\"769\",\"slug\":\"ho-chi-minh-dia-diem-lan-can-4\"},\"order_place\":173279739954359,\"timeline\":\"11h\"}]', 'Giới thiệu về ngày 3', '2024-06-07 13:54:27', '2024-06-07 13:59:02'),
(43, 'Ngày 1', 1, '9ba2e7ccb0a7', '[{\"id\":382398746467518,\"place_id\":1,\"place\":{\"id\":1,\"name\":\"Vũng Tàu địa điểm lân cận 2\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26506\",\"ward_name\":\"Phường 1\",\"location\":null,\"address\":\"1133\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ejite3fmgtloal84am39.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ukchqqbu0dumrrckgmd7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/r1idcer3hp3ncc5sqtwa.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/tq7e3ogsphhx0xfgelic.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/omljizctrnfw3atoztlf.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-2\"},\"order_place\":1}]', 'Giới thiệu về ngày 1', '2024-06-07 14:23:13', '2024-06-07 14:23:13'),
(44, 'Ngày 2', 2, '9ba2e7ccb0a7', '[{\"id\":46494237593214,\"place_id\":3,\"place\":{\"id\":3,\"name\":\"Vũng Tàu địa điểm lân cận 1\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26536\",\"ward_name\":\"Phường 10\",\"location\":null,\"address\":\"111\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ppg6drupmnvupkzdx8tj.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bogcuwkbdlevl6w3gu9b.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/z8bgctlnpk9xpniik5gi.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/orcrncszvbmnlhrebkoo.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ilvutsuowel9wvq41bbq.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-1\"},\"order_place\":1}]', 'Giới thiệu về ngày 2', '2024-06-07 14:23:13', '2024-06-07 14:23:13'),
(45, 'Ngày 3', 3, '9ba2e7ccb0a7', '[{\"id\":1146290722233593,\"place_id\":2,\"place\":{\"id\":2,\"name\":\"Vũng Tàu địa điểm lân cận 3\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 3\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26506\",\"ward_name\":\"Phường 1\",\"location\":null,\"address\":\"11s\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xpdatusog2eqi6wdgnfn.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xcy1w1jo3s4s4ssnqbhz.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/j5vhzbyceqbwigczlckl.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/uxrjrxw5mjvmdhifbnpf.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ioipmrpmudcjsa7g7owk.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-3\"},\"order_place\":1},{\"id\":455716453158852,\"place_id\":3,\"place\":{\"id\":3,\"name\":\"Vũng Tàu địa điểm lân cận 1\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26536\",\"ward_name\":\"Phường 10\",\"location\":null,\"address\":\"111\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ppg6drupmnvupkzdx8tj.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bogcuwkbdlevl6w3gu9b.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/z8bgctlnpk9xpniik5gi.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/orcrncszvbmnlhrebkoo.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ilvutsuowel9wvq41bbq.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-1\"},\"order_place\":455716453158852},{\"id\":735179698477091,\"place_id\":4,\"place\":{\"id\":4,\"name\":\"Vũng Tàu địa điểm lân cận 4\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 4\",\"district_name\":\"Huyện Đất Đỏ\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26695\",\"ward_name\":\"Xã Long Tân\",\"location\":null,\"address\":\"2222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/fenyieka4mqma8d2bujh.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ymkbbwulxhe5px3tyomd.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/v8sm6fbsinuhgvdizaj7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/e8jrtsuhppodjf9b2oot.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ju8whmey2mdbjma3osfl.jpg\",\"area_id\":1,\"district_code\":\"753\",\"slug\":\"vung-tau-dia-diem-lan-can-4\"},\"order_place\":735179698477091}]', 'Giới thiệu về ngày 3', '2024-06-07 14:23:13', '2024-06-07 14:23:13'),
(46, 'Ngày 4', 4, '9ba2e7ccb0a7', '[{\"id\":391013070395516,\"place_id\":1,\"place\":{\"id\":1,\"name\":\"Vũng Tàu địa điểm lân cận 2\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26506\",\"ward_name\":\"Phường 1\",\"location\":null,\"address\":\"1133\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ejite3fmgtloal84am39.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ukchqqbu0dumrrckgmd7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/r1idcer3hp3ncc5sqtwa.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/tq7e3ogsphhx0xfgelic.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/omljizctrnfw3atoztlf.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-2\"},\"order_place\":1},{\"id\":1716983191776108,\"place_id\":2,\"place\":{\"id\":2,\"name\":\"Vũng Tàu địa điểm lân cận 3\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 3\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26506\",\"ward_name\":\"Phường 1\",\"location\":null,\"address\":\"11s\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xpdatusog2eqi6wdgnfn.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xcy1w1jo3s4s4ssnqbhz.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/j5vhzbyceqbwigczlckl.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/uxrjrxw5mjvmdhifbnpf.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ioipmrpmudcjsa7g7owk.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-3\"},\"order_place\":1716983191776108},{\"id\":91950279522161,\"place_id\":2,\"place\":{\"id\":2,\"name\":\"Vũng Tàu địa điểm lân cận 3\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 3\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26506\",\"ward_name\":\"Phường 1\",\"location\":null,\"address\":\"11s\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xpdatusog2eqi6wdgnfn.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xcy1w1jo3s4s4ssnqbhz.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/j5vhzbyceqbwigczlckl.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/uxrjrxw5mjvmdhifbnpf.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ioipmrpmudcjsa7g7owk.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-3\"},\"order_place\":91950279522161},{\"id\":1409981942243526,\"place_id\":5,\"place\":{\"id\":5,\"name\":\"Vũng Tàu địa điểm lân cận 5\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 5\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26509\",\"ward_name\":\"Phường 2\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/qteqlnh3pbsw5uf13bkm.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ejbv1r0odbptmyle17ao.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xr52xqreb3jirh52udf7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/lp8v5rawbmleujy2bmga.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/msjzzqoljjbryj3klisl.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-5\"},\"order_place\":1409981942243526},{\"id\":546624059583198,\"place_id\":4,\"place\":{\"id\":4,\"name\":\"Vũng Tàu địa điểm lân cận 4\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 4\",\"district_name\":\"Huyện Đất Đỏ\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26695\",\"ward_name\":\"Xã Long Tân\",\"location\":null,\"address\":\"2222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/fenyieka4mqma8d2bujh.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ymkbbwulxhe5px3tyomd.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/v8sm6fbsinuhgvdizaj7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/e8jrtsuhppodjf9b2oot.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ju8whmey2mdbjma3osfl.jpg\",\"area_id\":1,\"district_code\":\"753\",\"slug\":\"vung-tau-dia-diem-lan-can-4\"},\"order_place\":546624059583198}]', 'Giới thiệu về ngày 4', '2024-06-07 14:23:13', '2024-06-07 14:23:13'),
(47, 'Ngày 1', 1, '776ddf2046c6', '[{\"id\":1533360731004875,\"place_id\":1,\"place\":{\"id\":1,\"name\":\"Vũng Tàu địa điểm lân cận 2\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26506\",\"ward_name\":\"Phường 1\",\"location\":null,\"address\":\"1133\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ejite3fmgtloal84am39.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ukchqqbu0dumrrckgmd7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/r1idcer3hp3ncc5sqtwa.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/tq7e3ogsphhx0xfgelic.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/omljizctrnfw3atoztlf.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-2\"},\"order_place\":1533360731004875,\"timeline\":\"8 h\"},{\"id\":618621905597230,\"place_id\":2,\"place\":{\"id\":2,\"name\":\"Vũng Tàu địa điểm lân cận 3\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 3\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26506\",\"ward_name\":\"Phường 1\",\"location\":null,\"address\":\"11s\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xpdatusog2eqi6wdgnfn.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xcy1w1jo3s4s4ssnqbhz.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/j5vhzbyceqbwigczlckl.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/uxrjrxw5mjvmdhifbnpf.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ioipmrpmudcjsa7g7owk.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-3\"},\"order_place\":618621905597230,\"timeline\":\"9 h\"},{\"id\":43917877409317,\"place_id\":3,\"place\":{\"id\":3,\"name\":\"Vũng Tàu địa điểm lân cận 1\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26536\",\"ward_name\":\"Phường 10\",\"location\":null,\"address\":\"111\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ppg6drupmnvupkzdx8tj.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bogcuwkbdlevl6w3gu9b.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/z8bgctlnpk9xpniik5gi.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/orcrncszvbmnlhrebkoo.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ilvutsuowel9wvq41bbq.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-1\"},\"order_place\":43917877409317,\"timeline\":\"10 h\"}]', 'Giới thiệu về ngày 1', '2024-06-07 14:32:59', '2024-06-07 14:32:59'),
(48, 'Ngày 2', 2, '776ddf2046c6', '[{\"id\":78175495625371,\"place_id\":3,\"place\":{\"id\":3,\"name\":\"Vũng Tàu địa điểm lân cận 1\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26536\",\"ward_name\":\"Phường 10\",\"location\":null,\"address\":\"111\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ppg6drupmnvupkzdx8tj.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bogcuwkbdlevl6w3gu9b.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/z8bgctlnpk9xpniik5gi.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/orcrncszvbmnlhrebkoo.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ilvutsuowel9wvq41bbq.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-1\"},\"order_place\":78175495625371,\"timeline\":\"8 h\"},{\"id\":1268206289958296,\"place_id\":4,\"place\":{\"id\":4,\"name\":\"Vũng Tàu địa điểm lân cận 4\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 4\",\"district_name\":\"Huyện Đất Đỏ\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26695\",\"ward_name\":\"Xã Long Tân\",\"location\":null,\"address\":\"2222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/fenyieka4mqma8d2bujh.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ymkbbwulxhe5px3tyomd.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/v8sm6fbsinuhgvdizaj7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/e8jrtsuhppodjf9b2oot.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ju8whmey2mdbjma3osfl.jpg\",\"area_id\":1,\"district_code\":\"753\",\"slug\":\"vung-tau-dia-diem-lan-can-4\"},\"order_place\":1268206289958296,\"timeline\":\"9 h\"},{\"id\":1184016914038768,\"place_id\":5,\"place\":{\"id\":5,\"name\":\"Vũng Tàu địa điểm lân cận 5\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 5\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26509\",\"ward_name\":\"Phường 2\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/qteqlnh3pbsw5uf13bkm.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ejbv1r0odbptmyle17ao.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xr52xqreb3jirh52udf7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/lp8v5rawbmleujy2bmga.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/msjzzqoljjbryj3klisl.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-5\"},\"order_place\":1184016914038768,\"timeline\":\"10 h\"}]', 'Giới thiệu về ngày 2', '2024-06-07 14:32:59', '2024-06-07 14:32:59'),
(49, 'Ngày 3', 3, '776ddf2046c6', '[{\"id\":431007641333614,\"place_id\":1,\"place\":{\"id\":1,\"name\":\"Vũng Tàu địa điểm lân cận 2\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26506\",\"ward_name\":\"Phường 1\",\"location\":null,\"address\":\"1133\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ejite3fmgtloal84am39.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ukchqqbu0dumrrckgmd7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/r1idcer3hp3ncc5sqtwa.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/tq7e3ogsphhx0xfgelic.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/omljizctrnfw3atoztlf.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-2\"},\"order_place\":431007641333614,\"timeline\":\"8 h\"},{\"id\":208232038542226,\"place_id\":2,\"place\":{\"id\":2,\"name\":\"Vũng Tàu địa điểm lân cận 3\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 3\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26506\",\"ward_name\":\"Phường 1\",\"location\":null,\"address\":\"11s\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xpdatusog2eqi6wdgnfn.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xcy1w1jo3s4s4ssnqbhz.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/j5vhzbyceqbwigczlckl.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/uxrjrxw5mjvmdhifbnpf.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ioipmrpmudcjsa7g7owk.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-3\"},\"order_place\":208232038542226,\"timeline\":\"9 h\"},{\"id\":1322404073682987,\"place_id\":3,\"place\":{\"id\":3,\"name\":\"Vũng Tàu địa điểm lân cận 1\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26536\",\"ward_name\":\"Phường 10\",\"location\":null,\"address\":\"111\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ppg6drupmnvupkzdx8tj.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bogcuwkbdlevl6w3gu9b.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/z8bgctlnpk9xpniik5gi.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/orcrncszvbmnlhrebkoo.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ilvutsuowel9wvq41bbq.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-1\"},\"order_place\":1322404073682987,\"timeline\":\"10 h\"},{\"id\":1405195017719829,\"place_id\":3,\"place\":{\"id\":3,\"name\":\"Vũng Tàu địa điểm lân cận 1\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 1\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26536\",\"ward_name\":\"Phường 10\",\"location\":null,\"address\":\"111\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ppg6drupmnvupkzdx8tj.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/bogcuwkbdlevl6w3gu9b.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/z8bgctlnpk9xpniik5gi.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/orcrncszvbmnlhrebkoo.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ilvutsuowel9wvq41bbq.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-1\"},\"order_place\":1405195017719829,\"timeline\":\"11h\"},{\"id\":1519397015427113,\"place_id\":5,\"place\":{\"id\":5,\"name\":\"Vũng Tàu địa điểm lân cận 5\",\"description\":\"Giới thiệu Vũng Tàu địa điểm lân cận 5\",\"district_name\":\"Thành phố Vũng Tàu\",\"province_code\":\"77\",\"province_name\":\"Tỉnh Bà Rịa - Vũng Tàu\",\"ward_code\":\"26509\",\"ward_name\":\"Phường 2\",\"location\":null,\"address\":\"222\",\"images\":[\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/qteqlnh3pbsw5uf13bkm.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/ejbv1r0odbptmyle17ao.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/xr52xqreb3jirh52udf7.jpg\",\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/lp8v5rawbmleujy2bmga.jpg\"],\"thumb\":\"http://res.cloudinary.com/dvkfmyycd/image/upload/v1/booking-hotel/msjzzqoljjbryj3klisl.jpg\",\"area_id\":1,\"district_code\":\"747\",\"slug\":\"vung-tau-dia-diem-lan-can-5\"},\"order_place\":1519397015427113,\"timeline\":\"15h\"}]', 'Giới thiệu về ngày 3', '2024-06-07 14:32:59', '2024-06-07 14:33:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(32) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(32) DEFAULT NULL,
  `password` varchar(80) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `identity_card` varchar(15) DEFAULT NULL,
  `year_of_brith` varchar(4) DEFAULT '',
  `address` varchar(40) DEFAULT '',
  `picture` text DEFAULT '',
  `file_name_picture` text DEFAULT '',
  `hotel_id` varchar(32) DEFAULT NULL,
  `is_verify` tinyint(1) DEFAULT 0,
  `role` enum('ADMIN','HOTEL','USER') DEFAULT 'USER',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `username`, `password`, `phone`, `identity_card`, `year_of_brith`, `address`, `picture`, `file_name_picture`, `hotel_id`, `is_verify`, `role`, `created_at`, `updated_at`) VALUES
('4282c3fa6bf941f588df1068c7de39d1', 'Nguyễn', 'Văn Đồng A', 'ginga550505@gmail.com', 'donga', '$2b$10$uULdnKUvYwheJSy3t1H/YOvf8OMy.e4PLlCPI8jlNQGbAukq8g1CS', '0121212312', NULL, '', '', '', '', NULL, 0, 'USER', '2024-06-07 14:28:05', '2024-06-07 14:28:05'),
('5b6072ce53e645b4a286d40b53132f94', 'test', 'test1', 'test@gmail.com', 'test123', '$2b$10$DPWePDTV0Y7J5f/gp42hMeHBAVH4S0BX/sqcBtZJhxf7xnmhwmhtq', '0292822123', NULL, '', '', '', '', NULL, 0, 'USER', '2023-03-01 15:19:05', '2023-03-01 15:19:05'),
('5f2980484ec043768ccf9470e7d1c70e', 'Nguyễn', 'A', 'ginga550504@gmail.com', NULL, NULL, NULL, NULL, '', '', 'https://lh3.googleusercontent.com/a/ACg8ocIhQoKJkcvxpCKofIi29-WJq-qLjytUiK2adII81WK5NUUoFw=s96-c', '', NULL, 0, 'USER', '2024-06-04 08:32:37', '2024-06-07 14:05:32'),
('d111cf3138f6484aa6d7e0e80cece7e4', 'test', 'test', 'test1@gmail.com', 'test1234', '$2b$10$4xwXXunFHD5We.gXx5EgV.tUkHoAJ.InPgq5cqAf0oKfzD2u27rkC', '0292928121', NULL, '', '', '', '', NULL, 0, 'HOTEL', '2023-03-01 15:19:53', '2023-03-14 00:48:29'),
('fc98bbeda29b42df9a5b54bbaef0029c', 'Nguyễn', 'Admin', 'admin@gmail.com', 'admin123', '$2b$10$9Xb2Ki.NDHQpR.YJZlDEoOLy6ACBnTMp7T736mrBHgTHCwBOWurv.', '0218212123', NULL, '', '', '', '', NULL, 0, 'ADMIN', '2023-03-01 14:36:06', '2024-06-07 07:48:02');

-- --------------------------------------------------------

--
-- Table structure for table `use_service`
--

CREATE TABLE `use_service` (
  `floor_id` varchar(32) NOT NULL,
  `room_id` varchar(32) NOT NULL,
  `bill_id` varchar(32) NOT NULL,
  `service_id` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`bill_id`),
  ADD UNIQUE KEY `bill_id` (`bill_id`),
  ADD KEY `user_id` (`user_id`);
ALTER TABLE `bills` ADD FULLTEXT KEY `bill_id_2` (`bill_id`);

--
-- Indexes for table `bill_details`
--
ALTER TABLE `bill_details`
  ADD PRIMARY KEY (`bill_id`,`room_id`,`floor_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `floor_id` (`floor_id`);

--
-- Indexes for table `bookings_trip`
--
ALTER TABLE `bookings_trip`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trip_id` (`trip_id`);

--
-- Indexes for table `device_types`
--
ALTER TABLE `device_types`
  ADD PRIMARY KEY (`dt_id`),
  ADD UNIQUE KEY `dt_id` (`dt_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `floors`
--
ALTER TABLE `floors`
  ADD PRIMARY KEY (`floor_id`),
  ADD UNIQUE KEY `floor_id` (`floor_id`),
  ADD KEY `hotel_id` (`hotel_id`) USING BTREE;

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`hotel_id`),
  ADD UNIQUE KEY `hotel_id` (`hotel_id`),
  ADD UNIQUE KEY `hotel_name` (`hotel_name`),
  ADD KEY `fk_owner_id` (`owner_id`);
ALTER TABLE `hotels` ADD FULLTEXT KEY `provice_name` (`provice_name`);

--
-- Indexes for table `hotel_images`
--
ALTER TABLE `hotel_images`
  ADD PRIMARY KEY (`h_image_id`),
  ADD UNIQUE KEY `h_image_id` (`h_image_id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `hotel_tags`
--
ALTER TABLE `hotel_tags`
  ADD PRIMARY KEY (`tag_id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`),
  ADD KEY `area_id` (`area_id`);

--
-- Indexes for table `reviews_trips`
--
ALTER TABLE `reviews_trips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trip_id` (`trip_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`,`floor_id`),
  ADD UNIQUE KEY `room_id` (`room_id`),
  ADD KEY `floor_id` (`floor_id`),
  ADD KEY `rt_id` (`rt_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `room_images`
--
ALTER TABLE `room_images`
  ADD PRIMARY KEY (`r_image_id`),
  ADD UNIQUE KEY `r_image_id` (`r_image_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `room_prices`
--
ALTER TABLE `room_prices`
  ADD PRIMARY KEY (`room_id`,`floor_id`),
  ADD KEY `floor_id` (`floor_id`);

--
-- Indexes for table `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`rt_id`),
  ADD UNIQUE KEY `rt_id` (`rt_id`),
  ADD UNIQUE KEY `rt_type` (`rt_type`);

--
-- Indexes for table `seesions`
--
ALTER TABLE `seesions`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`),
  ADD UNIQUE KEY `service_id` (`service_id`),
  ADD UNIQUE KEY `service_name` (`service_name`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`status_id`),
  ADD UNIQUE KEY `status_id` (`status_id`),
  ADD UNIQUE KEY `key` (`key`),
  ADD UNIQUE KEY `value` (`value`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bill_id` (`bill_id`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_the_trips_far_users` (`user_id`),
  ADD KEY `fk_the_trips_far_areas` (`destination_id`),
  ADD KEY `fk_the_trips_far_hotels` (`hotel_id`);

--
-- Indexes for table `trip_details`
--
ALTER TABLE `trip_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trip_id` (`trip_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `identity_card` (`identity_card`),
  ADD KEY `hotel_id` (`hotel_id`);
ALTER TABLE `users` ADD FULLTEXT KEY `first_name` (`first_name`,`last_name`);

--
-- Indexes for table `use_service`
--
ALTER TABLE `use_service`
  ADD PRIMARY KEY (`bill_id`,`room_id`,`floor_id`,`service_id`),
  ADD KEY `floor_id` (`floor_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `service_id` (`service_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `areas`
--
ALTER TABLE `areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `reviews_trips`
--
ALTER TABLE `reviews_trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `trip_details`
--
ALTER TABLE `trip_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bill_details`
--
ALTER TABLE `bill_details`
  ADD CONSTRAINT `bill_details_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bill_details_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bill_details_ibfk_3` FOREIGN KEY (`floor_id`) REFERENCES `rooms` (`floor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bookings_trip`
--
ALTER TABLE `bookings_trip`
  ADD CONSTRAINT `bookings_trip_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `device_types`
--
ALTER TABLE `device_types`
  ADD CONSTRAINT `device_types_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `floors`
--
ALTER TABLE `floors`
  ADD CONSTRAINT `floors_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hotels`
--
ALTER TABLE `hotels`
  ADD CONSTRAINT `fk_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hotel_images`
--
ALTER TABLE `hotel_images`
  ADD CONSTRAINT `hotel_images_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hotel_tags`
--
ALTER TABLE `hotel_tags`
  ADD CONSTRAINT `hotel_tags_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `places`
--
ALTER TABLE `places`
  ADD CONSTRAINT `places_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews_trips`
--
ALTER TABLE `reviews_trips`
  ADD CONSTRAINT `reviews_trips_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_trips_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`floor_id`) REFERENCES `floors` (`floor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`rt_id`) REFERENCES `room_types` (`rt_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rooms_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`status_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rooms_ibfk_4` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `room_images`
--
ALTER TABLE `room_images`
  ADD CONSTRAINT `room_images_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `room_prices`
--
ALTER TABLE `room_prices`
  ADD CONSTRAINT `room_prices_ibfk_1` FOREIGN KEY (`floor_id`) REFERENCES `rooms` (`floor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `room_prices_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seesions`
--
ALTER TABLE `seesions`
  ADD CONSTRAINT `seesions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `trips`
--
ALTER TABLE `trips`
  ADD CONSTRAINT `fk_the_trips_far_areas` FOREIGN KEY (`destination_id`) REFERENCES `areas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_the_trips_far_hotels` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_the_trips_far_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `trip_details`
--
ALTER TABLE `trip_details`
  ADD CONSTRAINT `trip_details_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `use_service`
--
ALTER TABLE `use_service`
  ADD CONSTRAINT `use_service_ibfk_1` FOREIGN KEY (`floor_id`) REFERENCES `bill_details` (`floor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `use_service_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `bill_details` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `use_service_ibfk_3` FOREIGN KEY (`bill_id`) REFERENCES `bill_details` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `use_service_ibfk_4` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
