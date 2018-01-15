/*
MySQL Backup
Source Server Version: 10.1.25
Source Database: cbqa_examen
Date: 15/01/2018 12:55:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `tbl_person`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_person`;
CREATE TABLE `tbl_person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `gender` char(1) NOT NULL,
  `age` tinyint(4) NOT NULL,
  `_status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Procedure definition for `proc_person_del`
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_person_del`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_person_del`(
	in p_id int
)
BEGIN

update cbqa_examen.tbl_person
set
	_status = 0
 where
	id = p_id;

END
;;
DELIMITER ;

-- ----------------------------
--  Procedure definition for `proc_person_getall`
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_person_getall`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_person_getall`()
BEGIN

SELECT `tbl_person`.`id` as Id,
    `tbl_person`.`first_name` as FirstName,
    `tbl_person`.`last_name` as LastName,
    `tbl_person`.`gender` as Gender,
    `tbl_person`.`age` as Age,
    `tbl_person`.`_status` as `Status`
FROM `cbqa_examen`.`tbl_person`
WHERE
	_status = 1;

END
;;
DELIMITER ;

-- ----------------------------
--  Procedure definition for `proc_person_getbyid`
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_person_getbyid`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_person_getbyid`(
	in p_id int
)
BEGIN

SELECT `tbl_person`.`id` as Id,
    `tbl_person`.`first_name` as FirstName,
    `tbl_person`.`last_name` as LastName,
    `tbl_person`.`gender` as Gender,
    `tbl_person`.`age` as Age,
    `tbl_person`.`_status` as `Status`
FROM `cbqa_examen`.`tbl_person`
WHERE
	id = p_id;

END
;;
DELIMITER ;

-- ----------------------------
--  Procedure definition for `proc_person_ins`
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_person_ins`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_person_ins`(
	out p_id int
    , in p_first_name varchar(45)
    , in p_last_name varchar(45)
    , in p_gender char(1)
    , in p_age int
)
BEGIN

insert into cbqa_examen.tbl_person
(
	first_name
	, last_name
	, gender
	, age
)
values
(
	p_first_name
	, p_last_name
	, p_gender
	, p_age
);

set p_id = last_insert_id();

END
;;
DELIMITER ;

-- ----------------------------
--  Procedure definition for `proc_person_upd`
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_person_upd`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_person_upd`(
	in p_id int
    , in p_first_name varchar(45)
    , in p_last_name varchar(45)
    , in p_gender char(1)
    , in p_age int
)
BEGIN

update cbqa_examen.tbl_person
set
	first_name = p_first_name
	, last_name = p_last_name
	, gender = p_gender
	, age = p_age
where
	id = p_id;

END
;;
DELIMITER ;

-- ----------------------------
--  Records 
-- ----------------------------
