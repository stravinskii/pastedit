# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.42)
# Database: pastedit
# Generation Time: 2015-05-16 20:28:04 +0000
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
  PRIMARY KEY (`idcodigo`),
  KEY `idlenguaje` (`idlenguaje`),
  CONSTRAINT `codigos_ibfk_1` FOREIGN KEY (`idlenguaje`) REFERENCES `lenguajes` (`idlenguaje`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `codigos` WRITE;
/*!40000 ALTER TABLE `codigos` DISABLE KEYS */;

INSERT INTO `codigos` (`idcodigo`, `idlenguaje`, `nombre`, `codigo`)
VALUES
	(1,1,'Prueba','#codigodeprueba'),
	(2,2,'Dos','#codigonumerodos\n'),
	(3,1,'codigotres','#uncodigotres');

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
  CONSTRAINT `usuario_codigos_ibfk_2` FOREIGN KEY (`idcodigo`) REFERENCES `codigos` (`idcodigo`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `usuario_codigos_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table usuarios
# ------------------------------------------------------------

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `idusuario` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `salt` varchar(64) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
