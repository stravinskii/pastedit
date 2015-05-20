# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.42)
# Database: pastedit
# Generation Time: 2015-05-20 07:06:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table codigos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `codigos`;

CREATE TABLE `codigos` (
  `idcodigo` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idlenguaje` int(11) unsigned NOT NULL,
  `nombre` varchar(25) NOT NULL DEFAULT '',
  `codigo` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcodigo`),
  KEY `idlenguaje` (`idlenguaje`),
  CONSTRAINT `codigos_ibfk_1` FOREIGN KEY (`idlenguaje`) REFERENCES `lenguajes` (`idlenguaje`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `codigos` WRITE;
/*!40000 ALTER TABLE `codigos` DISABLE KEYS */;

INSERT INTO `codigos` (`idcodigo`, `idlenguaje`, `nombre`, `codigo`, `timestamp`)
VALUES
	(1,1,'Prueba','#codigodeprueba','2015-05-19 10:10:12'),
	(2,2,'Dos','#codigonumerodos\n','2015-05-19 10:10:12'),
	(3,3,'Test','<?php echo php_info(); ?>','2015-05-19 10:10:12'),
	(4,3,'test','<?php echo \"test\"; ?>','2015-05-19 10:10:12'),
	(8,3,'ts test','timestamp test','2015-05-19 10:16:32');

/*!40000 ALTER TABLE `codigos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table lenguajes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lenguajes`;

CREATE TABLE `lenguajes` (
  `idlenguaje` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `lenguaje` varchar(16) NOT NULL DEFAULT '',
  PRIMARY KEY (`idlenguaje`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `lenguajes` WRITE;
/*!40000 ALTER TABLE `lenguajes` DISABLE KEYS */;

INSERT INTO `lenguajes` (`idlenguaje`, `lenguaje`)
VALUES
	(1,'python'),
	(2,'node.js'),
	(3,'php'),
	(4,'javascript'),
	(5,'ruby');

/*!40000 ALTER TABLE `lenguajes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table usuario_codigos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `usuario_codigos`;

CREATE TABLE `usuario_codigos` (
  `idusuario_codigo` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) unsigned NOT NULL,
  `idcodigo` int(11) unsigned NOT NULL,
  PRIMARY KEY (`idusuario_codigo`),
  UNIQUE KEY `idusuario` (`idusuario`,`idcodigo`),
  KEY `idcodigo` (`idcodigo`),
  CONSTRAINT `usuario_codigos_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `usuario_codigos_ibfk_2` FOREIGN KEY (`idcodigo`) REFERENCES `codigos` (`idcodigo`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table usuarios
# ------------------------------------------------------------

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `idusuario` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `hash` varchar(64) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;

INSERT INTO `usuarios` (`idusuario`, `nombre`, `email`, `hash`, `password`)
VALUES
	(1,'Mauricio','mauricio@amarello.com.mx','6248c6b4f807d25b6bd89c58886370b6bedcc8f0','123456'),
	(2,'Edgard','edgard@amarello.com.mx','','123456'),
	(3,'Snyder','snyder@amarello.com.mx','','123456'),
	(4,'Adrian','adrian@amarello.com.mx','','123456');

/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
