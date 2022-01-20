-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (arm64)
--
-- Host: localhost    Database: appstore
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--
CREATE DATABASE  IF NOT EXISTS `appstore` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `appstore`;

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_price` int NOT NULL,
  `product_description` text NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_category` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4129d7a0-47ee-4164-b04e-a094ac187cc5` (`product_category`),
  CONSTRAINT `FK_4129d7a0-47ee-4164-b04e-a094ac187cc5` FOREIGN KEY (`product_category`) REFERENCES `products_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'METRO EXODUS',51,'Metro Exodus, like the previous installments of the franchise, is inspired by the Metro novels written by Dmitry Glukhovsky. It is a classic offering of the FPS genre in terms of gameplay, but the storyline is quite unique.','METRO_EXODUS.jpeg',1),(6,'Pacmannn',432,' Pacmannn old game','1642119661487.jpg',1),(7,'fifa',30,'holafifa','1642186281055.jpeg',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_categories`
--

DROP TABLE IF EXISTS `products_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_categories`
--

LOCK TABLES `products_categories` WRITE;
/*!40000 ALTER TABLE `products_categories` DISABLE KEYS */;
INSERT INTO `products_categories` VALUES (1,'Games'),(2,'Software');
/*!40000 ALTER TABLE `products_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_price` int NOT NULL,
  `users_id` int NOT NULL,
  `products_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d8198a76-9853-4388-9d8b-ea00905809f8` (`users_id`),
  KEY `FK_4e696b24-d173-4a5a-aff5-faf8682803cb` (`products_id`),
  CONSTRAINT `FK_4e696b24-d173-4a5a-aff5-faf8682803cb` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FK_d8198a76-9853-4388-9d8b-ea00905809f8` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `users_category` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f6cf3556-c276-4452-87a9-be8ad367aa64` (`users_category`),
  CONSTRAINT `FK_f6cf3556-c276-4452-87a9-be8ad367aa64` FOREIGN KEY (`users_category`) REFERENCES `users_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Maria','Galante','juan@gmail.comaa','img/default.png','$2a$10$Cg8Fl/so7mBDlirDi9/brOxf5D/pwQu7d/ll3Rq5sLANm5XGpuroi',2),(3,'probando1','probando1','probando1@probando1.com','img/default.png','$2a$10$X16v6o9eeuqutm/OLWSRMOHLpsZmiDuMw8IwtbKBLKCviXnqMc/BO',2),(4,'probando1','probando1','probando1@probando1.com','img/default.png','$2a$10$bXDeS1jPCeAzTOUaFBa62eXRU7ooE0Qot1QPItq4na0/c5qNaWduW',2),(5,'a','a','a@b.com','default.png','$2a$10$gSHzHNQ5YNc1.9V9bGxYfOWi3JS8zT6BUkarpT82YuDpC76sKg.oy',2),(6,'Martina','Fumiere','mar@mar.com','img/default.png','$2a$10$N3BwqTpVUsQ3VQYm.UAIMOVkJGj/.josvwXw9dxGyQY6Y3zQZ13bO',2),(7,'hola','hola','hola@hola.com','1642551746121.jpeg','$2a$10$HAMrhe0GqU7DUpI8dhNsMuzkgWSFvqXzfi/HaPZdn1MtTiNvk.LrK',2),(8,'micaela','Fumiere','micaela@gmail.com','1642554421952.jpeg','$2a$10$hXDf81Ir5xQfoiYYsy2IoO7cLMoClBxDiPL8cnmUnvv/BkTIU9fwG',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_categories`
--

DROP TABLE IF EXISTS `users_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_categories`
--

LOCK TABLES `users_categories` WRITE;
/*!40000 ALTER TABLE `users_categories` DISABLE KEYS */;
INSERT INTO `users_categories` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `users_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'appstore'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-20 16:33:26