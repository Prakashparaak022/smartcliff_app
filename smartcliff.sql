-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: smartcliff
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applicationforms`
--

DROP TABLE IF EXISTS `applicationforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicationforms` (
  `a_form_id` int NOT NULL AUTO_INCREMENT,
  `a_name` varchar(255) NOT NULL,
  `a_email` varchar(255) NOT NULL,
  `a_mobileNumber` varchar(15) NOT NULL,
  `a_degree` varchar(50) NOT NULL,
  `a_yearOfPassing` int NOT NULL,
  `a_marksPercentage` float NOT NULL,
  `a_category` varchar(255) NOT NULL,
  `c_id` int DEFAULT NULL,
  PRIMARY KEY (`a_form_id`),
  KEY `c_id` (`c_id`),
  CONSTRAINT `applicationforms_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `courses` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicationforms`
--

LOCK TABLES `applicationforms` WRITE;
/*!40000 ALTER TABLE `applicationforms` DISABLE KEYS */;
INSERT INTO `applicationforms` VALUES (1,'Prakash','prakashparaak@gmail.com','6379855308','Bachelor',2023,85,'Company',NULL),(2,'Manogar','prakashparaak@gmail.com','6379855308','Master',2323,121,'Mechanical Design',NULL);
/*!40000 ALTER TABLE `applicationforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`),
  KEY `idx_category` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (5,'Ai technology'),(2,'Automotive Embedded'),(4,'Mechanical Design'),(1,'Software Development'),(3,'Testing Track');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `contact_id` int NOT NULL AUTO_INCREMENT,
  `contact_name` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `contact_phoneNumber` varchar(15) NOT NULL,
  `contact_message` text,
  PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'Prakash','prakash19ec@jit.ac.in','6369855308','sdnvnsd'),(2,'','','',''),(3,'','','',''),(4,'','','',''),(5,'Prakash Paraak','prakash19ec@jit.ac.in','6369855308','Hi there'),(6,'','','','');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `corporatedetails`
--

DROP TABLE IF EXISTS `corporatedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `corporatedetails` (
  `org_id` int NOT NULL AUTO_INCREMENT,
  `orgName` varchar(255) NOT NULL,
  `orgEmail` varchar(255) NOT NULL,
  `orgPhone` varchar(15) NOT NULL,
  `service` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`org_id`),
  KEY `service` (`service`),
  CONSTRAINT `corporatedetails_ibfk_1` FOREIGN KEY (`service`) REFERENCES `servicelists` (`service`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corporatedetails`
--

LOCK TABLES `corporatedetails` WRITE;
/*!40000 ALTER TABLE `corporatedetails` DISABLE KEYS */;
INSERT INTO `corporatedetails` VALUES (7,'SmartCliff','smartcliff@gmail.com','6767676767',NULL),(8,'SmartCliff','smartcliff@gmail.com','6767676767','Institution Training'),(9,'SmartCliff','smartcliff@gmail.com','6767676767','Institution Training');
/*!40000 ALTER TABLE `corporatedetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `c_id` int NOT NULL AUTO_INCREMENT,
  `c_title` varchar(100) NOT NULL,
  `c_description` text,
  `image_url` text,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`c_id`),
  KEY `idx_courses_c_title` (`c_title`),
  KEY `category` (`category`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (28,'MERN (MongoDB, Express.js, React, Node.js)','The MERN (MongoDB, Express.js, React, Node.js) stack has gained significant popularity among developers due to its flexibility, efficiency, and ease of use in developing modern web applications.','public/images/image-1691749428035-925007989.png','Software Development'),(29,'MEAN (MongoDB, Express.js, Angular, Node.js)','This about the Mean course','public/images/image-1691749440119-431857469.png','Software Development'),(30,'.Net development','A .NET course provides comprehensive training in the Microsoft .NET framework, equipping students with the skills to develop robust and scalable web and desktop applications.','public/images/image-1691749452958-557330257.png','Software Development'),(31,'SENSOR (Sensing, Data Collection, and Analysis)','This course dives deep into object-oriented programming (OOP) principles. Students will learn how to design and implement robust and scalable software using OOP concepts. They will gain practical experience in applying OOP principles to real-world programming scenarios.','public/images/image-1691749258049-1417667.png','Automotive Embedded'),(32,'Embedded System Design','Embedded systems are specialized computer systems designed to perform specific tasks within larger systems and dedicated to performing a specific function with real-time requirements.','public/images/image-1691749265476-526747268.png','Automotive Embedded'),(33,'Real Time System','Real-time systems are computer systems that must respond to external events within strict timing constraints. They are designed to process data in real-time predictable responses to critical tasks.','public/images/image-1691749535777-873332292.png','Testing Track'),(34,'Software Testing','Software testing is a crucial phase in the software development life cycle that ensures the quality and functionality of a software application. It involves executing a set of predefined test cases and verifying their results.','public/images/image-1691749558668-288722146.png','Testing Track'),(35,'Certified Agile Tester (CAT)','The Certified Agile Tester (CAT) course is a comprehensive training program that equips students with the skills and knowledge to become certified agile testers. It covers agile principles, testing methodologies, and practical techniques for successful agile testing.','public/images/image-1691749547681-445005194.png','Testing Track'),(36,'API Testing','API testing involves testing the functionality, performance, and security of application programming interfaces (APIs). This course provides hands-on training in API testing techniques and tools to ensure the reliability and robustness of APIs.','public/images/image-1691749603182-880956272.png','Testing Track'),(37,'Mobile Application Testing','Mobile application testing is a specialized field that focuses on testing the functionality, usability, and performance of mobile applications. This course provides practical training in mobile app testing methodologies and tools.','public/images/image-1691749590048-486013206.png','Testing Track'),(38,'Fluid Mechanical Design','Fluid mechanical design involves the analysis and design of systems that involve fluid flow, such as pumps, turbines, and pipes. This course covers the principles and techniques of fluid mechanical design using computational tools and practical examples.','public/images/image-1691749228397-14907216.png','Mechanical Design'),(39,'Solid Mechanical Design','Solid mechanical design focuses on the analysis and design of solid components and structures, such as machine parts and load-bearing structures. This course covers the principles of solid mechanical design using computer-aided design (CAD) software and practical examples.','public/images/image-1691749210469-268527345.png','Mechanical Design'),(40,'Machine Learning','Machine learning is a field of study that focuses on the development of algorithms and models that enable computers to learn and make predictions or decisions without explicit programming. This course provides an introduction to machine learning techniques and applications.','public/images/image-1691749245597-873439343.png','Mechanical Design'),(41,'Thermo Dynamics','Thermo Dynamics is the study of energy transfer and conversion in mechanical systems. This course covers the principles of thermodynamics and their application in the design and analysis of mechanical systems, such as engines and refrigeration systems.','public/images/image-1691749237352-622528058.png','Mechanical Design'),(51,'Machine Learning','bhjdchbsvbsvsbdhh','public/images/image-1691814741682-114387735.png','Automotive Embedded');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiries`
--

DROP TABLE IF EXISTS `enquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enquiries` (
  `e_id` int NOT NULL AUTO_INCREMENT,
  `e_name` varchar(255) NOT NULL,
  `e_email` varchar(255) NOT NULL,
  `e_phone_number` varchar(20) NOT NULL,
  `e_message` text,
  `c_id` int DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`e_id`),
  KEY `fk_c_id` (`c_id`),
  CONSTRAINT `fk_c_id` FOREIGN KEY (`c_id`) REFERENCES `courses` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiries`
--

LOCK TABLES `enquiries` WRITE;
/*!40000 ALTER TABLE `enquiries` DISABLE KEYS */;
INSERT INTO `enquiries` VALUES (12,'Prakash','prakash19ec@jit.ac.in','6369855308','sss',NULL,'Jesus'),(14,'Prakash','prakash19ec@jit.ac.in','6369855308','Hi iam superman',NULL,'Lateral Training'),(15,'Prakash','prakashparaak@gmail.com','9999999999','njscacjnasc',NULL,'Testing Track'),(16,'PrakashParaak','pracashparaak@gmail.com','9999999999999999','gvghhvc',NULL,'Software Development'),(19,'Manogar','prakashparaak@gmail.com','9999999999','',NULL,'Testing Track'),(20,'Manogar','ganeshan@gmail.com','99999999999','Hi i am Prakash',NULL,'Automotive Embedded');
/*!40000 ALTER TABLE `enquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hireforms`
--

DROP TABLE IF EXISTS `hireforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hireforms` (
  `h_id` int NOT NULL AUTO_INCREMENT,
  `h_name` varchar(255) NOT NULL,
  `h_email` varchar(255) NOT NULL,
  `h_phoneNumber` varchar(15) NOT NULL,
  `h_companyName` varchar(255) NOT NULL,
  `h_hiringEnquiry` text,
  `h_message` text,
  `h_designation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`h_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hireforms`
--

LOCK TABLES `hireforms` WRITE;
/*!40000 ALTER TABLE `hireforms` DISABLE KEYS */;
INSERT INTO `hireforms` VALUES (1,'Prakash','prakash19ec@jit.ac.in','6369855308','SmartCliff','Summa','Summathanda Thambi','-'),(2,'','','','','','',''),(3,'','','','','','',''),(4,'qaa','aaa@gmail.com','7777777777','efvdsv','fbdfb','dbfdfbb','');
/*!40000 ALTER TABLE `hireforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institutiondetails`
--

DROP TABLE IF EXISTS `institutiondetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institutiondetails` (
  `coll_id` int NOT NULL AUTO_INCREMENT,
  `collegeName` varchar(255) NOT NULL,
  `collegeEmail` varchar(255) NOT NULL,
  `collegePhone` varchar(15) NOT NULL,
  `service` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`coll_id`),
  KEY `service` (`service`),
  CONSTRAINT `institutiondetails_ibfk_1` FOREIGN KEY (`service`) REFERENCES `servicelists` (`service`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institutiondetails`
--

LOCK TABLES `institutiondetails` WRITE;
/*!40000 ALTER TABLE `institutiondetails` DISABLE KEYS */;
INSERT INTO `institutiondetails` VALUES (27,'Jansons Institute of Technology ','cnajcnaj@gmail.com','6369855308',NULL),(28,'Jansons Institute of Technology ','cnajcnaj@gmail.com','6369855308',NULL),(29,'Jansons Institute of Technology ','cnajcnaj@gmail.com','6369855308',NULL),(44,'Jansons Institute of Technology ','bjdsbhdsb@gmail.com','6369855308',NULL),(45,'Jansons Institute of Technology ','bjdsbhdsb@gmail.com','6369855308','Lateral Training'),(46,'Jansons Institute of Technology ','bjdsbhdsb@gmail.com','6369855308','Lateral Training');
/*!40000 ALTER TABLE `institutiondetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicelists`
--

DROP TABLE IF EXISTS `servicelists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicelists` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `service` varchar(255) NOT NULL,
  PRIMARY KEY (`s_id`),
  KEY `idx_service` (`service`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicelists`
--

LOCK TABLES `servicelists` WRITE;
/*!40000 ALTER TABLE `servicelists` DISABLE KEYS */;
INSERT INTO `servicelists` VALUES (1,'HTD'),(2,'Institution Training'),(4,'Lateral Training'),(3,'MCA');
/*!40000 ALTER TABLE `servicelists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) NOT NULL,
  `s_email` varchar(255) NOT NULL,
  `s_phoneNumber` varchar(20) NOT NULL,
  `service` varchar(255) NOT NULL,
  `requirement` text,
  PRIMARY KEY (`s_id`),
  KEY `fk_service` (`service`),
  CONSTRAINT `fk_service` FOREIGN KEY (`service`) REFERENCES `servicelists` (`service`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'sds','prakashparaak@gmail.com','6369855308','Institution Training','hhhhh'),(2,'Hi','prakashparaak@gmail.com','6369855308','MCA','dscdc'),(3,'Hi','prakashparaak@gmail.com','6369855308','MCA','dscdc'),(4,'SmartCliff','prakash19ec@jit.ac.in','9999999999','MCA','I Want 2 Girls for Training'),(5,'SmartCliff','prakashparaak@gmail.com','6369855308','Institution Training','I Want 2 Girls for Training'),(6,'Manogar','prakashparaak@gmail.com','6369855308','MCA','I Want 2 Girls for Training');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentdetails`
--

DROP TABLE IF EXISTS `studentdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentdetails` (
  `std_id` int NOT NULL AUTO_INCREMENT,
  `std_firstName` varchar(255) NOT NULL,
  `std_lastName` varchar(255) NOT NULL,
  `std_email` varchar(255) NOT NULL,
  `std_phone` bigint DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`std_id`),
  KEY `category` (`category`),
  CONSTRAINT `studentdetails_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentdetails`
--

LOCK TABLES `studentdetails` WRITE;
/*!40000 ALTER TABLE `studentdetails` DISABLE KEYS */;
INSERT INTO `studentdetails` VALUES (32,'Prakash','Paraak','prakashparaak@gmail.com',6369855308,NULL),(33,'Prakash','Paraak','prakashparaak@gmail.com',6666666666,NULL),(34,'Prakash','Paraak','prakashparaak@gmail.com',8798978989,NULL);
/*!40000 ALTER TABLE `studentdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `u_username` varchar(50) NOT NULL,
  `u_password` varchar(255) NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_username` (`u_username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (25,'Prakash','@1234');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 17:40:53
